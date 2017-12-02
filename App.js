import React, {Component,PureComponent}from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight ,TextInput} from 'react-native';
import styles from './src/front-end/style';
import {SimpleLineIcons} from '@expo/vector-icons';


const Header = (props)=>{
  return(
    <View style = {styles.headerStyle}>
      <Text style={styles.HeaderText}>
        {props.headerName}
      </Text>
    </View>
  );
};



export default class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      items: [],
      text: '',
      id:null,
    };
    this._renderTodo = this._renderTodo.bind(this);
    this._AddtoTheList = this._AddtoTheList.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

_AddtoTheList(){
  const addToList = {
    text: this.state.text,
    id: Date.now(),
  };
  this.setState(prevState=>({
    items: prevState.items.concat(addToList),
    text:'',
  }));
}

removeItem(item){
  const removeFromList = this.state.items;
  const TheIndex = removeFromList.indexOf(item);
  if(TheIndex > -1){
    removeFromList.splice(TheIndex,1);
  }else {
    alert("Item does not exist");
  }

  this.setState({
    items: removeFromList
  });

  console.log("index: "+TheIndex);
}

_renderTodo({item}){
  return(
    <View style={{flexDirection:"row",margin:10,justifyContent:"space-between"}}>
      <View style={{width:250,borderBottomWidth:1,borderColor:"blue"}}>
        <Text style={{color:"black",fontSize:18}}>{item.text}</Text>
      </View>
      <View style={{width:40}}>
        <TouchableHighlight
          onPress={()=>this.removeItem(item)}>
          <SimpleLineIcons name="check" size={30} color={"green"} />
        </TouchableHighlight>
      </View>
    </View>
  );
}


_keyExtractor = (item)=> item.id ;

  render() {
    return (
      <View style={styles.container}>
        <Header  headerName={"TODO List"}/>
        <View style={styles.rowView}>
          <TextInput
            placeholder = "TODO"
            onChangeText = {(text) => this.setState({text: text})}
            value={this.state.text}
            style = {styles.inputStyle}
            autoFocus = {true}
            underlineColorAndroid="transparent"
          />
          <TouchableHighlight
            onPress={this._AddtoTheList}
            style={styles.touchableStyle}>
            <Text style={styles.textStyle}>Add TODO</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.listView}>
          <FlatList
            extraData={this.state}
            data={this.state.items}
            renderItem={this._renderTodo}
            keyExtractor={this._keyExtractor}
          />
        </View>
      </View>
    );
  }
}
