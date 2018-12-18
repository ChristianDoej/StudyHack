import React from 'react';
import { ExpoLinksView } from '@expo/samples';
import { ScrollView, StyleSheet, ActivityIndicator, FlatList, View, Image, Text, Platform } from 'react-native';
import { Avatar, Divider, Button, Icon } from 'react-native-elements';
import firebase from 'firebase';



export default class ProfileScreen extends React.Component {

  static navigationOptions = {
    title: 'Profile',
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      currentUser: '',
      // cEmail:'',
      // cName:'',
    }
  }


  componentDidMount() {
    this.profileData();
    this.getInfo()
  }

  //Shift+option+f

  profileData() {
    currentUser = firebase.auth().currentUser;
  }

  getInfo() {
    var that = this;
    //Find en måde at aflæs antal af students og sæt det ind i stedet for "7"
    for (let i = 1; i < 7; i++) {
      var students = "students/student" + i
      console.log(students);
      firebase.database().ref(students).on('value', function (snapshot) {
        var cStudent = snapshot.val();
        if (cStudent.email == currentUser.email) {
          console.log(cStudent.email + " rigtigt")
          that.setState({
            isLoading: false,
            dataSource: cStudent,
          });
          cEmail = cStudent.email
          cName = cStudent.name
          return null;
        } console.log(cStudent.email + " forkert");

      });
    }
  }
  render() {

    // const name = dataSource.getParam('name', 'No name');
    // const email = dataSource.getParam('email', 'No course defined');

    console.log(this.state.dataSource)
    return (
      // <View>
      //   <Text>{name}</Text>
      //   <Text>{email}</Text>
      // </View>
      <View>
        <Text>Navn: Chris Rodney</Text>
        <Text>Email: chris.rodney@gmail.com</Text>
      </View>
    );
  }
}


