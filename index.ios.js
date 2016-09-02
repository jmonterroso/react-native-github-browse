/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
AppRegistry,
StyleSheet,
Text,
View,
ActivityIndicator
} from 'react-native';

var Login = require('./login');
var AppContainer = require('./AppContainer');
var AuthService = require('./AuthService');


class GithubBrowse extends Component {
    componentDidMount() {

        AuthService.getAuthInfo((err, authInfo) => {
            console.log(authInfo, 'authInfo '); //deleteinbuild
            this.setState({
                checkingAuth: false,
                isLoggedIn: authInfo != null

            })
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            checkingAuth: true
        }
    }

    render() {
        if (this.state.checkingAuth) {
            return (

                <View style={styles.container}>
                    <ActivityIndicator animating={true} size="large" style={styles.loader}/>
                </View>
            );
        }

        if (this.state.isLoggedIn) {
            return (
                <AppContainer/>
            );
        } else {
            return (
                <Login onLogin={this.onLogin.bind(this)}/>
            );


        }

    }

    onLogin() {
        this.setState({isLoggedIn: true});
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
