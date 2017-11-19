/**
 * 头部组件
 */
import React, {Component} from 'react'

import { View, Text, TextInput, AppRegistry, Image, StyleSheet, TouchableOpacity } from 'react-native';

class TodoHeader extends Component {
  constructor(props){
    super(props);
    this.state = {times:0, text: ''}
  }
  timePlus(){
    let times = this.state.times
    times++
    console.log(times);
    this.setState({
      times:times
    })
  }

  handleChange = (text) => { return this.setState({text})}

  handleEnter = (text) =>{ 
    if(this.state.text==""){
      return
    }
    
    console.log(this.state.text);
    //根据输入的数据, 生成一个todo对象
    const todo = {
      title: this.state.text,
      isDone: false,
      expire:null
    }
    //调用方法, 添加todo到todos
    this.props.addTodo(todo)

    //格式化state.text
    this.setState({
      text:''
    })

    //清空input
    this.textInput.clear()
  }
  
  render() {

    // 定义style
    const styles = StyleSheet.create({
      todoHeader: {
        width:'90%',
        flex:1,
        flexDirection: 'row',
        backgroundColor:"#e4d4f9",
        borderRadius:20
      },
      inputBoxContainer:{
        flex:5,

        
      },
      inputBox: {
        marginLeft: 10,
        // marginRight: 10,
        
      },

      inputButton:{
        width:70,
        height:'auto',
        borderRadius:20,
        margin:3,
        // borderWidth:1,
        // borderColor: '#b131d8',
        backgroundColor: '#b131d8',
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonText:{
        // color:'#b131d8'
        color: 'white',
        fontWeight: '600',
      }

    })
    return (
        <View className = "todo-header" style={styles.todoHeader} >
          <View style={styles.inputBoxContainer}>
            <TextInput style={styles.inputBox} underlineColorAndroid = "#b131d8" type="text" placeholder=" Item name + Enter" onChangeText={this.handleChange.bind(this)} onEndEditing={this.handleEnter.bind(this)} ref={input => { this.textInput = input }}/>
            
          </View>
          <TouchableOpacity style={styles.inputButton} onPress={this.handleEnter.bind(this)}>
            <Text style={styles.buttonText}>Enter</Text>
          </TouchableOpacity>
        
        {/*<Text>
          {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
        </Text>
        <Text onPress={this.timePlus.bind(this)}>
          click me
        </Text>
        <Text>
          You click me {this.state.times} times
        </Text>*/}
      </View>
    )
  }
}

export default TodoHeader
