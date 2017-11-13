import React from 'react';
// import PubSub from 'pubsub-js'
import {Text, View, CheckBox, Button, StyleSheet,DatePickerAndroid, Alert,ToastAndroid} from 'react-native';

class TodoItem extends React.Component {
	//checkbox状态改变的监听回调函数
	handleChange = (async()=>{
		const {updateTodoChecked,todo}= this.props
		todo.isDone = !todo.isDone

		let self = this
		
		if(todo.isDone){
		ToastAndroid.showWithGravityAndOffset('please enter item expire date',ToastAndroid.SHORT, ToastAndroid.TOP, 0,50);
		// Alert.alert(
		//   'please enter item expire date',
		//   '',
		//   [		    
		//     {text: 'Yes', onPress: () =>{self.changeDate()}},
		//   ],
  // 			{ cancelable: false }
		// )
		 this.changeDate()
	    }
	    else{
	    	self.changeDate()
	    }
	})

	changeDate = (async()=>{
		const {updateTodoChecked,todo}= this.props
		if(todo.isDone){
			let temp = todo.expire
			try {
			  const {action, year, month, day} = await DatePickerAndroid.open({
			    date: new Date(),
			    mode:'spinner'    
			  });
			  if (action == DatePickerAndroid.dismissedAction) {
			    todo.expire = temp
			  }else{
			  	var date = new Date(year,month,day)
			  	todo.expire = date
			}
			} catch ({code, message}) {
			  console.warn('Cannot open date picker', message);
			}
		}
		updateTodoChecked()
	})

	//点击删除相应
	deleteTodo = () => {
		const {deleteTodo,todo,index} = this.props
		Alert.alert(
		  'Are you sure to delete '+ todo.title+'?',
		  'This operation cannot be undone',
		  [		    
		    {text: 'Yes', onPress: () =>deleteTodo(index)},
		    {text: 'No', onPress: () =>{} },
		  ],
		  { cancelable: true }
		)
			
	}

	colorChange = (color) => {
		const {todo} = this.props
		let expireDate=null
		if(todo.expire!=null){
			expireDate = new Date(todo.expire)
		}
		let num = Math.floor ( (expireDate-new Date()) / ( 24 * 3600 * 1000 ))+1
		// console.log(num);
		if(todo.expire!=null && num<3 && num>=0){
			return color = {
			veryfresh:false,
      		nearexpire:true,
      		isexpired:false
      	}
		}
		else if(todo.expire!=null && num<0){
			return color = {
				veryfresh:false,
				nearexpire:false,
				isexpired:true
			}
		}
		else{
			return color
		}
	}


	render() {
		const {title,isDone,expire} = this.props.todo
		let expireDate = new Date(expire)
		let color = {
			veryfresh:true,
      		nearexpire:false,
      		isexpired:false
      	}
      	color = this.colorChange(color)
      	// console.log(color);
		
		// console.log(this.state);

		const styles = StyleSheet.create({
		  container: {
		    flex: 1, 
		    flexDirection: 'row',
		    backgroundColor: "#F5F5F5",
		    paddingTop: 30,
		    paddingLeft:10,
		    paddingRight:10,
		  },
		  content: {
		    flex: 1,
		    flexDirection: 'row'
		  },
		  button:{
		    color:'#b131d8'
		  },
		  expire_date:{
		  	flex: 1
		  },
		  gray_color:{
		  	color:"#ccc"
		  },
		  red_color:{
		  	color:"red"
		  },
		  dark_gray_color:{
		  	color:"#50555b",
		  	textDecorationLine:"line-through"
		  }
		})
		return (
				<View ref="li" style={styles.container}>
					<View style={styles.content}>
						<CheckBox type="checkbox" value={isDone} onChange ={this.handleChange}/>
						<Text>{title}</Text>
					</View>
					<Text style={[styles.expire_date, color.veryfresh && styles.gray_color, color.nearexpire && styles.red_color, color.isexpired && styles.dark_gray_color]} onPress={this.changeDate}>
						{(expire !=null)?("Expire date:\n"+expireDate.getFullYear()+"/"+(parseInt(expireDate.getMonth())+1)+"/"+expireDate.getDate()):""}
					</Text>
					<Button color='#b131d8' style={[styles.content, styles.button]} title="delete" onPress={this.deleteTodo} ref='button'/>
				</View>
		)
	};
}

export default TodoItem;

		