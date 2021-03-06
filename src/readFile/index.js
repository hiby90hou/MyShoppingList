import React, {Component} from 'react'
import { View, Text,Button, TextInput } from 'react-native';
import RNFS from 'react-native-fs';

class readFile extends Component {
componentWillMount() {
  const {state, initState} = this.props
  //read file
  // require the module
  var RNFS = require('react-native-fs');

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
    .then(async (contents) => {
      // log the file contents
      let newState = JSON.parse(contents)
      newState.password = state.password
      console.log('newState')
      console.log(newState)

      if(state.userName==='default'){
        initState(newState)
      }
      else{
        // if the update time of local data is older then the server data, use the server data
        //check server, if has this user name, get user data from server
        try {
          let response = await fetch(
            'http://13.210.171.212:3000/api/v1/users/'+state.userName+'?password='+state.password
          );
          let responseJson = await response.json();
          console.log(responseJson);
          if(responseJson.status==="SUCCESS"){
            console.log("data receive success");
            let todosPar = JSON.parse(responseJson.data.todos)
            console.log(todosPar)

            let newServerState = {
              barCode: "null",
              isAllDone: responseJson.data.is_all_done,
              userName: responseJson.data.user_name,
              password: state.password,
              todos: todosPar,
              uploadTime: responseJson.data.updated_at
            }
            console.log(newServerState)
            if(Date.parse(newServerState.uploadTime)>Date.parse(newState.uploadTime)){
              console.log("newServerState.uploadTime>newState.uploadTime")
              initState(newServerState)
            }else{
              initState(newState)
              
            }
          }
        } catch (error) {
          console.error(error)
          initState(newState)
        }
      }
    })
    .catch(async (err) => {
      console.log(err.message, err.code);
      // if we cannot find user in local but can find him in the server, download the data
      try {
        let response = await fetch(
          'http://13.210.171.212:3000/api/v1/users/'+state.userName+'?password='+state.password
        );
        let responseJson = await response.json();
        if (responseJson.status === "SUCCESS") {
          console.log("find user in database, download data");
          let todosPar = JSON.parse(responseJson.data.todos)
          console.log(todosPar)

          let newServerState = {
            barCode: "null",
            isAllDone: responseJson.data.is_all_done,
            userName: responseJson.data.user_name,
            password: state.password,
            todos: todosPar,
            uploadTime: responseJson.data.updated_at
          }
          initState(newServerState)
        }
      } catch (error) {
        console.error(error)
        initState(newState)
      }
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
  .then(async (success) => {
    console.log('FILE WRITTEN! Path:');
    console.log(path);
    // console.log(path);
    //save data to database
    let savestr2 = JSON.stringify(newState.todos);
    try {
      let response = await fetch('http://13.210.171.212:3000/api/v1/users/'+state.userName+'?password='+newState.password, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          todos: savestr2,
          updated_at: newState.uploadTime
        })
      });
      console.log(response)
    } catch (error) {
      console.error(error);
    }   
  })
  .catch(async (err) => {
    console.log(err.message);

    //save data to database
    let savestr2 = JSON.stringify(newState.todos);
    try {
      let response = await fetch('http://13.210.171.212:3000/api/v1/users/'+state.userName+'?password='+state.password, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          todos: savestr2,
          updated_at: newState.uploadTime
        })
      });
      console.log(response)
    } catch (error) {
      console.error(error);
    }
    
  });
  }
}


export default readFile
