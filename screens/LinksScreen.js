import React from 'react';
import { ScrollView, StyleSheet} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { ActivityIndicator, FlatList, View, Image, Button } from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'firebase';


export default class LinksScreen extends React.Component {
  
    static navigationOptions = {
      title: 'Links',
    };
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true
      }
    }
  
    componentDidMount() {
      this.getAlbumsFromApiAsync();
    }
  
    getAlbumsFromApiAsync() {
      return fetch('http://rallycoding.herokuapp.com/api/music_albums')
        .then((response) => response.json())
        .then((responseJson) => {
  
          this.setState({
            isLoading: false,
            dataSource: responseJson,
          });
  
        })
        .catch((error) => {
          console.error(error);
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
            <Button title="Log ud" onPress={() => firebase.auth().signOut()}></Button>
          
          <FlatList
            data={this.state.dataSource}
            renderItem={({ item }) =>
              <ListItem
                avatar={
                  <Image 
                  style={{width: 65, height: 65}} 
                  source={{ uri: item.image }} />
                }
                title={item.title}
                titleStyle={{ color: 'tomato', fontWeight: 'bold' }}
                subtitleStyle={{ color: 'tomato' }}
                subtitle={item.artist}
                chevronColor='tomato'
                onPress={() => this.props.navigation.navigate('Details', item)}
                containerStyle={{backgroundColor: 'white'}}
              />
            }
            keyExtractor={(item, index) => index.toString()}
          />
          </View>
      );
    }
  }