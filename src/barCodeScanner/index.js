import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  AppRegistry,
  Dimensions,
  TouchableHighlight,
  Button
} from 'react-native';

 import CameraComponent from '../cameraComponent/'


class barCodeScanner extends Component {

  constructor(props){
    super(props)
    //defined state
    this.state = {
      showCamera:false
     }
   }

     //set CameraState
  changeCameraState = () =>{
    const newState = !this.state.showCamera
    this.setState({
      showCamera:newState
    })
  }




  render() {

    // defined style
    const styles = StyleSheet.create({
      container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'blue',
      },
      cameraBox:{
        position: 'absolute',
        bottom:30,
        right:30
      }
    })
    const cameraComponentProps = {
      changeCameraState: this.changeCameraState
    }

      if(this.state.showCamera){
        return(
          <CameraComponent style={styles.container} {...cameraComponentProps}/>
        )
      }

      else{
          return(
          <View style={styles.cameraBox}>
            <Button onPress={this.changeCameraState} title='Camera'></Button>
          </View>
        )
      }

  }
}

export default barCodeScanner;
  