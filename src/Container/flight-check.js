import {connect} from 'react-redux';
import FlightCheck from '../Components/flight-check';
import {checkFlightAvailability, fetchCondition} from '../Actions/index';

const mapStateToProps = ({map,condition}) =>{
  return {map, condition}
}

const mapDispatchToProps = (dispatch) =>{
  return {
    checkFlightAvailability: ()=>{dispatch(checkFlightAvailability())},
    fetchCondition: (location)=>{dispatch(fetchCondition(location))}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(FlightCheck);
