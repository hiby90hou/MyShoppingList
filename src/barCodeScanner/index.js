import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  AppRegistry,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity
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
        bottom:60,
        right:40
      },
      buttonCamera:{
        width:70,
        height: 70,
        backgroundColor: '#e4d4f9',
        borderRadius: 70,
        alignItems: 'center',
        justifyContent:'center'
      },
      buttonTitle:{
        color:'white',
        fontSize: 70,
        marginBottom: 5,
      }
    })
    const cameraComponentProps = {
      changeCameraState: this.changeCameraState,
      barCodeSetter:this.props.barCodeSetter
    }

      if(this.state.showCamera){
        return(
          <CameraComponent style={styles.container} {...cameraComponentProps}/>
        )
      }

      else{
          return(
          <View style={styles.cameraBox}>
            <TouchableOpacity onPress={this.changeCameraState} style={styles.buttonCamera}>
              <Text style={styles.buttonTitle}>+</Text>
            </TouchableOpacity>
          </View>
        )
      }

  }
}

export default barCodeScanner;
  