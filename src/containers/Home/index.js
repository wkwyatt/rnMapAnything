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
import Map from '../Map'
import Search from 'react-native-search-box';

export default class App extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    searchForPredictions(txt) {
    }

    render() {
        return (
            <View style={styles.container}>
                <Map>
                    <View style={{flex:1, marginTop:60, paddingHorizontal:20}}>
                        <Search
                            ref="search_box"
                            /**
                             * There many props that can be customized
                             */
                            onChangeText={(txt) => this.searchForPredictions(txt)}
                        />
                        <FlatList
                            data={[{key: 'a'}, {key: 'b'}]}
                            renderItem={({item}) => <Text style={{backgroundColor: 'gray'}}>{item.key}</Text>}
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
