import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Button,
  ActivityIndicator
} from 'react-native';
import {ListItem, SearchBar} from 'react-native-elements';
import { WebBrowser } from 'expo';
import firebase from 'firebase';
import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
constructor(props) {
  super(props);
  this.state = {
    isLoading: true
  }
}
  

componentDidMount() {
  this.readUserData();
}

readUserData() {

  var that = this;

  return firebase.database().ref('tutors').on('value', function (snapshot) {
      var tutors = Object.values(snapshot.val());
      //Brug artist ID til at hente fulde navn og erstat dataen. 
      //Da dataen i øvelserne kun er fra Taylor Swift, går vi bare ind i første object i Arrayet, 
      //da vi ved alle objekter har samme artist. Er der forskellige, kan man loope igennem arrayet og erstatte variabler
      var tutorId = tutors[0].name;
      
      that.setState({
        isLoading: false,
        dataSource: tutors,
      });

      // console.log(tutors)
      
    });
}
 
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20, justifyContent: 'center', alignItems: 'stretch' }}>
          <ActivityIndicator />
        </View>
      )
    }

      return (
        
        <View>
          
          <SearchBar //Vi skal også have ordnet søgebar eller et filter
            showLoading
            platform="ios"
            cancelButtonTitle="Cancel"
            placeholder='Search' />
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) =>
            <ListItem
              avatar={
                <Image
                  style={{ width: 65, height: 65 , borderRadius:30}}
                  source={{ uri: item.image }} />
              }
              title={item.name}
              titleStyle={{ color: 'tomato', fontWeight: 'bold' }}
              subtitleStyle={{ color: 'tomato' }}
              subtitle={item.price + " kr,- pr. time"}
              rightTitle={item.course}
              chevronColor='tomato'
              onPress={() => this.props.navigation.navigate('Tutor', item)}
              containerStyle={{ backgroundColor: 'white' }}
            />
          }
          keyExtractor={(item, index) => index.toString()}
        />
        </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
