/**
 * Map container
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedLocation: props.selectedLocation
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.selectedLocation !== nextProps.selectedLocation) {
            this.setState({selectedLocation: nextProps.selectedLocation});
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    region={this.props.selectedLocation}
                    scrollEnabled
                    style={styles.container}
                >
                    {this.props.markers.map((loc) => {
                        console.log(loc);
                        return (
                            <Marker
                                coordinate={{
                                    latitude: loc.latitude,
                                    longitude: loc.longitude,
                                }}
                                description={loc.website || ""}
                                identifier={`Marker${loc.key}`}
                                image={require('../../assets/ma-marker.png')}
                                key={`Marker${loc.key}`}
                                pinColor="red"
                                title={loc.name}
                            />
                        )
                    })}
                </MapView>
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
