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
} from 'react-native';
import { Icon } from 'react-native-vector-icons/FontAwesome';
import { ListItem } from 'react-native-elements';
import Search from 'react-native-search-box';
import RNGooglePlaces from 'react-native-google-places';
import { Marker } from 'react-native-maps';
import Map from '../Map'

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            predictions: []
        };
    }

    searchForPredictions(txt) {
        if (txt == '' || txt.length < 1) {
            this.setState({predictions: []});
            return;
        }

        RNGooglePlaces.getAutocompletePredictions(txt)
            .then((results) => {
                this.setState({ predictions: results });
                console.log(results);
            })
            .catch((error) => console.log(error.message));
    }

    _renderItem = ({item}) => (
        <ListItem
            leftIcon={{name:"place"}}
            containerStyle={{backgroundColor: '#fff'}}
            hideChevron
            title={item.primaryText}
            subtitle={item.secondaryText}
        />
    );

    render() {
        return (
            <View style={styles.container}>
                <Map
                    markers={(
                        <Marker
                            title="TEST"
                            description="DESC"
                            pinColor="red"
                            coordinate={{
                                latitude: 37.78825,
                                longitude: -122.4324,
                            }}
                        />
                    )}
                >
                    <View style={{flex:1, marginTop:60, paddingHorizontal:20}}>
                        <Search
                            ref="search_box"
                            /**
                             * There many props that can be customized
                             */
                            onChangeText={(txt) => this.searchForPredictions(txt)}
                            onCancel={() => this.setState({predictions: []})}
                        />
                        <FlatList
                            data={this.state.predictions}
                            keyExtractor={(item, index) => item.placeID}
                            renderItem={this._renderItem}
                        />
                    </View>
                </Map>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
