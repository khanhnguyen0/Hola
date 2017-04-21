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
import {Navigation} from 'react-native-navigation'
import {Provider } from 'react-redux';
import {registerScreens} from './src/screen/screen'
import configureStore from './src/store/store'
const store = configureStore();

// console.log(store);
const navigatorStyle = {
	statusBarColor: 'black',
	statusBarTextColorScheme: 'light',
	navBarTextColor: 'white',
	navBarButtonColor: 'white',
	tabBarButtonColor: 'black',
	tabBarSelectedButtonColor: 'red',
	tabBarBackgroundColor: 'white',
  navBarHidden:false,
  navBarTranslucent:true,
  drawUnderTabBar:false,
  drawUnderNavBar:false
};

registerScreens(store, Provider);


Navigation.startTabBasedApp({
	tabs:[
    {
      label:'Login',
      screen:'drone.Login',
      icon: require('./src/assets/nav_user.png'),
      title:'Login Screen',
      navigatorStyle,
      overrideBackPress:true,
    },
    {
      label:'Map',
      screen:'drone.Map',
      icon: require('./src/assets/nav_map.png'),
      title:'Map Page',
      overrideBackPress:true,
      navigatorStyle
    },
    {
      label:'Regulation',
      screen:'drone.Regulation',
      icon: require('./src/assets/nav_regulation.png'),
      title:'Regulation',
      overrideBackPress:true,
      navigatorStyle
    }
  ]
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

// AppRegistry.registerComponent('drone_map_mockup', () => drone_map_mockup);
