import React, { Component } from 'react';
import { View, Text, AppRegistry, Image, ScrollView,StyleSheet,BackHandler,ToastAndroid,} from 'react-native';
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
      uploadTime: null,
      barCode:'null'
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

  //Set barCode
  barCodeSetter = (newBarCode) =>{
    const barCode = newBarCode
    this.setState({
      barCode
    })
    this.forceUpdate()
    // console.log('barCodeSetter')
    // console.log(this.state)
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

  // //update todo's isDone value
  updateTodoChecked = () =>{
    const todos = this.state.todos;
    const isAllDone = this.state.todos.filter(todo => !todo.isDone); 
    this.setState({
      todos:this.state.todos,
      isAllDone:isAllDone.length===0&&todos.length>0
    })
  }

  //setting all of todos's selected state
  changeAllChecked = (isAllDone) =>{
    //update all the TODO's state in todos
    const todos = this.state.todos;
    todos.forEach(todo =>{todo.isDone = isAllDone;})
    this.setState({
      isAllDone,
      todos
    })
  }

//set the go back button
componentWillMount(){
      //go back button setting
  this.backButtonListener = BackHandler.addEventListener('hardwareBackPress',()=>{
    // console.log(this.props);
     if(this.state.userName!='null'){
      console.log('userName goback');
        ToastAndroid.show('Go back to Sign in Page',ToastAndroid.SHORT);
        this.updateUserName('null')
        return true
     }
    return false
  })
}



  render() {



    console.log('render')
    console.log(this.state)
    // defined style
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

    //defined main props
    const mainProps = {
      todos: this.state.todos,
      updateTodoChecked:this.updateTodoChecked,
      deleteTodo:this.deleteTodo
    }

     //defined footer props
    const footerProps = {
        totalCount: this.state.todos.length,
        doneCount:this.state.todos.filter(todo => todo.isDone).length,
        deleteExpireItem:this.deleteExpireItem,
        isAllDone:this.state.isAllDone,
        changeAllChecked: this.changeAllChecked

    }

    //defined readfile props
    const readfileProps = {
        state: this.state,
        initState:this.initState
      }

    //defined TodoHeader props
    const todoHeaderProps = {
      barCode:this.state.barCode,
      barCodeSetter:this.barCodeSetter
    }

    //defined network props
    const networkProps = {
        state: this.state,
        initState:this.initState
      }

    //defined MainNavBar props
    const mainNavBarProps = {
      updateUserName:this.updateUserName
    }

    //defined login props
    const loginProps = {
      updateUserName:this.updateUserName,
      initState: this.initState
    }

    //defined barcode props
    const barcodeProps = {
      barCodeSetter:this.barCodeSetter
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
              <Text>Please enter your item name and press enter</Text>

              <TodoHeader addTodo={this.addTodo} {...todoHeaderProps}/>
            </View>
          
          <TodoMain {...mainProps}/>
          <TodoFooter {...footerProps}/>
          <ReadFile {...readfileProps}/>
          </ScrollView>

          <BarCodeScanner style={{position: 'absolute'}} {...barcodeProps}/>
        </View>
      );
    }
  }
}

export default App;
