import React from 'react'
import HighchartsReact from 'highcharts-react-official'



class StockChart extends React.Component {

    constructor () {
        super()
        this.state = { data: [] }
        setInterval(() => this.setState({ data: [...Array(3)].map(Math.random) }), 1500)
      }

    render() {
        const cb = function () {}

        return <div>
          <h1>StockChart</h1>    
          <HighchartsReact highcharts={this.props.highcharts}
          options={this.props.options}
          constructorType={'stockChart'}/></div>
      }
  }


export default StockChart