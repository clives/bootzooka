import { hot } from 'react-hot-loader/root'
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import PasswordService from './PasswordService/PasswordService';
import UserService from './UserService/UserService';
import VersionService from './VersionService/VersionService';
import reducer from './Reducers/Reducers'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker.js';
//import configureStore from './store';
import App2 from './App2'
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './Sagas/Sagas'
import { AppContainer } from 'react-hot-loader';
//import makeStore from './configureStore';

const sagaMiddleware = createSagaMiddleware()
//const store = configureStore();

//const store = makeStore();


const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware, logger)))

sagaMiddleware.run(rootSaga)

//registerServiceWorker();

/*
const render = Component => {
  return ReactDOM.render(
    <Provider store={store}>
          <BrowserRouter>
            <Component/>
            </BrowserRouter>
          </Provider>,
          document.getElementById('root'))
}*/

/*
render(App);


console.log("module.hot???");
if (module.hot) {
  console.log("module.hot");
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  });
}
*/
//export default process.env.NODE_ENV === "development" ? hot(module)(render(App)) : render(App)


/*
const render = Component => {
  return ReactDOM.render( <Component/>,document.getElementById('root'))
}
*/
/*
const App2 = () => <div>Hello World!</div>

export default process.env.NODE_ENV === "development" ? hot(App2) : render(App2)
*/

/*
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
*/




// !AppContainer should wrapp only one component!!!
const renderApp2 = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('root')
  );
}

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          <Component/>
          </BrowserRouter>
        </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
}

render(App);

/*
module.hot.accept('./App.js', () => {
     const NextRootContainer = require('./App.js').default;
     <Provider store={store}>
        <BrowserRouter>
          <App/>
          </BrowserRouter>
        </Provider>
       , document.getElementById('root');
   })*/


if (module.hot) {
  module.hot.accept('./App.js', () => {
    console.log("reload App.js")

    const NextRootContainer = require('./App.js').default;
    renderApp2(NextRootContainer);
  });
}


/*
ReactDOM.render(
 <App2/>,
  document.getElementById('root')
);
*/

