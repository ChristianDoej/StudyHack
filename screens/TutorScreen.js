import React from 'react';
import { ExpoLinksView } from '@expo/samples';
import {  ScrollView, StyleSheet, ActivityIndicator, FlatList, View, Image, Text, Platform, Modal, TouchableHighlight, Alert} from 'react-native';
import {Avatar, Divider, Button, Icon} from 'react-native-elements';
import firebase from 'firebase';



export default class TutorScreen extends React.Component {
  
    

    static navigationOptions = {
      title: 'Tutor', // Det her bliver titlen i toppen - Skal ændres
    };
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        modalVisible: false
      }
    }

    openModal() {
        this.setState({
            modalVisible: true
        });
      }

    renderModal() {
        return(
            <Modal
              visible={this.state.modalVisible}
              animationType={'slide'}
              onRequestClose={() => this.closeModal()}
            >
            <Button title='Knap i modal'/>
            </Modal>

        )
    }
  
    render() {
        const { navigation } = this.props;
        const name = navigation.getParam('name', 'No name');
        const course = navigation.getParam('course', 'No course defined');
        const profilePicture = navigation.getParam('image', 'No profile pic');
        const price = navigation.getParam('price', 'No profile pic');
        const bio = navigation.getParam('bio', 'No profile pic');
        const email = navigation.getParam('email', "No email");

     /* if (this.state.isLoading) {
        return (
          <View style={{ flex: 1, padding: 20, justifyContent: 'center', alignItems: 'stretch' }}>
            <ActivityIndicator />
          </View>
        )
      }*/
  
      return (
        <View style={styles.container}
        renderItem={this.renderModal}
        
        >
          
              <View style={{flex: 1, backgroundColor: 'tomato', justifyContent: "center", alignItems: 'center'}}>
                <Avatar
                xlarge
                rounded
                source={{uri: profilePicture}}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
                />
              </View>
              <Divider style={{ backgroundColor: 'darkgrey' }} />
            <View style={{flex: 1, backgroundColor: 'ivory'}}>
                <View style={{flex: 1, flexDirection: "row", justifyContent: 'space-evenly'}}>
                    <Text
                        style={{fontSize: 30}}
                        color='black'
                        textAlign='left'
                        fontWeight='bold'
                    

                    >{name}</Text>
                    <Text
                       style={{fontSize: 20}} 
                       color='darkgrey'
                       textAlign='left'
                        fontWeight='bold'
                    
                    >{price} kr,- pr time</Text>
                </View>
                <View style={{flex: 1, flexDirection: "row", justifyContent: 'flex-start'}}>
                    <Icon
                        type='entypo'
                        name='graduation-cap'
                    />
                    <Text>{course}</Text>
                </View>
            <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>   
            <Text>{email}</Text>
                <Button
                style={{width:200}}
                title="skriv til mig"
                rounded
                backgroundColor="ivory"
                color="black"
                fontSize={20}
                raised={true}
                onPress={() => this.openModal()}
              
               
               
                ></Button>
            </View>
            </View>
            <Divider style={{ backgroundColor: 'darkgrey' }} />
            <ScrollView  style={{flex: 1, backgroundColor: 'ivory'}}>
                <Text
                style={{color: 'black', fontSize: 40}}
               
                ></Text>
                <Text>{bio}</Text>
            
         </ScrollView>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'powderblue',
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
  