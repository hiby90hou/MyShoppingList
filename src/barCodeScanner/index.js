import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';

class barCodeScanner extends Component {

  // constructor(props){
  //   super(props)
  //   //defined state
  //   this.state = {
  //     todos:[
  //     ]
  //   }
  // }



  render() {

    console.log('render')
    // defined style
    const styles = StyleSheet.create({
      header: {
        flex: 1,
        alignItems: 'center',
        paddingTop:10,
        paddingBottom:10
      }
    })


      return(
        <View>
          <Text>Scanner</Text>
        </View>
        )
  }
}

export default barCodeScanner;
  