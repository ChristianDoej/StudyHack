import React, { Component } from 'react';
import { Text, StyleSheet, ActivityIndicator, TextInput, View, ImageBackground, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'firebase';
import SignUpForm from './SignUpForm';
import { Font } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';

const godfather = require('../assets/images/godfather.jpg');
const screen1 = require('../assets/images/screen1.jpg');
const screen4 = require('../assets/images/screen4.jpg');
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: '',
            loading: false,
            hasLogin: true
        };
    }

    signIn() {
        const { email, password } = this.state;
    
        this.setState({ error: '', loading: true });
    
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      }
    
      onLoginSuccess() {
        this.setState({ email: '', password: '', loading: false, error: '' });
      }
    
      onLoginFail(err) {
        this.setState({ loading: false, error: err.message });
      }


    render() {
        switch (this.state.hasLogin) {
            case true:
                return (
                    <View style={styles.container}>
                        <ImageBackground source={screen4} style={styles.backgroundImage}>
                            <View style={styles.loginView}>
                                <View style={styles.loginTitle}>
                                    <Text style={styles.header}>StudyHack</Text>
                                </View>

                                <TextInput style={styles.loginText}
                                    label='Username'
                                    containerStyle={{ marginVertical: 10 }}
                                    keyboardAppearance="light"
                                    autoFocus={false}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    keyboardType="email-address"
                                    returnKeyType="next"
                                    placeholderTextColor="white"
                                    placeholder='Username'
                                    value={this.state.email}
                                    onChangeText={email => this.setState({ email })}
                                />
                            </View>
                            <View style={styles.passwordInput}>
                                <TextInput style={styles.loginText}
                                    placeholder='Password'
                                    placeholderTextColor="white"
                                    value={this.state.password}
                                    secureTextEntry={true}
                                    onChangeText={password => this.setState({ password })}
                                />

                                <Text style={styles.errorTextStyle}>
                                    {this.state.error}
                                </Text>
                            </View>
                            <View>
                            {this.renderButton()}
                            </View>
                            <View style={styles.footerView}>
                                <Button
                                    title='Sign up'
                                    activeOpacity={1}
                                    underlayColor="transparent"
                                    buttonStyle={{ height: 50, width: 200, backgroundColor: 'transparent', borderWidth: 2, borderColor: 'white', borderRadius: 30 }}
                                    containerStyle={{ marginVertical: 10, marginTop: 50 }}
                                    titleStyle={{ fontWeight: 'bold', color: 'white' }}
                                    onPress={() => this.setState({ hasLogin: false })} />
                            </View>
                        </ImageBackground>
                    </View>
                );
            case false: {
                return (
                    <View>
                        <SignUpForm />
                        <Button title='go back' onPress={() => this.setState({ hasLogin: true })} />
                    </View>
                )
            }
        }
    }
    renderButton() {
        if (this.state.loading) {
            return <ActivityIndicator size='small' />
        }
        return (
            <View style={styles.loginButton}>
                <Button
                    title="Log in"
                    activeOpacity={1}
                    underlayColor="transparent"
                    buttonStyle={{ height: 50, width: 200, backgroundColor: 'transparent', borderWidth: 2, borderColor: 'white', borderRadius: 30 }}
                    containerStyle={{ marginVertical: 10, marginTop: 50 }}
                    titleStyle={{ fontWeight: 'bold', color: 'white' }}
                    onPress={this.signIn.bind(this)}
                    // onPress={() => this.signIn()}
                    >
                </Button>
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
    loginView: {
        marginTop: -50,
        width: 250,
        height: 400,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginTitle: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 150,
    },
    usernameInput: {

    },
    passwordInput: {
        marginTop: 15,
    },
    loginText: {
        fontSize: 20,
        color: 'gold',
    },
    loginButton: {
        marginTop: 30,
    },
    header: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    },
    footerView: {
        marginTop: -50,
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    }
});