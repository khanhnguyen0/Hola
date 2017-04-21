import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions, TouchableHighlight} from 'react-native';


const Row = (props)=>{
  let {height, width} = Dimensions.get('window');
  const dimension = {width:width,height:height/8}
  // console.log(props)
  return (
    <TouchableHighlight onPress ={()=>{rowPressed(props)}} style={props.isFlying?styles.isFlying:styles.container} underlayColor={"cyan"}>
      <Text style={styles.text}>
        {props.name}
      </Text>
    </TouchableHighlight>
  )
}

const rowPressed = (props)=>{
  let {navigator, ...passedProps} = props;
  // console.log(passedProps);
  // console.log(props);@gm
  props.navigator.showModal({
    screen:"drone.DronePage",
    title:props.name,
    passProps:{...passedProps},
    navigatorButtons:{
      fab: {
          collapsedId: 'edit',
          collapsedIcon: require('../../assets/nav_edit.png'),
          backgroundColor: '#607D8B'
      },
      animated: true
    }
  });
}

export default Row;

const styles = StyleSheet.create({
  container: {
   flex: 1,
   padding: 12,
   flexDirection: 'row',
   alignItems: 'center',
 },
 text: {
   padding:15,
   marginLeft: 12,
   fontSize: 20,
 },
 isFlying:{
   flex: 1,
   padding: 12,
   flexDirection: 'row',
   alignItems: 'center',
   backgroundColor:"green"
 }
})
