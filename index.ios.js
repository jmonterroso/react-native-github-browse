/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
var Login = require('./login');

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class GithubBrowse extends Component {
  render() {
    var message = 'foo';
    return (
        <Login/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('GithubBrowse', () => GithubBrowse);
