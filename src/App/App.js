import React, { Component } from 'react';
import { View, Text, AppRegistry, Image, ScrollView,StyleSheet} from 'react-native';
import TodoHeader from '../TodoHeader/'
import TodoMain from '../TodoMain/'
import TodoFooter from '../TodoFooter/'
import ReadFile from '../readFile/'
import Network from '../network/'
import Login from '../Login/'
import MainNavBar from '../mainNavBar/'
import BarCodeScanner from '../barCodeScanner/'


class App extends Component {

  constructor(props){
    super(props)
    //初始化state
    this.state = {
      todos:[
      {isDone:false,title:'cake',expire:null}
      ],
      isAllDone:false,
      userName: 'null',
      password: null,
      uploadTime: null
    }
  }



  addTodo = (todo) => {
    const todos = this.state.todos

    //add
    todos.unshift(todo)
    //update
    this.setState({
      todos,
      isAllDone:false
    })
  }

  // update state for readfile and network
  initState = (newState) =>{
    const todos = newState.todos
    const isAllDone = newState.isAllDone
    const password = newState.password
    const uploadTime = newState.uploadTime

    this.setState({
      todos,
      isAllDone,
      password,
      uploadTime
    })
  }

  //Only update User Name
  updateUserName = (username) =>{
    this.setState({
      userName:username
    })
    console.log(this.state)
  }

  deleteTodo = (index) => {
    const todos = this.state.todos;
    const isAllDone = this.state.todos.filter(todo => !todo.isDone);
    todos.splice(index, 1)
    this.setState({
      todos,
      isAllDone:isAllDone.length===0&&todos.length>0
    })
  }

  //删除所有选中的todo
  deleteExpireItem = () => {
    // let currentTime = new Date()
    // console.log(currentTime);
    function checkExpire(todo){
      let dateNum
      if(todo.expire!=null){
      dateNum = Math.floor ( (new Date(todo.expire)-new Date()) / ( 24 * 3600 * 1000 ))+1
      }
      if(todo.expire==null || dateNum>=0){
        // console.log('no expire');
        return todo;
      }
      
    }
    //得到所有未完成的TODO组成的数组
    const todos = this.state.todos.filter(todo => (checkExpire(todo))) 
    console.log(todos);
    this.setState({
      todos,
      isAllDone:false
    })
  }

  // //更新指定todo的isDone值
  updateTodoChecked = () =>{
    const todos = this.state.todos;
    const isAllDone = this.state.todos.filter(todo => !todo.isDone); 
    this.setState({
      todos:this.state.todos,
      isAllDone:isAllDone.length===0&&todos.length>0
    })
  }

  //设置所有todos的选中状态
  changeAllChecked = (isAllDone) =>{
    //更新todos中所有TODO的状态
    const todos = this.state.todos;
    todos.forEach(todo =>{todo.isDone = isAllDone;})
    this.setState({
      isAllDone,
      todos
    })
  }



  render() {

    console.log('render')
    // 定义style
    const styles = StyleSheet.create({
      header: {
        flex: 1,
        alignItems: 'center',
        paddingTop:10,
        paddingBottom:10
      },
      loginContainer:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      },
      imageBg:{
        backgroundColor: '#ccc',
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center'
      }
    })

    // //定义main标签的props
    const mainProps = {
      todos: this.state.todos,
      updateTodoChecked:this.updateTodoChecked,
      deleteTodo:this.deleteTodo
    }

    // //定义footer标签的props
      const footerProps = {
        totalCount: this.state.todos.length,
        doneCount:this.state.todos.filter(todo => todo.isDone).length,
        deleteExpireItem:this.deleteExpireItem,
        isAllDone:this.state.isAllDone,
        changeAllChecked: this.changeAllChecked

      }
    //定义readfile标签的props
      const readfileProps = {
        state: this.state,
        initState:this.initState
      }

    //定义network标签的props
    const networkProps = {
        state: this.state,
        initState:this.initState
      }

    //定义MainNavBar标签的props
    const mainNavBarProps = {
      updateUserName:this.updateUserName
    }

    //定义login标签的props
    const loginProps = {
        updateUserName:this.updateUserName,
        initState: this.initState
    }

    if(this.state.userName=='null'){
      return(
        <View style={styles.loginContainer}>
          <Image
            style={styles.imageBg}
            source={require('../../resources/purple-bg.jpg')}
          />
          <Login {...loginProps}/>
        </View>
        )
    }else{
      return (
        <View style={{flex: 1}}>
          
          <ScrollView style={{flex: 1}}>
            <MainNavBar {...mainNavBarProps}/>
            <View style={styles.header}>
              <Text>Please enter your item name and press ✓</Text>

              <TodoHeader addTodo={this.addTodo}/>
            </View>
          
          <TodoMain {...mainProps}/>
          <TodoFooter {...footerProps}/>
          <ReadFile {...readfileProps}/>
          </ScrollView>

          <BarCodeScanner style={{position: 'absolute'}} />
        </View>
      );
    }
  }
}

export default App;
