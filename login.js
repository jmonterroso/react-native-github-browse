import React, {Component} from 'react';


import {
    AppRegistry,
    Text,
    StyleSheet,
    View,
    Image,
    TextInput,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showProgress: false
        }
    }

    render() {
        var errorCtrl = <View />

        if (!this.state.success && this.state.badCredentials) {
            errorCtrl = <Text style={styles.error}>
                That username and password combination did not work
            </Text>;
        }

        if (!this.state.success && this.state.unknownError) {
            errorCtrl = <Text style={styles.error}>
                We experienced an unexpected issue
            </Text>;
        }


        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={require('./img/Octocat.png')}></Image>
                <Text style={styles.heading}>
                    Github browser
                </Text>
                <TextInput
                    onChangeText={(text) => this.setState({username: text})}
                    style={styles.input} placeholder="Github Username"></TextInput>
                <TextInput onChangeText={(text) => this.setState({password: text})} secureTextEntry={true}
                           style={styles.input} placeholder="Github Password"></TextInput>
                <TouchableHighlight style={styles.button} onPress={this.onLoginPressed.bind(this)}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableHighlight>
                {errorCtrl}
                <ActivityIndicator animating={this.state.showProgress} size="large"
                                   style={styles.loader}>

                </ActivityIndicator>
            </View>
        );
    }

    onLoginPressed() {
        this.setState({showProgress: true});
        var authService = require('./AuthService');
        authService.login({
            username: this.state.username,
            password: this.state.password
        }, (results)=> {
            console.log(results, 'results '); //deleteinbuild
            this.setState(Object.assign({
                showProgress: false
            }, results));

            if(results.success && this.props.onLogin){
                console.log('onlogin'); //deleteinbuild
                this.props.onLogin();
            }
        });

    }
}


const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#333',
        flex: 1,
        paddingTop: 40,
        alignItems: 'center',
        padding: 10
    },
    logo: {
        width: 66,
        height: 55
    },
    heading: {
        fontSize: 30,
        marginTop: 10
    },
    input: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC'
    },
    button: {
        height: 50,
        backgroundColor: '#48bbec',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center'
    },

    buttonText: {
        fontSize: 22,
        color: '#fff',
        alignSelf: 'center'
    },
    loader: {
        paddingTop: 20
    },
    error: {
        color: 'red',
        paddingTop: 10
    },
    baseText: {
        fontFamily: 'Cochin',
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

module.exports = Login;