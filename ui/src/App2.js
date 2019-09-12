//import { hot } from 'react-hot-loader/root'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import reducer from './Reducers'
import {connect} from "react-redux"
/*
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker.js';
import configureStore from './store';
*/
const App2 = () => <div>Hello TEST!</div>

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  // change code below this line

  increment() {
    this.setState({
      count: this.state.count + 1
    });
  };

  decrement() {
    this.setState({
      count: this.state.count - 1
    });
  };

  reset() {
    this.setState({
      count: 0
    });
  };

  // change code above this line
  render() {
    return (

   <div>
   <button className='inc' onClick={(e) => {this.increment(e); this.props.tickIncrement();}}>-NICE--jjIncrement!dd</button>
    <button className='dec' onClick={(e) => this.decrement(e)}>Decrement!</button>
    <button className='reset' onClick={(e) => this.reset(e)}>Reset</button>
    <h1>Current Count: {this.state.count}</h1>
  </div>
    );
  }
};

const mapStateToProps = state => ({
  tick: state.tick,
})

const mapDispatchToProps = (dispatch) => ({
  tickIncrement: () => dispatch({type: "tick"}),
})


export default connect(mapStateToProps, mapDispatchToProps)(Counter)

//export default process.env.NODE_ENV === "development" ? hot(Counter) : Counter
//export default Counter
