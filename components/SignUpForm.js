/* eslint-disable no-undef */
import React, { Component } from 'react';
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import Card from '../components/common/Card';
import CardSection from '../components/common/CardSection';
import Button from '../components/common/Button';
import InputLogin from '../components/common/InputLogin';
import Header2 from '../components/common/Header2';


export default class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false,
            hasLogin: true,
        };
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
        alert('User created successfully');
    }
    onSignUpFailed(err) {
        this.setState({
            loading: false,
            error: err.message
        });
    }

    renderButton() {
        if (this.state.loading) {
            return (
                <View style={styles.loadingStyle}>
                    <ActivityIndicator size='small' />
                </View>);
        }
        return (
            <Button onPress={this.onButtonPress.bind(this)}>
            Sign up!
            </Button>
        );
    }

    render() {
        return (
            <View >
                <Header2 headerText={'Sign up'} />
                <Card>
                    <CardSection>
                        <InputLogin
                            label='Username'
                            placeholder='user@mail.com'
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
                </Card>
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
    loadingStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }
});
