import { hot } from 'react-hot-loader/root'
import { createStore, applyMiddleware } from 'redux';
import reducer from './Reducers';
import rootSaga from './sagas';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';


//src: https://medium.com/@denizism7/setup-and-configure-webpacks-hmr-and-react-hot-loader-in-a-react-redux-application-13a5bfdaacdb
export default function makeStore() {
    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware, logger)));
    let sagaTask = sagaMiddleware.run(function* () {
                        yield rootSaga()
                     })


    //sagaMiddleware.run(rootSaga)

     console.log("makeStore reducers");

/*
    if (module.hot) {
    console.log("accept reducers");
        module.hot.accept('./Reducers/index.js', () => {
            console.log("reload reducers");
            const nextRootReducer = require('./Reducers/index.js');
            store.replaceReducer(nextRootReducer);
           // sagaMiddleware.run(rootSaga)
        });
    }
*/
    return store;
}
