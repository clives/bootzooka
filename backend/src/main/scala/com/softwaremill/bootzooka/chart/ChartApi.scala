package com.softwaremill.bootzooka.chart

import java.time.Instant

import algebra.eurUsdData.Autofx
import cats.data.NonEmptyList
import com.softwaremill.bootzooka.http.{Error_OUT, Http}
import com.softwaremill.bootzooka.util.ServerEndpoints
import com.softwaremill.bootzooka.infrastructure.Json._
import monix.eval.Task
import monix.execution.atomic.AtomicLong
import services.DataProvider

import scala.collection.mutable

class ChartApi(http: Http) {
  import http._
  import ChartApi._
  private val ChartPath = "charts"

  val ourCharts = mutable.Map.empty[Long, Chart]
  val chartIdGenerator = AtomicLong(0l)

  DataProvider.load("./data/1min_eurusd", "EUR/USD", "1MIN")

  //error response need code + msg
  private def autofxErrorToHttp( error: Autofx.ERROR )=
    (400, Error_OUT(error) )

  // using existing data - only specify money/.../
  private val getDefaultChart = baseEndpoint.get
    .in(ChartPath )
    .in("provided")
    .in(path[String]("paires").description("paires to use to the data-EUR/USD"))
    .out(jsonBody[Chart])
    .serverLogic({ chartId =>

      val data= DataProvider.getAsArray("EUR/USD", "1MIN").map{
        result =>
          result.map{ data =>
            Chart("test", data.map{ candle => candle.toArray})}.left.map(autofxErrorToHttp _)
      }
      Task.from(data)
    })

  private val getChartData = baseEndpoint.get
    .in(ChartPath )
    .in(path[Long]("chartId").description("id of the game"))
    .out(jsonBody[Chart])
    .serverLogic({ chartId =>
      (for{
        c<-Task.now( Chart("test", Array(Candles(1d,0d,0d,0d,0d).toArray)))
      }yield c).toOut
    })

  private val postChartData = secureEndpoint.post
    .in(jsonBody[Chart])
    .out(plainBody[Long])
    .serverLogic({ case (authData, data) =>
      (for{
        id <-Task.now{ val id=chartIdGenerator.incrementAndGet(); ourCharts.put(id,  data); id  }
      }yield id).toOut
    })

  val endpoints: ServerEndpoints =
    NonEmptyList
      .of( postChartData,getChartData )
      .map(_.tag("chart"))
}


object ChartApi {
  case class Chart(name: String, candles: Array[Array[Double]])
  case class Candles(date:Double, open: Double, close: Double, high: Double, low: Double)

  trait ToArray[T]{def toArray(x:T):Array[Double] }

  implicit class ToArraySyntax[T](x:T)(implicit typeclass: ToArray[T])
  {def toArray: Array[Double] = typeclass.toArray(x)}

  implicit val recordToJson: ToArray[Candles]=new ToArray[Candles]{
    def toArray(candle:Candles):Array[Double] =Array( candle.date,candle.date,candle.date,candle.date,candle.date)
  }

}
