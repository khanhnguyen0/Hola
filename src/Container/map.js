import {connect} from 'react-redux';
import Map from '../Components/map';
import {updateUserLocation, checkFlightAvailability, updateZones} from '../Actions/index'
const mapStateToProps = ({map})=> {

  return {map}
};

const mapDispatchToProps = (dispatch) =>{
  return {
    updateUserLocation: (location)=>{dispatch(updateUserLocation(location))},
    checkFlightAvailability: ()=>{dispatch(checkFlightAvailability())},
    updateZones: (zones) => {dispatch(updateZones(zones))}
  }
}
export default connect (mapStateToProps,mapDispatchToProps) (Map);
