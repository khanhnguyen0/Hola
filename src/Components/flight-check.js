import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class FlightCheck extends Component{
  constructor(props){
    console.log(props);
    super(props);
    this.state = {

    }
  }

  componentDidMount(){
    this.props.checkFlightAvailability();
    this.props.fetchCondition(this.props.map.userLocation);
  }

  componentWillReceiveProps(nextProps){
    // if (this.state.done) return;
    let {zone, wind, temperature, weather} = this.state;
    if ((zone && wind) && (temperature && weather)) return;
    console.log('received new props:',nextProps);
    if (nextProps.map.flightAvailable) this.setState({zone:{success:this.props.map.flightAvailable}}); else return;
    if (nextProps.condition)
      {
        this.setState({weather:{success:this.props.condition.condition.code<1050},
        wind:{success:this.props.condition.wind_kph<20},
        temperature:{success:this.props.condition.temp_c>10},
        done:true
      },()=>{
        this.props.requestDone(this.state);
      });
    // console.log(this.state);
    // this.setState({done:true});
  }
}

  shouldComponentUpdate(nextProps,nextState){
      if (this.state.done) return false;
      return true;
  }

  componentDidUpdate(){
  }


  render(){
    const checked = (<Icon name = "check" size = {20} color = "#255dea"/>)
    const failed = (<Icon name = "times" size = {20} color = "#e8461e"/>)
    const loading = (<ActivityIndicator name ="fa spinner" size = "small" color ="grey"/>)
    return (
      <View>
        <Text>
          Checking no flights zone
        </Text>
        {this.state.zone?this.state.zone.success?checked:failed:loading}
        <Text>
          Checking weather condition :{this.props.condition.condition?this.props.condition.condition.text:null}
        </Text>
        {this.state.weather?this.state.weather.success?checked:failed:loading}
        <Text>
          Checking wind condition :{this.props.condition.condition?this.props.condition.wind_kph+" km/h":null}
        </Text>
        {this.state.wind?this.state.wind.success?checked:failed:loading}
        <Text>
          Checking temperature condition :{this.props.condition.temp_c?this.props.condition.temp_c+" °C":null}
        </Text>
        {this.state.temperature?this.state.temperature.success?checked:failed:loading}
      </View>
    )
  }
}

export default FlightCheck;

const styles = StyleSheet.create({
  container:{
    flex:1,
    ...StyleSheet.absoluteFillObject,
    justifyContent:'center',
    flexDirection:'row'
  }

})
