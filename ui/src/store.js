/*
 * store.js
 */

import { createStore } from 'redux';
import reducer from './Reducers'; // aka this is your rootReducer
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware } from 'redux'
import { logger } from 'redux-logger';


const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const sagaMiddleware = createSagaMiddleware()

const configureStore = () => {
  const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware, logger)))



  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
    console.log("accept reducers???");
      module.hot.accept('./Reducers', () => {
        console.log("accept reducers");
        store.replaceReducer(reducer);
      });
    }
  }

  sagaMiddleware.run(rootSaga)

  return store;
};

export default configureStore;
