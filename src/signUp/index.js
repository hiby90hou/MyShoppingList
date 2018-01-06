
import React, {Component} from 'react';
import { View, Text, Button, TextInput, StyleSheet, Switch, TouchableOpacity, Image,BackHandler,
  ToastAndroid, } from 'react-native';
import RNFS from 'react-native-fs';

// user log data struct
// userLog=[{username:username1,
//           password:'password1'},
//           {username:username2,
//           password:'password2'}]

class signUp extends Component {
    constructor(props){
    super(props)
    this.state = {
      inputUserName: '',
      inputPassword1: '',
      inputPassword2: '',
      userLog:[{username:'default', password:'default', autoLogin:false}]
    }
    this.backButtonListener = null
  }

  //when we go to this page, run componentDidMount 
  componentDidMount(){

  	console.log('componentWillmount');

  	//read user log file
  	console.log("readfile")

  	var RNFS = require('react-native-fs');
  	//create a path you want to read
    const path = RNFS.ExternalDirectoryPath + '/MyShoppingList/userLog.json';
    RNFS.readFile(path)
    .then((statResult) => {
      console.log(RNFS.exists(path));
      if (RNFS.exists(path)) {
        // if we have a file, read it
        return RNFS.readFile(path, 'utf8');
      }

      return 'no file';
    })
    .then((contents) => {
      // log the file contents
      let userLog = JSON.parse(contents)
      this.setState({
      	userLog
      })
      console.log(this.state.userLog)
      
    })
    .catch((err) => {
      console.log(err.message, err.code);
    });
    
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

  // when go out from this page, run componentWillUnmount
  componentWillUnmount(){

  	// BackHandler.removeEventListener('hardwareBackPress',()=>{});
  	this.backButtonListener.remove();
  	console.log('componentWillUnmount');
  }

	//tracking input
	handleUserName = (inputUserName) =>{ 
		inputUserName = inputUserName.replace(/(^\s*)|(\s*)$/g,"").toLowerCase()
		return this.setState({inputUserName})
	}
	handlePassword1 = (inputPassword1) =>{ 
	return this.setState({inputPassword1})
	}
	handlePassword2 = (inputPassword2) =>{ 
	return this.setState({inputPassword2})
	}  

	
 
 	loginCheck = async () =>{
 		const {handleSignUp,updateUserName,initState} = this.props

 		checkArr = async (username) => {
			console.log("checkArr")
		  try {
      let response = await fetch(
        'http://13.210.215.68:3000/api/v1/users/'+ username
      );
      let responseJson = await response.json();
      console.log(responseJson);
      if(responseJson.message == "username and password are not match"){
      	// find out the username in database
      	// cannot use this user name as a new user
      	return true
      }
      else{
	        //username is not in the database
			//check local user list
			// let Arr = this.state.userLog
			// for(let i=0;i<Arr.length;i++){
			// 	console.log(Arr[i].username)
			// 	if(Arr[i].username==username){
			// 		console.log('pass checkArr')
			// 		return true
			// 	}
			// }
			console.log("cannot find username")
			return false
        }
      }
      catch (error) {
      console.error('error')
	  	// if network cannot connect, the username cannot pass the check
	  }
	  return true
	}


		if(this.state.inputUserName==''){
		 	ToastAndroid.showWithGravity('Please input valid username',ToastAndroid.SHORT, ToastAndroid.CENTER)
			console.log('Please input valid username')
		}
 		else if(this.state.inputPassword1!=this.state.inputPassword2){
	 		ToastAndroid.showWithGravity('Password does not match',ToastAndroid.SHORT, ToastAndroid.CENTER)
 		console.log('Password does not match')
 		}
 		else if (this.state.inputPassword1.length<6){
 			ToastAndroid.showWithGravity('Please input password,\n The min password length is 6',ToastAndroid.SHORT, ToastAndroid.CENTER)
 		console.log('Please input password')
 		}
 		else if(await checkArr(this.state.inputUserName)){
			ToastAndroid.showWithGravity('Username already exists',ToastAndroid.SHORT, ToastAndroid.CENTER)
 			console.log('Username already exists')
 		}
 		else{
 			console.log('else')

 			console.log(this.state.userLog)

 			// this.state.userLog
			const newUser = {
		      username:this.state.inputUserName, 
		      password:this.state.inputPassword1, 
		      autoLogin:false
		    }

		  let newLog = this.state.userLog
 			newLog.push(newUser)
 			console.log(newLog)

 			// write file

			// require the module
			var RNFS = require('react-native-fs');

			var saveStr = JSON.stringify(newLog)
			console.log(saveStr);

			// create a path you want to write to
			const path = RNFS.ExternalDirectoryPath + '/MyShoppingList/userLog.json';

			//make dir for this file
			RNFS.mkdir(RNFS.ExternalDirectoryPath +'/MyShoppingList/')

			// write the file
			RNFS.writeFile(path, saveStr, 'utf8')
			  .then(async (success) => {
			    console.log('USERLOG FILE WRITTEN! Path:');
			    console.log(path);
			    // console.log(path);

			    //create new user in server
    		  try {
			      let response = await fetch(
			        'http://13.210.215.68:3000/api/v1/users',
			        {
			        method: 'POST',
			        headers: {
			          Accept: 'application/json',
			          'Content-Type': 'application/json',
			        },
			        body: JSON.stringify({
			          todos: '[]',
			          is_all_done: "true",
                user_name: this.state.inputUserName,
					  		password: this.state.inputPassword1,
					  		password_confirmation: this.state.inputPassword2
			        })
			      });
			      let responseJson = await response.json();
      			console.log(responseJson);
			    } catch (error) {
			      console.error(error)
			    }
				})
			  .catch((err) => {
			    console.log(err.message);
			  });

			//success signup
			const newState = {
				todos:[
					{isDone:false,title:'meat',expire:null}
				],
				isAllDone: false,
				password: null,
				uploadTime: null
			}

			initState(newState)
			handleSignUp()
			updateUserName(this.state.inputUserName, this.state.inputPassword1)
 		}
   
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

		