import React, {Component} from 'react';
import {TextInput, View, Text, StyleSheet, Button } from 'react-native'

class DroneAdd extends Component{
  constructor(props){
    super(props);

    this.state = {
      name:'',
      warning:''
    }
  }

  submit(){
    this.props.addDrone({name:this.state.name},this.props.user);
    this.props.navigator.dismissModal({
      animationType:'slide-down'
    })
  }

  componentDidMount(){
    
  }

  render(){
    return (
      <View style = {styles.container}>
        <Text>Name</Text>
        <TextInput underlineColorAndroid="transparent" style = {styles.input} autoFocus={true} value = {this.state.name} onChangeText={(text)=>{this.setState({name:text})}} />
          <Text style = {styles.warning}>{this.state.warning}</Text>
      <Button style = {styles.button} title = "Submit" onPress = {this.submit.bind(this)}/>
    </View>
    )
  }
}

export default DroneAdd;

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: "flex-start",
    flexDirection:"column",
    backgroundColor:"white"
  },
  input:{
    marginTop:10,
    height:40,
    borderRadius:20,
    borderColor : "gray",
    borderWidth:0.5,
    width: "75%"
  },
  button:{
    backgroundColor:'#007331',
    marginTop:10,
    width: "75%",
    height:40,
    alignItems:'center'
  }
})
