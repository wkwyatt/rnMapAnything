/**
 * Map container
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import MapView from 'react-native-maps';

export default class App extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.container}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top:0,
        right:0,
        left:0,
        bottom:0,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});