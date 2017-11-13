
import React, {Component} from 'react';
import { View, Text, Button, TextInput, Alert, StyleSheet, Switch, TouchableOpacity, Image,BackHandler,
  ToastAndroid, } from 'react-native';

class signUp extends Component {
    constructor(props){
    super(props)
    this.state = {
      inputUserName: '',
      inputPassword1: '',
      inputPassword2: ''
    }
    this.backButtonListener = null
  }
  //when we go to this page, run componentDidMount 
  componentDidMount(){
  	console.log('componentWillmount');
  	//go back button setting
	this.backButtonListener = BackHandler.addEventListener('hardwareBackPress',()=>{
		const {handleSignUp, signUp} = this.props
  	// console.log(this.props);
	   if(signUp==true){
	   	console.log('goback');
	  	  ToastAndroid.show('Go back to Sign in Page',ToastAndroid.SHORT);
			handleSignUp()
	    	return true
	   }
	  return false
	})
	
  }

  componentWillUnmount(){

  	// BackHandler.removeEventListener('hardwareBackPress',()=>{});
  	this.backButtonListener.remove();
  	console.log('componentWillUnmount');
  }


  handleUserName = (inputUserName) =>{ 
    return this.setState({inputUserName})
  }
  handlePassword1 = (inputPassword1) =>{ 
    return this.setState({inputPassword1})
  }
  handlePassword2 = (inputPassword2) =>{ 
    return this.setState({inputPassword2})
  }  
 
   loginCheck = ()=>{
    const {handleSignUp, updateUserName} = this.props

	handleSignUp()
	updateUserName(this.state.inputUserName)
    // let correctUserName = 'hiby';
    // let correctPassword = 'hiby';
    // // const {updateUserName} = this.props
    // if(correctUserName == this.state.inputUserName &&
    //   correctPassword == this.state.inputPassword){
    //     updateUserName(correctUserName)
    // }else{
    //   Alert.alert(
    //     'Wrong Password',
    //     'Please try again',
    //     [       
    //       {text: 'OK', onPress: () =>{console.log('inputUserName:'+this.state.inputUserName);console.log('inputPassword:'+this.state.inputPassword);}},
    //     ],
    //     { cancelable: false }
    //   )
    // }
  }
	render() {
		// defined style
	    const styles = StyleSheet.create({
	      mainContainer: {
	        width:300,
	        height:300,
	        backgroundColor: '#fff',
	        borderRadius:20,
	      },
	      titleText:{
	        fontWeight: 'bold',
	        fontSize: 15,
	        textAlign:"center",
	        padding: 10
	      },
	      smallContainer:{
	        flex: 1,
	        paddingLeft:10,
	        paddingRight:10,
	        height:"auto",
	        // backgroundColor:'#ccc'
	      },
	      line:{
	        marginTop:15,
	        marginBottom:10,
	        borderBottomWidth:1,
	        borderColor:'#ccc'

	      },
	      gap:{
	        marginBottom:10,
	      },
	      loginCheck:{
	        borderRadius:10
	      },
	      resetText:{
	        marginTop:10,
	        textAlign:"center",
	        color:"white",
	        fontWeight:"800",
	        fontSize:15
	      },
	      rememberBox:{
	        flexDirection: 'row',
	        justifyContent: 'flex-end',
	        alignItems: 'center',
	      },
	      button:{
	        width:20,
	        height:20,
	        alignSelf: 'flex-end',
	        marginRight:10,
	        marginTop:10
	      },
	      nav:{
	        flexDirection: 'row',
	        justifyContent: 'center',
	      },
	      signUp:{
	        marginTop:20,
	        alignItems: 'center',
	      },
	      SignUpText:{
	        textAlign:"center"
	      }

	    })

		return (
			<View>
				<View style = {styles.mainContainer}>
					<View style = {styles.nav}>
						<Text style = {styles.titleText}>Sign Up</Text>
					</View>
					<View style = {styles.line}></View>
						<View style = {styles.smallContainer}>
              				<TextInput underlineColorAndroid = "#b131d8" type="text" placeholder="Please set your user name" onChangeText={this.handleUserName.bind(this)} ref={input => { this.userInput = input }}/>
              				<TextInput underlineColorAndroid = "#b131d8" type="text" placeholder="Please set your password" secureTextEntry={true} onChangeText={this.handlePassword1.bind(this)} ref={input => { this.pwInput1 = input }}/>
              				<TextInput underlineColorAndroid = "#b131d8" type="text" placeholder="please confirm your password" secureTextEntry={true} onChangeText={this.handlePassword2.bind(this)} ref={input => { this.pwInput2 = input }}/>

             			<View style = {styles.gap}></View>
              			<Button color='#b131d8' onPress = {this.loginCheck} title="Sign Up"/>

            			</View>
					</View>
				<Text style={styles.resetText}> </Text>
			</View>
		)
	};
}

export default signUp;

		