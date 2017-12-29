import React, {Component} from 'react'
import { View, Text,Button, TextInput } from 'react-native';
import RNFS from 'react-native-fs';

class readFile extends Component {
async componentWillMount() {
  const {state, initState} = this.props
  //read file
  // require the module
  var RNFS = require('react-native-fs');

  //check server, if has this user name, get user data from server
  try {
    let response = await fetch(
      'http://192.168.1.5:3000/api/v1/users/'+state.userName
    );
    let responseJson = await response.json();
    console.log(responseJson);
    if(responseJson.status==="SUCCESS"){
      console.log("data receive success");
      let todosPar = responseJson.data.todos.replace(/\_(\w)/g, function(all, letter){
          return letter.toUpperCase();
        });
      console.log(todosPar)

      // let newState = {
      //   barCode: "null",
      //   isAllDone: responseJson.is_all_done,

      // }
      // console.log(newState)
      // initState(newState)
    }
  } catch (error) {
    console.error(error);
  }


  //create a path you want to read
  const path = RNFS.ExternalDirectoryPath + '/MyShoppingList/'+state.userName+'shoppingListData.json';
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
      let newState = JSON.parse(contents)
      console.log(newState)
      // initState(newState)
    })
    .catch((err) => {
      console.log(err.message, err.code);
    });
  }


  render() {


//delete file
//create a path you want to delete
// var path = RNFS.ExternalDirectoryPath+'/MyShoppingList/shoppingListData.json';

// return RNFS.unlink(path)
//   .then(() => {
//     console.log('FILE DELETED');
//   })
//   // `unlink` will throw an error, if the item to unlink does not exist
//   .catch((err) => {
//     console.log(err.message);
//   });




     return (
      <View className="todo-footer">
        <Text></Text>
       </View>
    )
  }

componentWillUnmount(){
    const {state, initState} = this.props

    // update upload time
    let newState = state
    newState.uploadTime = new Date()
    initState(newState)

//write file
    // require the module
var RNFS = require('react-native-fs');

var saveStr = JSON.stringify(state)
console.log(saveStr);

// create a path you want to write to
var path = RNFS.ExternalDirectoryPath + '/MyShoppingList/'+state.userName+'shoppingListData.json';

//make dir for this file
RNFS.mkdir(RNFS.ExternalDirectoryPath +'/MyShoppingList/')

// write the file
RNFS.writeFile(path, saveStr, 'utf8')
  .then((success) => {
    console.log('FILE WRITTEN! Path:');
    console.log(path);
    // console.log(path);
  })
  .catch((err) => {
    console.log(err.message);
  });
  }
}

export default readFile
