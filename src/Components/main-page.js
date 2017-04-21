import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
class MainPage extends Component {
    constructor(props) {
        super(props);
        console.log(props)

    }

    render() {
        const userMenu =(user) => (
            <TouchableOpacity onPress={this.props.toggleUserPage}>
                <Text style={styles.menuText}>{user}</Text>
            </TouchableOpacity>
        )
        const loginMenu = (
            <TouchableOpacity onPress={this.props.showLogin}>
                <Text style={styles.menuText}>LOGIN</Text>
            </TouchableOpacity>
        )
        return (
            <View style={styles.container}>
                <View style={menu1}>
                    {this.props.user.user
                        ? userMenu(this.props.user.user)
                        : loginMenu}
                </View>
                <View style={menu2}>
                    <TouchableOpacity onPress={this.props.showRegulation}>
                        <Text style={styles.menuText}>REGULATION</Text>
                    </TouchableOpacity>
                </View>
                <View style={menu3}>
                    <TouchableOpacity onPress={this.props.showMap}>
                        <Text style={styles.menuText}>MAP</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default MainPage;

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1
    },
    menu: {
        flex: 1,
        justifyContent: 'center'
    },
    menuText: {
        fontSize: 30,
        color: 'white',
        padding: 10,
        textAlign: 'center'
    }
})

const menu1 = StyleSheet.flatten([
    styles.menu, {
        backgroundColor: 'green'
    }
]);
const menu2 = StyleSheet.flatten([
    styles.menu, {
        backgroundColor: 'cyan'
    }
]);
const menu3 = StyleSheet.flatten([
    styles.menu, {
        backgroundColor: 'darkkhaki',
        flex: 2
    }
]);
