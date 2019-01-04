import React, { Component } from 'react';
// eslint-disable-next-line max-len
import { Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import firebase from 'firebase';
import SignUpForm from './SignUpForm';
import Card from '../components/common/Card';
import CardSection from '../components/common/CardSection';
import Button from '../components/common/Button';
import InputLogin from '../components/common/InputLogin';
import Header from '../components/common/Header';


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

    onLoginSuccess() {
        this.setState({ email: '', password: '', loading: false, error: '' });
    }

    onLoginFail(err) {
        this.setState({ loading: false, error: err.message });
    }

    signIn = () => {
        const { email, password } = this.state;
        this.setState({ error: '', loading: true });

        firebase.auth().signInWithEmailAndPassword(email.trim(), password)
            .then(this.onLoginSuccess.bind(this))
            .catch(this.onLoginFail.bind(this));
    }

    renderButton() {
        if (this.state.loading) {
            return (
            <View style={styles.loadingStyle}>
                <ActivityIndicator size='small' />
            </View>);
        }
        return (
            <Button onPress={this.signIn.bind(this)}>
                Log in
                </Button>
        );
    }

    render() {
        switch (this.state.hasLogin) {
            case true:
                return (
                    <View>
                        <Header headerText={'studyhub'} />
                        <Card>
                            <CardSection>
                                <InputLogin
                                    label='Username'
                                    autoCorrect={false}
                                    placeholder='user@gmail.com'
                                    value={this.state.email}
                                    onChangeText={email => this.setState({ email })}
                                />
                            </CardSection>
                            <CardSection>
                                <InputLogin
                                    label='Password'
                                    placeholder='password'
                                    value={this.state.password}
                                    secureTextEntry
                                    onChangeText={password => this.setState({ password })}
                                />
                            </CardSection>
                            <CardSection>
                                <Text style={styles.errorTextStyle}>
                                    {this.state.error}
                                </Text>
                            </CardSection>
                            <CardSection>
                                {this.renderButton()}
                            </CardSection>
                            <CardSection>
                                <Button onPress={() => this.setState({ hasLogin: false })}>
                                    Sign up
                            </Button>
                            </CardSection>
                        </Card>
                    </View>
                );
            case false: {
                return (
                    <View>
                        <SignUpForm />
                        <Card>
                            <CardSection>
                            <Button onPress={() => this.setState({ hasLogin: true })}>
                            Go back!
                        </Button>
                            </CardSection>
                        </Card>
                    </View>
                );
            } default:
        }
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
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
    },
    loadingStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }
});
