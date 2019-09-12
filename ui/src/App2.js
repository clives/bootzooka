import { hot } from 'react-hot-loader/root'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import reducer from './Reducers'

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
   <button className='inc' onClick={(e) => this.increment(e)}>Increment!dd</button>
    <button className='dec' onClick={(e) => this.decrement(e)}>Decrement!</button>
    <button className='reset' onClick={(e) => this.reset(e)}>Reset</button>
    <h1>Current Count: {this.state.count}</h1>
  </div>
    );
  }
};

export default process.env.NODE_ENV === "development" ? hot(Counter) : Counter
