import React, {Component} from 'react'
import { View, Text,Button, TextInput, Alert,CheckBox } from 'react-native';

class TodoFooter extends Component {


  //删除完成的todos
  deleteExpireItem = () => {
      Alert.alert(
      'Are you sure to delete all expired item?',
      'This operation cannot be undone',
      [       
        {text: 'Yes', onPress: () =>this.props.deleteExpireItem()},
        {text: 'No', onPress: () =>{} },
      ],
      { cancelable: true }
    )
  }

  //处理改变
  handleChange = () => {
    const {changeAllChecked, isAllDone} = this.props

    changeAllChecked(!isAllDone)
  }

  render() {

    const {doneCount, totalCount, isAllDone} = this.props
    // const display = doneCount>0 ? 'block' : 'none'
    return (
      <View className="todo-footer">
        {/*<View>
          <CheckBox type="checkbox" value={isAllDone} onChange={this.handleChange}/>
        </View>*/}
        <View style={{marginLeft:10,marginRight:10}}>
          <Text>Complete {doneCount} / Total {totalCount}</Text>
          <Button color='#b131d8' title="delete expired item" className="btn btn-danger" onPress={this.deleteExpireItem}/>
        </View>
      </View>
    )
  }
}

export default TodoFooter
