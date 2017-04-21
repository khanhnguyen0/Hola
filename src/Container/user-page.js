import {connect} from 'react-redux'

import UserPage from '../Components/user-page'

import {userLogout, toggleUserPage, fetchDrones, addDrone, flyDrone, deleteDrone, updateDrone, checkFlightAvailability, fetchCondition} from '../Actions/index'

const mapStateToProps = ({user, userPage, map, condition}) =>{
  return {user, userPage, map, condition}
}

const mapDispatchToProps = (dispatch) =>{
  return {
    userLogout: () => {dispatch(userLogout())},
    toggleUserPage: () =>{dispatch(toggleUserPage())},
    fetchDrones: (user)=>{dispatch(fetchDrones(user))},
    addDrone: (drone,user)=>{dispatch(addDrone(drone,user))},
    flyDrone: (drone)=>{dispatch(flyDrone(drone))},
    deleteDrone: (drone) =>{dispatch(deleteDrone(drone))},
    updateDrone: (drone) =>{dispatch(updateDrone(drone))},
    checkFlightAvailability: ()=>{dispatch(checkFlightAvailability())},
    fetchCondition: (location) =>{dispatch(fetchCondition(location))}
  }
}


export default connect(mapStateToProps, mapDispatchToProps) (UserPage)
