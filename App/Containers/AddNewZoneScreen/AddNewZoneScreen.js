import React, { Component } from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import { FormInput, FormLabel, Button, Header, Icon } from "react-native-elements";
import axios from "axios";
import styles from "./AddNewZoneScreenStyle";
import { Colors, Fonts } from '../../Themes/'

class AddNewZoneScreen extends Component {

  constructor(props){
    super(props);
    this.state={
      zoneName: '',
      floor: '',
    }
  }

  postDataToServer = async () => {
    let newZone = {
      Name: this.state.zoneName,
      Floor: this.state.floor,
      ID: 14021997
    };
    axios.post('http://34.201.49.123:8080/api/addzone', {newZone});
  }

  

  _onButtonSavePress=()=>{
    this.postDataToServer();
    this.props.navigation.navigate('Zone Management')
  }

  render() { 
    const {navigation} = this.props
    return (
      <View style={styles.container}>
        <Header
          leftComponent = {
            <TouchableOpacity
              onPress = {() => {navigation.navigate('Zone Management')}}
            >
              <Icon
                name = 'arrow-back'
                color = 'white'
              />
            </TouchableOpacity>
          }
          centerComponent = {{text: 'Create New Zone', style: {color: 'white', fontSize: Fonts.size.h5}}}
          backgroundColor = {Colors.headerBackground}
        />
        <FormLabel labelStyle={styles.label}>Name</FormLabel>
        <FormInput
          placeholder="Please enter zone name"
          inputStyle={styles.input}
          onChangeText = {(zoneName)=>this.setState({zoneName})}
        />

        <FormLabel labelStyle={styles.label}>Floor</FormLabel>
        <FormInput
          placeholder="Please enter floor"
          keyboardType="numeric"
          inputStyle={styles.input}
          onChangeText={(floor)=>this.setState({floor})}
        />
        <Button
          // onPress={() => this.props.navigation.navigate("Zone Management")}
          onPress={()=>{
            this.postDataToServer();
            Alert.alert("You Add Item")
            this.props.navigation.navigate("Zone Management")
          }}
          //onPress={() => this.props.navigation.navigate("Zone Management")}
          title="CREATE"
          buttonStyle={{
            alignSelf: "center",
            marginTop: 20,
            width: "80%",
            backgroundColor: "#ff9c46"
          }}
          textStyle={{ fontSize: 20, color: 'black' }}
        />
      </View>
    );
  }
}

export default AddNewZoneScreen;
