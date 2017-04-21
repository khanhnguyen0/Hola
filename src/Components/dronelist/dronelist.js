import React, {Component} from 'react';
import {View, Text, ListView, TextInput, StyleSheet} from 'react-native';

import Row from './row'
import Header from './header'

class DroneList extends Component {
  constructor(props) {

        super(props);
        console.log(props)
        this.state = {};
  }

  componentDidMount() {
    console.log('drone list mounted')
    this.props.navigator.setTitle({title: "My Drones"})
    this.props.navigator.toggleNavBar({to: 'shown'});
    this.props.navigator.setButtons({
        leftButtons: [
            {
                title: 'Back',
                id: 'back',
                showAsAction: 'Always',
                disabled: false
            }
        ],
        fab: {
            collapsedId: 'add',
            collapsedIcon: require('../../assets/nav_add.png'),
            backgroundColor: '#607D8B'
        },
        animated: true
    })
}
  componentWillReceiveProps(nextProps){
    // console.log('droneList updated', nextProps)
  }

  componentWillUnmount(){
    // console.log('drone list unmounted');
    // this.props.navigator.toggleNavBar({to:'hidden'});
    this.props.navigator.setButtons({
      leftButtons:[],
      fab:{},
      animated:true
    });
  }

  render(){
    const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>{console.log('r1 = ',r1); return r1.condition.lastUpdated!==r2.condition.lastUpdated}});
    return <ListView
      style = {styles.container}
      enableEmptySections={true}
      dataSource = {ds.cloneWithRows(this.props.dataSource)}
      renderRow = {(data)=><Row {...data} {...this.props} navigator = {this.props.navigator} />}
      renderSeparator = {(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      renderHeader ={()=><Header />}/>
  }
}

export default DroneList;

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  separator: {
   flex: 1,
   height: StyleSheet.hairlineWidth,
   backgroundColor: '#8E8E8E',
 },
})
