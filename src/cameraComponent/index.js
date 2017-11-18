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

class cameraComponent extends Component {


  takePicture = () => {
    const {changeCameraState} = this.props
      const options = {};
      //options.location = ...
      this.camera.capture({metadata: options})
        .then((data) => console.log(data))
        .then(changeCameraState)
        .catch(err => console.error(err));
    }

  render() {

    // defined style
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center'
      },
      preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
        
      },
      capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40  
      },
      cameraBox:{
        position: 'absolute',
        bottom:30,
        right:30
      }
    })


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
}

export default cameraComponent;
  