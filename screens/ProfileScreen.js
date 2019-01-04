import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import Card from '../components/common/Card';
import CardSection from '../components/common/CardSection';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

export default class ProfileScreen extends React.Component {

  static navigationOptions = {
    title: 'Profile',
  };

  constructor(props) {
    super(props);
    this.state = {
      trueStudent: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    const currentMail = firebase.auth().currentUser.email;
    let students = '';
    this.setState({ isLoading: true });

    firebase.database().ref('students').on('value', (snapshot) => {
      students = Object.values(snapshot.val());
      for (let i = 0; i < students.length; i++) {
        if (students[i].email === currentMail) {
          console.log(`${students[i].email} rigtig`);
          this.setState({ trueStudent: students[i], isLoading: false });
          return students[i];
        } else if (i === students.length - 1) {
          this.setState({ trueStudent: null, isLoading: false });
      } console.log(students[i]);
    }
  });
}

  render() {
    if (this.state.trueStudent) {
      const name = this.state.trueStudent.name;
      const email = this.state.trueStudent.email;

      if (this.state.isLoading) {
        return (
          <View style={styles.loadingStyle}>
            <ActivityIndicator size='large' />
          </View>
        );
      } return (
        <Card>
          <CardSection>
            <Input
              label='Name:'
              value={name}
            />
          </CardSection>
          <CardSection>
            <Input
              label='Email:'
              value={email}
            />
          </CardSection>
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>Log out</Button>
          </CardSection>
        </Card>
      );
    } return (
      <Card>
        <CardSection>
            <Input
              label='Email:'
              value={firebase.auth().currentUser.email}
            />
          </CardSection>
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>Log out</Button>
          </CardSection>
        </Card>
    );
  }
}

const styles = {
  loadingStyle: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
  }
};

