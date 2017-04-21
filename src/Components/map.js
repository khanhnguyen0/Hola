import React, {Component} from 'react';
import MapView from 'react-native-maps'
import {TouchableOpacity,
        View,
        StyleSheet,
        Image,
        BackAndroid
      } from 'react-native';

const rad2deg = (rad)=>{
  return rad/Math.PI*180
}

const deg2rad = (deg)=>{
  return deg/180*Math.PI
}
let aspectRatio = 0.1;
let radiusInKM = 400;
let earthRadiusInKM = 6371;
let radiusInRad = radiusInKM / earthRadiusInKM;
let longitudeDelta = rad2deg(radiusInRad / Math.cos(deg2rad(23.568375)));
let latitudeDelta = aspectRatio * rad2deg(radiusInRad);



class Map extends Component{
  constructor(props){
    super(props);

    // this.region = {
    //   latitude: this.props.map.userLocation.latitude,
    //   longitude: this.props.map.userLocation.longitude,
    //   latitudeDelta: 0.0001,
    //   longitudeDelta: 0.00005
    // }

  }

  componentWillReceiveProps(nextProps){
    this.region = {
      latitude: nextProps.map.userLocation.latitude,
      longitude: nextProps.map.userLocation.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    }
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      (position)=>{
        // var p = JSON.stringify(position);
        console.log(position);
        this.props.updateUserLocation({
          latitude:position.coords.latitude,
          longitude:position.coords.longitude
        })
      },
      (err)=>{
        console.log('error getting position', err)
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
    //  var lastPosition = JSON.stringify(position);
    console.log('new position:', position)
    this.props.updateUserLocation({
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    });
   });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render()
  {
    return (
      <View style = {styles.container}>
      <MapView style = {styles.map} showsUserLocation = {true} showsMyLocationButton={true} showsCompass={true} region={this.region}>
      {this.props.map.polys.length>0?this.props.map.polys.map((m,key)=><MapView.Polygon key = {key} style = {styles.polygon} coordinates = {m} strokeWidth = {3} strokeColor = "#f007" fillColor = "rgba(249, 97, 172,0.5)" />):null}
      </MapView>
      </View>
    )
  }
}

export default Map;

const styles = StyleSheet.create({
  map: {
    height: "100%",
    width: "100%",
    borderWidth: 1,
    borderColor: '#000000',
    flex:1
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex:1
  },
  polygon: {
    opacity: 0.4
  }
});
