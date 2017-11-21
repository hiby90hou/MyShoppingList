import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  AppRegistry,
  Dimensions,
  TouchableHighlight,
  Button,
  Animated,
  Easing,
  BackHandler,
  ToastAndroid,
} from 'react-native';

 import Camera from 'react-native-camera';

class cameraComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            moveAnim: new Animated.Value(0)
        }
    }

  takePicture = () => {
    const {changeCameraState,barCodeSetter} = this.props
      const options = {};
      //options.location = ...
      this.camera.capture({metadata: options})
        .then((data) => console.log(data))
        .then(barCodeSetter("data arrived"))
        .then(changeCameraState)
        .catch(err => console.error(err));
    }

    onBarCodeRead = (result) => {
        const {changeCameraState,barCodeSetter} = this.props
        // const {qrCodeRead} = this.props.route;
        const {data} = result;
        // qrCodeRead && qrCodeRead(data);
        alert('BarCodeRead:'+result.data)
        barCodeSetter(result.data)
        changeCameraState()
    }

     componentDidMount() {
        this.startAnimation()
        console.log('startAnimation')
    }

    startAnimation = () => {
        this.state.moveAnim.setValue(0);
        Animated.timing(
            this.state.moveAnim,//init
            {
                toValue: -200,
                duration: 1500,
                easing: Easing.linear
            }//end
        ).start(() => this.startAnimation())//start
    }

    //set the go back button
    componentWillMount(){
          //go back button setting
      this.backButtonListener = BackHandler.addEventListener('hardwareBackPress',()=>{
        const {changeCameraState} = this.props
        // console.log(this.props);
         if(this.state.userName!='null'){
          console.log('userName goback');
            ToastAndroid.show('Camera close',ToastAndroid.SHORT);
            changeCameraState()
            return true
         }
        return false
      })
    }

    // when go out from this page, run componentWillUnmount
    componentWillUnmount(){

      // BackHandler.removeEventListener('hardwareBackPress',()=>{});
      this.backButtonListener.remove();
      console.log('componentWillUnmount');
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
      },
      preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
      },
      rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
        },
      rectangle: {
          height: 200,
          width: 200,
          borderWidth: 1,
          borderColor: '#00FF00',
          backgroundColor: 'transparent'
      },
      rectangleText: {
          flex: 0,
          color: '#fff',
          marginTop: 10
      },
    border: {
        flex: 0,
        width: 200,
        height: 2,
        backgroundColor: '#00FF00'
    }
    })


        return(
          <View style={styles.container}>
            <Camera 
              onBarCodeRead={this.onBarCodeRead}
              defaultOnFocusComponent={true}
              torchMode={Camera.constants.TorchMode.on}

              ref={(cam) => {
                this.camera = cam;
              }}
              style={styles.preview}
              aspect={Camera.constants.Aspect.fill}>
              <View style={styles.rectangleContainer}>
                  <View style={styles.rectangle}/>
                  <Animated.View style={[
                      styles.border,
                      {transform: [{translateY: this.state.moveAnim}]}]}/>
                  <Text style={styles.rectangleText}>Please put your bar code into this rectangle</Text>
                  <Text style={styles.rectangleText}>We will try to find out item name for you</Text>
                  {/*<Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>*/}
              </View>
              
            </Camera>
          </View>
        )

  }
}

export default cameraComponent;
  