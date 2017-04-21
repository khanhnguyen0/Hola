import {call, put, takeEvery,takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import types from '../Constant/action-types'
import {addDroneAPI,fetchDronesAPI, flyDroneAPI, deleteDroneAPI, updateDroneAPI, weatherAPI} from '../Constant/API'

function* fetchDrones(action){
  console.log(addDroneAPI,fetchDronesAPI)
  try
   {
      const drones = yield call(axios, {method:'post',data:{email:action.user.email},url:fetchDronesAPI});
      yield put ({type:types.LOAD_DRONES_SUCCESS, droneList:drones.data})
   }
      catch(e){
        console.log(e)
        yield put({type:types.LOAD_DRONES_FAILED,message:e.message})
      }
}

function* addDrone(action){

  try
   {
      const drones = yield call(axios, {method:'post',data:{email:action.payload.email, name:action.payload.name},url:addDroneAPI});
      yield put ({type:types.FETCH_DRONES_DATA, user:{email:action.payload.email}})
   }
      catch(e){
        yield put({type:types.ADD_DRONE_FAILED,message:e.message})
      }
}

function* deleteDrone(action){
  try
  {
    const del = yield call(axios,{method:'get',url:`${deleteDroneAPI}/${action.payload.id}`});
    yield put ({type:types.FETCH_DRONES_DATA, user:{email:action.payload.email}})
  }
  catch(e)
  {
    yield put({type:types.DELETE_DRONE_FAILED,message:e.message})
  }
}

function* updateDrone(action){
  try
  {
    const del = yield call(axios,{method:'post',url:updateDroneAPI, data:action.payload});
    yield put ({type:types.FETCH_DRONES_DATA, user:{email:action.payload.email}})
  }
  catch(e)
  {
    yield put({type:types.UPDATE_DRONE_FAILED,message:e.message})
  }
}

function* fetchCondition(action){
  try
  {
    const condition = yield call(axios.get,`${weatherAPI}${action.userLocation.latitude},${action.userLocation.longitude}`);
    yield put ({type:types.UPDATE_CONDITION, payload:condition.data.current});
  }
    catch (e){
      yield put({type:types.FETCH_CONDITION_FAILED, message:e});
    }
}

function* fetchZones(action){
  try
  {
    const zones = yield call(axios.get,fetchZoneAPI)
    yield put (type.UPDATE_ZONE, zones.data);
  }
  catch (e)
  {
    yield put ({type:types.FETCH_ZONE_FAILED,message:e.message})
  }
}

function* flyDrone(action){
  try{
    const flyDrone = yield call(axios,{method:'post',url:flyDroneAPI, data:{id:action.drone._id}})
    yield put ({type:types.FETCH_DRONES_DATA, user:{email:action.drone.ownerEmail}})
  }
  catch (e)
  {
    yield put({type:types.FLY_DRONE_FAILED, message:e.message})
  }

}

function* droneSaga(){
  yield takeLatest(types.FETCH_DRONES_DATA, fetchDrones);
  yield takeLatest(types.ADD_DRONE, addDrone);
  yield takeLatest(types.FLY_DRONE, flyDrone);
  yield takeLatest(types.DELETE_DRONE, deleteDrone);
  yield takeLatest(types.UPDATE_DRONE, updateDrone);
  yield takeLatest(types.FETCH_ZONE, fetchZones);
  yield takeLatest(types.FETCH_CONDITION, fetchCondition);
  yield takeLatest(types.UPDATE_USER_LOCATION, fetchCondition);
}

export default droneSaga;
