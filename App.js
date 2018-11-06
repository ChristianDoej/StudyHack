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
      apiKey: "AIzaSyCHCtAyhTZ0uEsgicB5gza4ILlKBUlmwEo",
      authDomain: "exercise09-10.firebaseapp.com",
      databaseURL: "https://exercise9-10.firebaseio.com",
      projectId: "exercise09-10",
      storageBucket: "exercise09-10.appspot.com",
      messagingSenderId: "555573626794"
      });

    firebase.auth().onAuthStateChanged(user => {
      if(user) {
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
