import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
import { BrowserRouter } from 'react-router-dom';
import "./index.css"
import App from "./App"
import configureStore from "./configureStore"
import history from './history';

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter  history={history}><App /></BrowserRouter>
  </Provider>,
  document.getElementById("root")
)

if (module.hot) {
  module.hot.accept('./App', () => {
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <App />
        </BrowserRouter>
      </Provider>,
      document.getElementById('root')
    )
  })
}
