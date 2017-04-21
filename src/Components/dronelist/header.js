import React from 'react';
import {View,Text, StyleSheet} from 'react-native';


const Header = (props)=>{

  return (
    <View style  = {styles.container}>
      <Text>
        My Drones
      </Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
   flex: 1,
   padding: 8,
   flexDirection: 'row',
   alignItems: 'center',
   backgroundColor: '#C1C1C1',
 }
})
