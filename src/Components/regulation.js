import React from 'react';
import {Text, View} from 'react-native';

const Regulation = (props) =>{
  props.navigator.toggleTabs({
    to:'shown',
    animated:false
  });
  return (
    <View>
      <Text> This is supposed to be a regulation page</Text>
    </View>
  )
}

export default Regulation;
