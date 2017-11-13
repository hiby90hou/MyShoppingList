import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View } from 'react-native';

export default class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      DataSource:null
    }
  }

  componentDidMount() {
    const {state, initState} = this.props
    return fetch('http://192.168.1.2:8000/list')
      .then((response) => response.json())
      .then((responseJson) => {
         this.setState({
          isLoading: false
        }, function() {
          // do something with new state
          
        });
        // let currentTime = 
        console.log('json')
        console.log(responseJson);
        let newState = state
        newState.todos = responseJson
        initState(newState)


      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{flex: 1, paddingTop: 20}}>
      </View>
    );
  }
}