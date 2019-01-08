import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Root from './src/Root';


type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Root />
      </View>
    );
  }
}

