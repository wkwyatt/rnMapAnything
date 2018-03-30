/**
 * Home screen for map anything
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    NetInfo,
} from 'react-native';
import DismissKeyboard from 'dismissKeyboard';
import { ListItem, Icon } from 'react-native-elements';
import Search from 'react-native-search-box';
import RNGooglePlaces from 'react-native-google-places';
import Map from '../Map'

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            error: false,
            loading: false,
            markers: [],
            predictions: [],
            selectedLocation: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        };
    }

    componentDidMount() {
        NetInfo.addEventListener(
            'connectionChange',
            (conn) => {
                console.log('connected: ', conn);
                if (conn.type == 'none') this.setState({error: 'No Internet Connection'});
            });
    }

    searchForPredictions = (txt) => {
        if (txt == '' || txt.length < 1) {
            this.setState({predictions: []});
            return;
        }

        RNGooglePlaces.getAutocompletePredictions(txt)
            .then((results) => {
                this.setState({ predictions: results });
            })
            .catch((error) => {
                console.warn(`searchForPredictions -> RNGooglePlaces -> getAutocompletePredictions ERROR: ${error.message}`);
                this.setState({error: error.message});
            })
    };

    onLocationPressed = (item) => {
        console.log('pressed');
        DismissKeyboard();
        this.setState({loading: true, predictions: []}, () => {
            RNGooglePlaces.lookUpPlaceByID(item.placeID)
                .then((results) => {
                    const newLocation = {...results, key: item.placeID};
                    const newMarkers = (item.primaryText.toLowerCase() !== 'mapanything') ? this.state.markers : [...this.state.markers, newLocation];
                    this.setState({
                        loading: false,
                        markers: newMarkers,
                        selectedLocation: {
                            ...this.state.selectedLocation,
                            latitude: newLocation.latitude,
                            longitude: newLocation.longitude
                        }
                    });
                })
                .catch((error) => {
                    console.warn(`onLocationPressed -> RNGooglePlaces -> lookupPlaceByID ERROR: ${error.message}`);
                    this.setState({error: error.message});
                });
        });
    };

    _renderItem = ({item}) => (
        <ListItem
            containerStyle={{backgroundColor: '#fff'}}
            hideChevron
            leftIcon={{name:"place"}}
            onPress={() => {
                this.onLocationPressed(item);
            }}
            subtitle={item.secondaryText}
            title={item.primaryText}
        />
    );

    render() {
        return (
            <View style={styles.container}>
                <Map
                    markers={this.state.markers}
                    selectedLocation={this.state.selectedLocation}
                >
                    <View style={{marginTop:60, paddingHorizontal:20}}>
                        <Search
                            onChangeText={(txt) => this.searchForPredictions(txt)}
                            onCancel={() => this.setState({predictions: []})}
                            ref="search_box"
                        />
                        <FlatList
                            data={this.state.predictions}
                            keyExtractor={(item, index) => item.placeID}
                            keyboardShouldPersistTaps="always"
                            keyboardDismissMode="on-drag"
                            renderItem={this._renderItem}
                        />
                        {this.state.error && (
                            <View style={styles.error}>
                            <Icon name="error" size={160} color="#BDBDBD" />
                            <Text style={styles.errorText}>{this.state.error}</Text>
                        </View>
                        )}
                        <ActivityIndicator animating={this.state.loading} color="red" hidesWhenStopped />
                    </View>
                </Map>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flex: 1,
        justifyContent: 'center',
    },
    error: {
        backgroundColor: "#EFEFEF",
        borderColor: "#BDBDBD",
        borderRadius: 10,
        borderWidth: 2,
        justifyContent: 'center',
        marginTop: 80,
        padding: 30,
    },
    errorText: {
        color:'#333333',
        fontFamily: 'Arial',
        fontSize: 22,
        textAlign: 'center'
    }
});
