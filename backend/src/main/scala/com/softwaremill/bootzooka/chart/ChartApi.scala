package com.softwaremill.bootzooka.chart

import java.time.Instant

import cats.data.NonEmptyList
import com.softwaremill.bootzooka.http.Http
import com.softwaremill.bootzooka.util.{ ServerEndpoints}
import com.softwaremill.bootzooka.infrastructure.Json._
import monix.eval.Task
import monix.execution.atomic.{AtomicLong}

import scala.collection.mutable

class ChartApi(http: Http) {
  import http._
  import ChartApi._
  private val ChartPath = "charts"

  val ourCharts = mutable.Map.empty[Long, Chart]
  val chartIdGenerator = AtomicLong(0l)

  private val getChartData = baseEndpoint.get
    .in(ChartPath )
    .in(path[Long]("chartId").description("id of the game"))
    .out(jsonBody[Chart])
    .serverLogic({ chartId =>
      (for{
        c<-Task.now( Chart("test", Array(Candles(1l,0l,0l,0l,0l).toArray)))
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
  case class Chart(name: String, candles: Array[Array[Long]])
  case class Candles(date:Long, open: Long, close: Long, high: Long, low: Long)

  trait ToArray[T]{def toArray(x:T):Array[Long] }

  implicit class ToArraySyntax[T](x:T)(implicit typeclass: ToArray[T])
  {def toArray: Array[Long] = typeclass.toArray(x)}

  implicit val recordToJson: ToArray[Candles]=new ToArray[Candles]{
    def toArray(candle:Candles):Array[Long] =Array( candle.date,candle.date,candle.date,candle.date,candle.date)
  }

}
