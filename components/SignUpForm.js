import React, { Component } from 'react';
import { Text, TextInput, StyleSheet, View, ActivityIndicator, ImageBackground, Dimensions } from 'react-native';
import firebase from 'firebase';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const godfather = require('../assets/images/godfather.jpg');
const screen1 = require('../assets/images/screen1.jpg');
const screen4 = require('../assets/images/screen4.jpg');
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false
        }
    }

    onButtonPress() {
        const { email, password } = this.state;
        this.setState({
            error: '',
            loading: true
        });
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(this.onSignUpSuccess.bind(this))
            .catch(this.onSignUpFailed.bind(this));
    }
    onSignUpSuccess() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        });
        alert("User created successfully");
    }
    onSignUpFailed(err) {
        this.setState({
            loading: false,
            error: err.message
        });
    }
    render() {
        return (
            <View >
            <ImageBackground source={screen1} style={styles.backgroundImage}>
                <View style={styles.signUpView}>
                <View style={styles.signUpTitle}>
                <Text>Sign up</Text>
                </View>
                <View style={styles.signUpInput}>
                <TextInput
                    label='Username'
                    placeholder='user@mail.com'
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                />
                <TextInput
                    placeholder='password'
                    value={this.state.password}
                    secureTextEntry={true}
                    onChangeText={password => this.setState({ password })}
                />
                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>
                </View>

                {this.renderButton()}
                </View>
                </ImageBackground>
            </View>
        );
    }

    renderButton() {
        if (this.state.loading) {
            return <ActivityIndicator size='small' />
        }
        return (
            <Button title="Sign up" onPress={this.onButtonPress.bind(this)}>
            </Button>
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
    backgroundImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    signUpView: {
        marginTop: -50,
        width: 250,
        height: 400,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signUpTitle: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 150,
    },
});