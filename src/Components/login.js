import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  BackAndroid,
  InteractionManager
} from 'react-native';
import axios from 'axios';
import KeyboardSpacer from 'react-native-keyboard-spacer'
import UserPage from '../Container/user-page'
import RegisterForm from './register'

class Login extends Component {
  constructor(props){
    super(props)

    console.log(props);
    this.state = {
      renderPlaceholderOnly:true,
      register:false,
      email:'',
      password:'',
      warning:''
    }

    this.login = this.login.bind(this)
  }

login() {
    // console.log(this.state)
    axios({
        method: 'post',
        url: 'http://192.168.1.100:5000/login',
        data: {
            email: this.state.email,
            password: this.state.password
        }
    }).then(({data}) => {
        console.log(this.props.loginSuccess)
        if (data.success) {
            console.log('login success');
            this.props.loginSuccess(data);
            this.props.fetchDrones(data);
            this.props.toggleLogin();
            this.props.navigator.setTitle({
              title:'Home'
            })
            // this.props.setUser({});
        } else {
            this.setState({warning: "Invalid email and password combination"})
        }
    }).catch(err => {
        console.log(err)
    })
}

  componentDidMount(){
    // this.props.navigator.toggleNavBar({to:'hidden'});
    // BackAndroid.addEventListener('hardwareBackPress',()=>{
    //   console.log('pressed');
    //   Actions.pop();
    // })
    // this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))

  }

  componentDidUpdate(){
    console.log('updated')
    this.props.navigator.setTitle({
      title:'Login'
    })
  }

  onNavigatorEvent(e){
    // console.log('backingoff', e)
    if (e.type!='NavBarButtonPress') return;
    console.log(e.id)
    if (e.id == 'backPress'){
      // this.props.toggleUserPage()
    }
  }

  render(){
    const loginForm = (<View style = {styles.login}>
    <TextInput keyboardType="email-address" underlineColorAndroid = 'transparent' style = {styles.email} placeholder = "Email" value = {this.state.email} onChangeText={(email)=>{this.setState({email})}}/>
    <TextInput underlineColorAndroid = 'transparent' style = {styles.password} placeholder = "Password" secureTextEntry={true} value = {this.state.password} onChangeText={(password)=>{this.setState({password})}}/>
    <Text style = {styles.warning}>{this.state.warning}</Text>
    <TouchableOpacity activeOpacity={0.5} style = {styles.loginButton} onPress={this.login} >
    <Text style = {styles.loginText}>LOGIN</Text>
    </TouchableOpacity>
    <Text style = {{marginTop:20}}> Don't have an account? </Text>
    <TouchableOpacity activeOpacity={0.5} style = {styles.loginButton} onPress = {()=>{this.setState({register:true})}}>
    <Text style = {styles.loginText}>REGISTER</Text>
    </TouchableOpacity>
    </View>)

    if (this.props.user.id) return <UserPage navigator= {this.props.navigator}/>
    return (
      <View style = {styles.body}>
      <View style = {styles.container}>
      <Image style = {styles.logo} source = {require('../assets/emirates_logo.png')} />
      </View>
      {this.state.register?<RegisterForm />:loginForm}
      <KeyboardSpacer topSpacing = {0}/>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  body:{
    ...StyleSheet.absoluteFillObject,
    flex :1,
    alignItems: "flex-start",
    flexDirection:"column"
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
    height:'50%',
    backgroundColor:'#007331'
  },
  logo :{
    width:80,
    height:110
  },
  login:{
    position: 'absolute',
    top:"50%",
    width: "100%",
    height: "50%",
    alignItems: "center",
    flexDirection: 'column'
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
  register:{
    position:'absolute',
    top:520,
    alignItems:'center'
  },
  warning:{
    marginTop:10,
    textAlign:'center',
    color:"red"
  }
})

export default Login;
