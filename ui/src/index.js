import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import PasswordService from './PasswordService/PasswordService';
import UserService from './UserService/UserService';
import VersionService from './VersionService/VersionService';
import reducer from './reducers'
import rootSaga from './sagas'
import { logger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'

const passwordService = new PasswordService();

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware, logger)))

sagaMiddleware.run(rootSaga)

ReactDOM.render(
 <Provider store={store}>
  <BrowserRouter>
    <App
      passwordService={passwordService}
    />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
