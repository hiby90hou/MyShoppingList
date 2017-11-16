import React, {Component}  from 'react';
import {Text, View, StyleSheet,} from 'react-native';
// import './TodoMain.css'

var ToolbarAndroid = require('ToolbarAndroid');

class MainNavBar extends React.Component {
     onActionSelected=(position) => {
         const {updateUserName} = this.props
        if (position === 0) {
          // console.log("updateUserName")
          // let emptyUserName = 'null'
          // updateUserName(emptyUserName)
        }

        if (position === 1) {
            // alert("Log Off")
            console.log("Logoff")

            //clean all of autoLogin in userLog

            //Read file
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
          

          //change every AutoLogin state to false
          for(let i=0; i<userLog.length; i++){
            userLog[i].autoLogin=false;
          }

          //write file
          // require the module
          var RNFS = require('react-native-fs')
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

              // go back to login page
                console.log("updateUserName")
                let emptyUserName = 'null'
                updateUserName(emptyUserName)
            })
            .catch((err) => {
              console.log(err.message);
            });


        })
        .catch((err) => {
          console.log(err.message, err.code);
        }); 
        }

  }
    render() {
            // 定义style
            const styles = StyleSheet.create({
                toolbar: {
                    backgroundColor: '#e9eaed',
                    height: 56
                }
            })
        return (
            <View className="todo-main">
                          <ToolbarAndroid
          logo={require('../../resources/logo.png')}
          title="My Shopping List"
          style={styles.toolbar}
          actions={[{title: 'Setting'},{title: 'Log Off'}]}
          onActionSelected={this.onActionSelected}></ToolbarAndroid>
            </View>
        )
    };
}

export default MainNavBar;