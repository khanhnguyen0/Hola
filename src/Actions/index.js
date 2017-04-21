import types from '../Constant/action-types'

export const userLogin = (user) =>{
  return ({type: types.USER_LOGIN, user});
}

export const userLogout = () =>{
  return ({type: types.USER_LOGOUT})
}

export const requestLogin = (user) =>{
  return ({type: types.REQUEST_LOGIN, user})
}

export const showMap = ()=>{
  return ({type: types.TOGGLE_MAP})
}

export const showRegulation = ()=>{
  return ({type: types.TOGGLE_REGULATION})
}

export const showRegister = ()=>{
  return ({type: types.TOGGLE_REGISTER})
}

export const requestRegister = (user) =>{
  return ({type: types.REQUEST_REGISTER, user})
}

export const showHomePage = () =>{
  return ({type: types.SHOW_HOME_PAGE})
}

export const toggleUserPage = () =>{
  return ({type: types.TOGGLE_USER_PAGE})
}

export const toggleLogin = () =>{
  return ({type:types.TOGGLE_LOGIN})
}

export const loginSuccess = (user)=>{
  return {type:types.LOGIN_SUCCESS,user}
}

export const addDrone = (drone,user)=>{
  return {type:types.ADD_DRONE, payload:{name:drone.name,email:user.email}}
}

export const fetchDrones = (user)=>{
  return {type:types.FETCH_DRONES_DATA,user}
}

export const flyDrone = (drone)=>{
  // console.log(user)
  return {type:types.FLY_DRONE,drone}
}

export const updateDrone = (drone)=>{
  return {type:types.UPDATE_DRONE, payload:{...drone}}
}

export const deleteDrone = (drone)=>{
  return {type:types.DELETE_DRONE,payload:{id:drone._id, email:drone.ownerEmail}}
}

export const updateUserLocation = (userLocation) =>{
  return {type:types.UPDATE_USER_LOCATION, userLocation}
}

export const checkFlightAvailability = () =>{
  return {type:types.CHECK_FLIGHT_AVAILABILITY}
}

export const updateZones = (polys) =>{
  return {type:types.UPDATE_ZONE, polys}
}

export const fetchCondition = (location)=>{
  return {type:types.FETCH_CONDITION, userLocation:location}
}
