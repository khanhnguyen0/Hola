import types from '../Constant/action-types'
import {combineReducers} from 'redux'
import geolib from 'geolib'

const isInside = (element, i, arr) =>{
  console.log(element, arr);
  return geolib.isPointInside(element,arr);
}

const initialState = {
    showMap: false,
    showLogin: false,
    showRegulation: false,
    showUserPage: false
}

const user = (state = {
    user: '',
    id: '',
    email: '',
    isLogin: false
}, action) => {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return Object.assign({}, state, {
                user: action.user.username,
                email: action.user.email,
                id: action.user.id,
                isLogin: true
            });

        case types.USER_LOGOUT:
            return Object.assign({}, state, {
                user: '',
                email: '',
                id: '',
                isLogin: false
            });

        default:
            return state;
    }
}

const map = (state = {
  polys:[],
  flightAvailable: false,
  userLocation:{
    latitude:0,
    longitude:0,
  }
}, action) =>{
  switch(action.type){
    case types.UPDATE_USER_LOCATION:
    return ({...state, userLocation:action.userLocation})

    case types.CHECK_FLIGHT_AVAILABILITY:
    return ({...state, flightAvailable:!state.polys.some((p)=>isPointInside(state.userLocation,p))});

    case types.UPDATE_ZONE:
    return ({...state, polys:action.polys})

    default:
    return state;
  }
}

const userPage = (state = {
  droneList:[],
  selectedDrone:-1

}, action) =>{
  switch (action.type) {
    case types.LOAD_DRONES_SUCCESS:
    return Object.assign({},state,{
      droneList:action.droneList
    });

    case types.SELECT_DRONES:
    return Object.assign({},state,{
      selectedDrone: action.selectedDrone
    });

    default:
    return state;
  }
}

const condition = (state ={
  temp_c:null,
  wind_kph:null,
  condition:{
    text:null,
    code:null
  },
  lastUpdated:null
},action) =>{
  switch (action.type){
    case types.UPDATE_CONDITION:
    return {...state,temp_c:action.payload.temp_c,wind_kph:action.payload.wind_kph, condition:action.payload.condition, lastUpdated: new Date()}

    default:
    return state;
  }
}

const homePage = (state = initialState, action) => {
    switch (action.type) {
        case types.TOGGLE_MAP:
            return Object.assign({}, state, {
                showMap: !state.showMap
            });

        case types.TOGGLE_REGULATION:
            return Object.assign({}, state, {
                showRegulation: !state.showRegulation
            });

        case types.TOGGLE_USER_PAGE:
            return Object.assign({}, state, {
                showUserPage: !state.showUserPage
            })

        case types.TOGGLE_LOGIN:
            return Object.assign({}, state, {
                showLogin: !state.showLogin
            })
        default:
            return state;
    }
}

const loginPage = (state = {
    showRegister: false,
    email: '',
    password: '',
    warning: ''
}, action) => {
    switch (action.type) {
        case types.TOGGLE_REGISTER:
            return Object.assign({}, state, {
                showRegister: !state.showRegister
            });

        case types.EMAIL_LOGIN_CHANGE:
            return Object.assign({}, state, {email: action.payload.email});

        case types.PASSWORD_LOGIN_CHANGE:
            return Object.assign({}, state, {password: action.payload.password})

        default:
            return state
    }
}
export default combineReducers({user, loginPage, homePage, userPage, map, condition});
