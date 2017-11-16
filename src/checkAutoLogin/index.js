import React, {Component} from 'react'
import { View, Text,Button, TextInput } from 'react-native';
import RNFS from 'react-native-fs';

class checkAutoLogin extends Component {
componentWillMount() {
  const {updateUserName} = this.props
  //read file
  console.log("readFile AutoLogin")
  // require the module
  var RNFS = require('react-native-fs')

    //create a path you want to read
    const path = RNFS.ExternalDirectoryPath + '/MyShoppingList/userLog.json'
    RNFS.readFile(path)
    .then((statResult) => {
      // console.log(RNFS.exists(path))
      if (RNFS.exists(path)) {
        // if we have a file, read it
        return RNFS.readFile(path, 'utf8')
      }

      return 'no file'
    })
    .then((contents) => {
      // log the file contents
      let userLog = JSON.parse(contents)
      // console.log(userLog)
      

      //check AutoLogin state
      for(let i=0; i<userLog.length; i++){
        if(userLog[i].autoLogin){
          //success signup
          console.log('autoLogin success')
          updateUserName(userLog[i].username)
        }
      }


    })
    .catch((err) => {
      console.log(err.message, err.code);
    });
  }


  render() {
     return (
      <View className="todo-footer">
        <Text></Text>
       </View>
    )
  }

}

export default checkAutoLogin
