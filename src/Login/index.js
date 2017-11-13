import React, {Component} from 'react'
import { View, Text, Button, TextInput, Alert, StyleSheet, Switch, TouchableOpacity, Image,
  ToastAndroid, } from 'react-native';
import CheckPassword from '../checkPassword/index.js'
import SignUp from '../signUp/'

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


  loginCheck = ()=>{
    const {updateUserName} = this.props

    let correctUserName = 'hiby';
    let correctPassword = 'hiby';
    // const {updateUserName} = this.props
    if(correctUserName == this.state.inputUserName &&
      correctPassword == this.state.inputPassword){
        updateUserName(correctUserName)
    }else{
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


  //pass password check
  passCheck =(result)=>{
    this.setState({
      checkPassword:result
    })
    console.log('checkPassword'+this.state.checkPassword);
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
    updateUserName(correctUserName)
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
        signUp: this.state.signUp
    }

    if(this.state.signUp){
      return(
        <SignUp {...signUpProps}/>
        )
    }else{
      return (
        <View>
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
                <Switch/>   
              </View>
              <View style = {styles.gap}></View>
              <Button color='#b131d8' onPress = {this.loginCheck} title="Sign In"/>
              <TouchableOpacity style= {styles.signUp} onPress={this.handleSignUp}>
                <Text>Don't have an account?Sign Up Here!</Text>
              </TouchableOpacity>

            </View>
            {/*<CheckPassword {...checkPasswordProps}/>*/}
          </View>
          <Text style={styles.resetText}>Reset your password</Text>
        </View>
      )
    }
  }
}

export default Login
