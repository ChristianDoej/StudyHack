import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import LoginForm from './components/LoginForm';
import firebase from 'firebase';
import AppNavigator from './navigation/AppNavigator';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null
    }
  }
  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyA1T15Lho-SWHM5gysJm-ejOmnsU3ePx9k",
      authDomain: "studyhack-6b754.firebaseapp.com",
      databaseURL: "https://studyhack-6b754.firebaseio.com",
      projectId: "studyhack-6b754",
      storageBucket: "studyhack-6b754.appspot.com",
      messagingSenderId: "1030535619043"
      });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  render() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <View style={styles.container}>
          <AppNavigator />
          </View>
        );
      case false:
        return (
          <View style={styles.container}>
          <LoginForm />
          </View>
        );
      default:
        return <ActivityIndicator size="large" />
    }
  }
}

  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'column',
  },
});
