/**
 * React Native App
 * https://github.com/facebook/react-native
 * @flow
 *
 * Framework for map anything
 */

import React, {Component} from 'react';
import { View, Text, AsyncStorage } from 'react-native';
// redux deps
import {Provider} from 'react-redux';
import { persistStore } from 'redux-persist';
import store from './src/store';

// components
import Home from './src/containers/Home';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { rehydrated: false };
  }

  componentWillMount() {
    persistStore(store, {
      // blacklist: ['session'],
      storage: AsyncStorage
    }, () => {
      this.setState({ rehydrated: true });
      console.log('rehydrated');
    });
  }

  render() {
    if (!this.state.rehydrated) {
      return (<View><Text>Loading...</Text></View>);
    }
    return (
        <Provider store={store}>
          <Home />
        </Provider>
    );
  }
}
