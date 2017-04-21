import React, {Component} from 'react'
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import axios from 'axios'

class RegisterForm extends Component{
  constructor(props){
    super(props)

    this.state = {
      username:'',
      email:'',
      password:'',
      passwordConfirm:'',
      warning:''
    }

    this.register = this.register.bind(this)
  }

  register(){
    console.log(this.state)
    if (!this.state.username){
      this.setState({warning:"Please enter a username"});
      return;
    }
    if (!this.state.email){
      this.setState({warning:"Please enter a valid email address"})
      return;
    }
    if (!this.state.password){
      this.setState({warning:"Please enter a password"})
      return;
    }
    if (this.state.password != this.state.passwordConfirm){
      this.setState({warning:"Passwords don't match"})
      return;
    }
    this.setState({warning:''})
    axios({
      method:'post',
      url:'http://10.0.1.34:5000/register',
      data:{
        username:this.state.username,
        email:this.state.email,
        password:this.state.password
      }
    }).then(response=>{
      if (response.data.id){
        this.setState({warning:'Registered successfully'})
        return
      }
      if (response.data.err){
        switch(response.data.err){
          case 11000:
          this.setState({warning:'Email already existed'});
          break;
          default:
          this.setState({warning:'Unknown Error'});
          break;
        }
        return;
      }
    }).catch(err=>{
      console.log(err)
    })
  }

  render(){
    return ( <View style = {styles.register}>
      <TextInput underlineColorAndroid = 'transparent' style = {styles.email} placeholder = "Username" value = {this.state.username} onChangeText={(username)=>{this.setState({username})}}  />
      <TextInput keyboardType="email-address" underlineColorAndroid = 'transparent' style = {styles.email} placeholder = "Email" value = {this.state.email} onChangeText={(email)=>{this.setState({email})}}/>
      <TextInput underlineColorAndroid = 'transparent' style = {styles.password} placeholder = "Password" secureTextEntry={true} value = {this.state.password} onChangeText={(password)=>{this.setState({password})}}/>
      <TextInput underlineColorAndroid = 'transparent' style = {styles.password} placeholder = "Confirm password" secureTextEntry={true} value = {this.state.passwordConfirm} onChangeText={(passwordConfirm)=>{this.setState({passwordConfirm})}}/>
      <Text style = {styles.warning}>{this.state.warning}</Text>
      <TouchableOpacity activeOpacity={0.5} style = {styles.loginButton} onPress={this.register} >
        <Text style = {styles.loginText}>REGISTER</Text>
      </TouchableOpacity>
    </View>)
  }
}

export default RegisterForm;

const styles = StyleSheet.create({
  register:{
    flex:1,
    alignItems: "flex-start",
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    top:"50%",
    width: "100%",
    height: "50%",
  },
  email:{
    marginTop:10,
    height:40,
    borderRadius:20,
    borderColor : "gray",
    borderWidth:0.5,
    width: "75%",
    textAlign:"center",
    alignItems: "center"
  },
  password:{
    marginTop:10,
    height:40,
    borderRadius:20,
    borderColor : "gray",
    borderWidth:0.5,
    width: "75%",
    textAlign:"center",
    alignItems: "center"
  },
  loginButton:{
    backgroundColor:'#007331',
    marginTop:10,
    width: "75%",
    height:40,
    borderRadius:20,
    alignItems:'center'
  },
  loginText:{
    marginTop:10,
    textAlign:'center',
    color:"#FFF"
  },
  warning:{
    marginTop:10,
    textAlign:'center',
    color:"red"
  }
})
