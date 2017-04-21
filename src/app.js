import React, {Component} from 'react';
import {View, BackAndroid, Navigator} from 'react-native';

import Map from './Components/map'
import Login from './Container/login-page'
import MainPage from './Components/main-page'
import UserPage from './Container/user-page'

class App extends Component{
  constructor(props){
    super(props)

  }

  componentDidMount(){
    // BackAndroid.addEventListener('hardwareBackPress', ()=>{
    //   return true;
    // })
  }



  render(){
    if (this.props.homePage.showLogin) return (<Login />)
    if (this.props.homePage.showMap) return (<Map />)
    if (this.props.homePage.showUserPage) return (<UserPage />)
    return (<MainPage toggleUserPage = {this.props.toggleUserPage} showLogin = {this.props.showLogin} showMap = {this.props.showMap} user = {this.props.user} />)
}
}
export default App;
