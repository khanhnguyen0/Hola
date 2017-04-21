import React, {Component} from 'react';
import {View, Text, Button, TextInput, StyleSheet, Keyboard} from 'react-native';
import PopupDialog, {DialogTitle, SlideAnimation} from 'react-native-popup-dialog'
import _ from 'lodash';
import FlightCheck from '../Container/flight-check'

class DronePage extends Component{

  constructor(props){
    // console.log(props);
    super(props);
    this.state = {
      editable:false,
      name:props.name,
      checking:false,
      ready: false
    }
  }

  flyDrone(){
    if (!this.state.ready && !this.props.isFlying) return;
    this.props.flyDrone(this.props);
    this.props.navigator.dismissModal({
      animationType:'slide-down'
    });
  }



  requestFlight(){
    this.setState({checking:true})
  }

  deleteDrone(){
    this.props.deleteDrone({
      _id:this.props._id,
      ownerEmail:this.props.ownerEmail
    });
    this.props.navigator.dismissModal({
      animationType:'slide-down'
    });
  }

  componentWillReceiveProps(nextProps){
    console.log('received props in dron page:', nextProps)
    this.setState({checking:true});
  }


  componentDidMount() {
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  onNavigatorEvent(e){
    // console.log('backingoff', e)
    // console.log(e.id)
    if (e.type!='NavBarButtonPress') return;
    if (e.id == 'backPress'){
      this.setState({showDroneList:false})
    }
    if (e.id === 'edit'){
      this.props.navigator.setButtons({
        fab:{
          collapsedId:'save',
          collapsedIcon: require('../assets/nav_save.png'),
          backgroundColor: '#607D8B'
        }
      })
      this.setState({editable:!this.state.editable});
    }

    if (e.id =='save'){
      this.props.updateDrone({_id:this.props._id,name:this.state.name, email:this.props.ownerEmail});
      this.props.navigator.dismissModal({
        animationType:'slide-down'
      })
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

  requestDone({temperature,weather,zone,wind}){
    console.log(temperature,weather,zone,wind);
    if (!((temperature && weather) &&(wind && zone))) return;
    // console.log(result);
    // console.log('zone :', zone);
    if ( zone.success ) this.setState({ready:true});
  }

  componentWillUnmount(){
    console.log('drone page unmounting')
    // this.props.navigator.toggleNavBar({to:'hidden'});
  }

  render(){
    const time = new Date(this.props.timeAdded);
    const totalFlightTime = new Date(flightTime(this.props.flights))

    const flyRequestButton =   <Button title ={"Request flight"} onPress= {this.requestFlight.bind(this)} />
    const flyButton =   <Button title ={this.state.ready?"fly":"flight condition not met, cannot take flight"} onPress= {this.flyDrone.bind(this)}/>
    const landButton =   <Button title ="land" onPress= {this.flyDrone.bind(this)}/>

    return (
      <View style = {styles.container}>
        <TextInput value ={this.state.name} editable={this.state.editable} autoFocus={this.state.editable} onChangeText={(name)=>{this.setState({name})}}/>
        <Text> Created at {time.toLocaleString()}</Text>
        <Text> Number of flights: {this.props.flights.length}</Text>
        <Text> Total flights time: {`${totalFlightTime.getUTCHours()} hours and ${totalFlightTime.getUTCMinutes()} minutes`}</Text>
        <View>
          {this.state.checking?<FlightCheck {...this.props} requestDone = {this.requestDone.bind(this)}/>:null}
        </View>
        {!this.props.isFlying?this.state.ready?flyButton:flyRequestButton:landButton}
        <View style = {styles.del}>
          {this.state.editable?<Button color = "red" title = "Delete Drone" onPress = {this.deleteDrone.bind(this)}/>:null}
        </View>
    </View>
    )
  }
}

const flightTime = (flights)=>{
  let time = 0;
  let fTime = flights.map(f=>{
    start = new Date(f.start);
    end = f.end? new Date(f.end):new Date();
    // console.log(end-start);
    return (end-start);
  })
  // console.log(_.sum(fTime))
  return _.sum(fTime);
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  },
  del:{
    paddingTop:10
  }
})

export default DronePage;
