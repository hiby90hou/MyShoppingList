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

 import Camera from 'react-native-camera';

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

  takePicture = () => {

          const options = {};
          //options.location = ...
          this.camera.capture({metadata: options})
            .then((data) => console.log(data))
            .then(this.changeCameraState)
            .catch(err => console.error(err));
           // changeCameraState(false)
        }

  render() {

    // defined style
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        

      },
      preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        
      },
      capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40,
        
      },
      cameraBox:{
        position: 'absolute',
        bottom:30,
        right:30
      }
    })


      if(this.state.showCamera){
        return(
          <View style={styles.container}>
            <Camera
              ref={(cam) => {
                this.camera = cam;
              }}
              style={styles.preview}
              aspect={Camera.constants.Aspect.fill}>
              <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
            </Camera>
          </View>
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
  