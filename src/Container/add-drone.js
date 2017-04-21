import {connect} from 'react-redux';
import DroneAdd from '../Components/add-drone';
import {showMap, toggleLogin, showRegister, toggleUserPage} from '../Actions/index'

const mapStateToProps = ({homePage,user})=>{
  // console.log(state);
  return {user};
}

const mapDispatchToProps = (dispatch) =>{
  console.log(dispatch);
  return {
    addDrone:(name,user)=>{dispatch(addDrone(name,user))}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DroneAdd);
