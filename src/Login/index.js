import React, {Component} from 'react'
import { View, Text, Button, TextInput, Alert, StyleSheet, Switch, TouchableOpacity, Image,
  ToastAndroid, } from 'react-native';
import SignUp from '../signUp/'
import CheckAutoLogin from '../checkAutoLogin/'

import RNFS from 'react-native-fs';

class Login extends Component {
    constructor(props){
    super(props);
    this.state = {
      inputUserName: '',
      inputPassword: '',
      checkPassword:false,
      autoLogin: false,
      signUp: false
    }
  }


  loginCheck = async()=>{
    const {updateUserName} = this.props
    //read UserLog file
    console.log("readfile")

    var RNFS = require('react-native-fs');

    //open userlog file and save the data to userLog
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
    .then(async (contents) => {
      // log the file contents
      let userLog = JSON.parse(contents)

      console.log("userLog")
      console.log(userLog)
    
      //check user

      let errorAlert = true

      for(let i=0;i<userLog.length;i++){
        if(userLog[i].username==this.state.inputUserName && 
          userLog[i].password==this.state.inputPassword){

          //if autoLogin switch is open,change the user Log and save it
          if(this.state.autoLogin==true){
            console.log("autoLogin is open")

            //set all of the autoLogin to false
            for(let j=0;j<userLog.length;j++){
              userLog[j].autoLogin = false
            } 
            //set current autoLogin to true
            userLog[i].autoLogin = true

            //write file
            // require the module
            var RNFS = require('react-native-fs');

            var saveStr = JSON.stringify(userLog)
            // console.log(userLog);

            // create a path you want to write to
            const path = RNFS.ExternalDirectoryPath + '/MyShoppingList/userLog.json';

            //make dir for this file
            RNFS.mkdir(RNFS.ExternalDirectoryPath +'/MyShoppingList/')

            // write the file
            RNFS.writeFile(path, saveStr, 'utf8')
            .then((success) => {
              console.log('USERLOG FILE WRITTEN! Path:');
              console.log(path);
              // console.log(path);
            })
            .catch((err) => {
              console.log(err.message);
            });

          }

          updateUserName(this.state.inputUserName,this.state.inputPassword)
          errorAlert = false
        }
      }

      //check server, if server has this user, login
      //password checking had been improved by server side
      try {
        let response = await fetch(
          'http://13.210.215.68:3000/api/v1/users/'+ this.state.inputUserName +'?password='+this.state.inputPassword);
        let responseJson = await response.json();
        console.log(responseJson);
        if(responseJson.status==="SUCCESS"){
          console.log("data receive success")
          if(responseJson.data.password == this.state.inputPassword){
            updateUserName(this.state.inputUserName,this.state.inputPassword)
            errorAlert = false
          }
        }

        if(errorAlert){
          Alert.alert(
            'Wrong Password',
            'Please try again',
            [       
              {text: 'OK', onPress: () =>{console.log('inputUserName:'+this.state.inputUserName);console.log('inputPassword:'+this.state.inputPassword);}},
            ],
            { cancelable: false }
          )
        }
      } catch (error) {
          console.error(error)
        if(errorAlert){
          Alert.alert(
            'Wrong Password',
            'Please try again',
            [       
              {text: 'OK', onPress: () =>{console.log('inputUserName:'+this.state.inputUserName);console.log('inputPassword:'+this.state.inputPassword);}},
            ],
            { cancelable: false }
          )
        }
      }


    })
    .catch((err) => {
      console.log(err.message, err.code);
    })
  }


  //pass password check
  passCheck =(result)=>{
    this.setState({
      checkPassword:result
    })
    // console.log('checkPassword'+this.state.checkPassword);
  }

  // change signUp state, if signup==true, open the signup page
  handleSignUp =()=>{
    this.setState({
      signUp: !this.state.signUp
    })
    console.log('SignUp'+this.state.signUp);
  }

  closeSignUp = () =>{
    this.setState({
      signUp: false
    })
    console.log('closeSignUp'+this.state.signUp);
  }

  //skip sign in and go to default user page
  closeWindow = ()=>{
    Alert.alert(
      'Skip Sign In',
      'Are you sure to skip sign in?',
      [       
        {text: 'Yes', onPress: () =>{this.defaultLogin()}},
        {text: 'No', onPress: () =>{}}
      ],
      { cancelable: true }
    )
  }

  defaultLogin = ()=>{
    const {updateUserName} = this.props
    console.log('defaultLogin');
    let correctUserName = 'default'
    updateUserName(correctUserName,null)
  }

  handleUserName = (inputUserName) =>{ 
    return this.setState({inputUserName})
  }
  handlePassword = (inputPassword) =>{ 
    return this.setState({inputPassword})
  }

  render() {
    // 定义style
    const styles = StyleSheet.create({
      mainContainer: {
        // flex:1,
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
        justifyContent: 'space-between',
      },
      signUp:{
        marginTop:20,
        alignItems: 'center',
      },
      SignUpText:{
        textAlign:"center"
      }

    })

    const checkPasswordProps = {
        updateUserName:this.props.updateUserName,
        inputUserName:this.state.inputUserName,
        inputPassword:this.state.inputPassword,
        passCheck:this.passCheck
    }

    const signUpProps = {
        handleSignUp: this.handleSignUp,
        updateUserName: this.props.updateUserName,
        signUp: this.state.signUp,
        initState: this.props.initState
    }

    const checkAutoLoginProps = {
      updateUserName: this.props.updateUserName
    }

    if(this.state.signUp){
      return(
        <SignUp {...signUpProps}/>
        )
    }else{
      return (
        <View>
          <CheckAutoLogin {...checkAutoLoginProps}/>
          <View style = {styles.mainContainer}>
            <View style = {styles.nav}>
              <View style= {styles.button}/>
              <Text style = {styles.titleText}>Sign In</Text>
              <TouchableOpacity onPress={this.closeWindow}>
                <Image
                  style={styles.button}
                  source={require('../../resources/close.png')}
                />
              </TouchableOpacity>
            </View>
            <View style = {styles.line}></View>
            <View style = {styles.smallContainer}>
              <TextInput underlineColorAndroid = "#b131d8" type="text" placeholder="Please input your user name" onChangeText={this.handleUserName.bind(this)} ref={input => { this.userInput = input }}/>
              <TextInput underlineColorAndroid = "#b131d8" type="text" placeholder="Please input your password" secureTextEntry={true} onChangeText={this.handlePassword.bind(this)} ref={input => { this.pwInput = input }}/>
              <View style = {styles.rememberBox}>
                <Text style={{color:"#ccc"}}>Auto Login</Text>
                <Switch
                onValueChange={(value) => this.setState({autoLogin: value})}
                style={{marginBottom:10,marginTop:10}}
                value={this.state.autoLogin} />  
              </View>
              <View style = {styles.gap}></View>
              <Button color='#b131d8' onPress = {this.loginCheck} title="Sign In"/>
              <TouchableOpacity style= {styles.signUp} onPress={this.handleSignUp}>
                <Text>Don't have an account?Sign Up Here!</Text>
              </TouchableOpacity>

            </View>
          </View>
          <Text style={styles.resetText}>Reset your password</Text>
        </View>
      )
    }
  }
}

export default Login
