import React, {Component} from 'react';
import {View,
        Image,
        TextInput,
        TouchableOpacity,
        StyleSheet,
        Text,
        BackAndroid

} from 'react-native'

import DroneList from './dronelist/dronelist'

class UserPage extends Component {
  constructor(props){
    super(props)

    this.state = {
      showDroneList:false,
      showFlight:false,
      showLand:false
    }
  }

  componentDidMount(){
    // BackAndroid.addEventListener('hardwareBackPress',()=>{
    //   this.props.toggleUserPage()
    // })
    // console.log(this.props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  onNavigatorEvent(e){
    // console.log('backingoff', e)
    // console.log(e.id)
    if (e.type!='NavBarButtonPress') return;
    if (e.id == 'backPress'){
      this.setState({showDroneList:false, showLand:false,showFlight:false})
    }
    if (e.id == 'add'){
      this.props.navigator.showModal({
        screen: "drone.AddDrone",
        title: "Add a new drone",
        passProps:{user:this.props.user,addDrone:this.props.addDrone},
        navigatorStyle:{},
        animationType:"slide-up"
      })
    }
  }

  componentDidUpdate(){
    if (this.state.showDroneList) return;
    this.props.navigator.setTitle({title:'Home'})
  }

  componentWillUnmount(){
    this.props.navigator.setOnNavigatorEvent(null)
  }

  componentWillReceiveProps(nextProps){
    console.log('user page have new props');
    // this.forceUpdate();
  }

  render(){
    if (this.state.showDroneList) return  <DroneList { ...this.props}  dataSource = {this.props.userPage.droneList}  />
  if (this.state.showFlight) return  <DroneList {...this.props}  dataSource  = {this.props.userPage.droneList.filter(d=>!d.isFlying)}/>
    if (this.state.showLand) return <DroneList {...this.props} dataSource  = {this.props.userPage.droneList.filter(d=>d.isFlying)} />

return (<View style = {styles.container}>
      <View style = {styles.row} >
        <TouchableOpacity style ={styles.thumbnail} onPress={()=>{this.setState({showDroneList:true});}}>
          <Image source={require('../assets/drone_icon.png')} style = {styles.images}></Image>
          <Text style = {styles.text}>MY DRONES</Text>
        </TouchableOpacity>
        <TouchableOpacity style ={styles.thumbnail} onPress={()=>{this.setState({showFlight:true})}}>
          <Image source={require('../assets/drone_launch_icon.png')} style = {styles.images}></Image>
          <Text style = {styles.text}>FLIGHTS</Text>
        </TouchableOpacity>
      </View>

      <View style = {styles.row} >
        <TouchableOpacity style ={styles.thumbnail} onPress={()=>{this.setState({showLand:true})}}>
          <Image source={require('../assets/drone_land_icon.png')} style = {styles.images}></Image>
            <Text style = {styles.text}>LANDING</Text>
      </TouchableOpacity>
        <TouchableOpacity style ={styles.thumbnail} onPress={()=>{this.props.userLogout(); this.props.toggleUserPage()}}>
          <Image source={require('../assets/log_out_icon.png')} style = {styles.images}></Image>
            <Text style = {styles.text}>LOG OUT</Text>
      </TouchableOpacity>

      </View>
    </View>)
  }
}

export default UserPage;

const styles = StyleSheet.create({
  container:{
    ...StyleSheet.absoluteFillObject,
    flex :1
  },
  images:{
    width:150,
    height:150
  },
  row:{
    flexDirection:"row",
    justifyContent:"center"
  },
  thumbnail:{
    height:170,
    width:150
  },
  text:{
    textAlign:"center"
  }
})
