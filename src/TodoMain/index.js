import React from 'react';
import {Text, View} from 'react-native';
 import TodoItem from '../TodoItem/TodoItem'
// import './TodoMain.css'

class TodoMain extends React.Component {
	render() {
		const todos = this.props.todos;
		return (
			<View className="todo-main">
				{
					todos.map((todo,index)=>{
						return (
								<TodoItem key={index} todo={todo} index={index} {...this.props}/>
								// <Text>todo-main</Text>

							)
					})
				}
			</View>
		)
	};
}

export default TodoMain;

		