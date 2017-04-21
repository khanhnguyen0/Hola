import {Navigation} from 'react-native-navigation';

import Login from '../Container/login-page';
import Map from '../Container/map';
import Regulation from '../Components/regulation'
import DroneList from '../Components/dronelist/dronelist'
import DroneAdd from '../Components/add-drone'
import DronePage from '../Components/drone-page'
import FlightCheck from '../Components/flight-check'

export const registerScreens =  (store, Provider)=>{
  Navigation.registerComponent('drone.Login', () => Login, store, Provider);
  Navigation.registerComponent('drone.Map', ()=> Map,store,Provider);
  Navigation.registerComponent('drone.Regulation', ()=> Regulation);
  Navigation.registerComponent('drone.AddDrone', ()=> DroneAdd);
  Navigation.registerComponent('drone.DronePage', ()=> DronePage, store, Provider)
  Navigation.registerComponent('drone.FlightPage', () =>FlightCheck)
}
