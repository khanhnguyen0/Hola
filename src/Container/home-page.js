import {connect} from 'react-redux';
import App from '../app.js';
import {showMap, toggleLogin, showRegister, toggleUserPage} from '../Actions/index'

const mapStateToProps = ({homePage,user})=>{
  // console.log(state);
  return {homePage,user};
}

const mapDispatchToProps = (dispatch) =>{
  return {
    showMap:()=>{dispatch(showMap())},
    showLogin: ()=>{ dispatch(toggleLogin())},
    toggleUserPage: ()=> {dispatch(toggleUserPage())}
  }
}

const HomePage = connect(mapStateToProps,mapDispatchToProps)(App);

export default HomePage;
