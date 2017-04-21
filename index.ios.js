/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import HomePage from './src/Container/home-page'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import droneApp from './src/Reducers/index';
import {composeWithDevTools} from 'remote-redux-devtools'
import createSagaMiddleware from 'redux-saga';
import saga from './src/Saga/index';

const sagaMiddleware = createSagaMiddleware();

let store = createStore(droneApp, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(saga);

console.log(store);
export default class drone_map_mockup extends Component {
  render() {
    return(
      <Provider store = {store}>
     <HomePage />
    </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

// AppRegistry.registerComponent('drone_map_mockup', () => drone_map_mockup);
