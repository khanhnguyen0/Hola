import {connect} from 'react-redux'

import Login from '../Components/login'
import {showRegister, loginSuccess, toggleLogin, fetchDrones} from '../Actions/index'

const mapStateToProps = ({Login,user}) => {
    return {Login,user}
}

const mapDispatchToProps = (dispatch) => {
    return {
        userLogin: (user) =>{
          dispatch(userLogin(user))
        },
        loginSuccess: (user) => {
          dispatch(loginSuccess(user))},
        toggleLogin : () =>{
          dispatch(toggleLogin())
        },
        fetchDrones: (user)=>{
          dispatch(fetchDrones(user))
        }
    }
}

const LoginPage = connect(mapStateToProps, mapDispatchToProps)(Login)
export default LoginPage;
