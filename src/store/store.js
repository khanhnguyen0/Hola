import createSagaMiddleware from 'redux-saga';
import saga from '../Saga/index';
import {createStore, applyMiddleware} from 'redux';
import droneApp from '../Reducers/index';
import {composeWithDevTools} from 'remote-redux-devtools'


const sagaMiddleware = createSagaMiddleware();
const configureStore = () =>{
  let store = createStore(droneApp, composeWithDevTools(applyMiddleware(sagaMiddleware)));
  sagaMiddleware.run(saga);
  return store;
}

export default configureStore;
