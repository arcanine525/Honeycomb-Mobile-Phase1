import React, { Component } from 'react'
import { ScrollView, Text, View, KeyboardAvoidingView, TouchableOpacity, TextInput, Modal } from 'react-native'

import PopupDialog from 'react-native-popup-dialog';
import {Card, Icon, Button, FormLabel} from 'react-native-elements';
import {Dropdown} from 'react-native-material-dropdown';
import axios from "axios";
import DatePicker from "react-native-datepicker";

import mockingDropdown from '../../../fakeDataDropdown'

// Styles
import styles from './EditAssetScreenStyle'

class EditAssetScreen extends Component {
    constructor(props){
        super(props)

        this.state = {
            id: this.props.navigation.state.params.id,
            zone: this.props.navigation.state.params.zone,
            type: this.props.navigation.state.params.type,
            supplier: this.props.navigation.state.params.supplier,
            price: this.props.navigation.state.params.price,
            owner: this.props.navigation.state.params.owner,
            buydate: this.props.navigation.state.params.buydate,
            expiredate: this.props.navigation.state.params.expiredate,
            status: this.props.navigation.state.params.status,
        }
    }

    // static navigationOptions = {
    //     headerMode: 'float',
    //     headerStyle: styles.headers
    // };

  render () {
    return (
        <ScrollView style={styles.mainView}>
                <View style={{flex: 1, flexDirection: 'row', marginLeft: 10}}>
                    <Text style = {{flex: 1, fontSize: 20}}>
                        ID: {this.state.id}
                    </Text>
                </View>
                <View style={{
                    flex:1, height: 0.5, 
                    backgroundColor: 'gray'}}/>
                <View style={{flex: 1, flexDirection: 'row', marginLeft: 10}}>
                    <Dropdown 
                        label = {this.state.type} 
                        data = {mockingDropdown[0]}
                        containerStyle = {{flex: 1, width: "80%"}}
                        fontSize = {20}
                        onChangeText={type => this.setState({ type })}
                        value={this.state.type}/>
                    <Icon   
                        name = 'add-circle-outline'
                        color = 'green'
                        containerStyle = {{width: "20%", marginTop: 15}}
                        onPress = {() => {
                            this.addType.show();
                        }}/>
                </View>
                <View style={{flex: 1, flexDirection: 'row', marginLeft: 10}}>
                    <Dropdown 
                        label = {this.state.zone} 
                        data = {mockingDropdown[1]}
                        containerStyle = {{flex: 1, width: "80%"}}
                        fontSize = {20}
                        onChangeText={zone => this.setState({ zone })}
                        value={this.state.zone}/>
                    <Icon   
                        name = 'add-circle-outline'
                        color = 'green'
                        containerStyle = {{width: "20%", marginTop: 15}}
                        onPress = {() => {
                            this.addZone.show();
                        }}/>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style = {{marginTop: 14, marginLeft: 10, fontSize: 20}}>
                        Supplier: 
                    </Text>
                    <TextInput 
                        placeholder = {this.props.navigation.state.params.supplier}
                        style = {{width: "80%", marginTop: 5}}
                        fontSize = {20}
                        onChangeText={supplier => this.setState({ supplier })}>

                    </TextInput>
                </View>
                <View style={{
                    flex:1, height: 0.5, 
                    backgroundColor: 'gray'}}/>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style = {{marginTop: 14, marginLeft: 10, fontSize: 20}}>
                        Price:
                    </Text>
                    <TextInput 
                        placeholder = {this.props.navigation.state.params.price}
                        style = {{width: "80%", marginTop: 5}}
                        fontSize = {20}
                        onChangeText={price => this.setState({ price })}>

                    </TextInput>
                </View>
                <View style={{
                    flex:1, height: 0.5, 
                    backgroundColor: 'gray'}}/>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style = {{marginTop: 14, marginLeft: 10, fontSize: 20}}>
                        Owner:
                    </Text>
                    <TextInput 
                        placeholder = {this.props.navigation.state.params.owner}
                        style = {{width: "80%", marginTop: 5}}
                        fontSize = {20}
                        onChangeText={owner => this.setState({ owner })}>

                    </TextInput>
                </View>
                <View style={{
                    flex:1, height: 0.5, 
                    backgroundColor: 'gray'}}/>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style = {{fontSize: 20, marginTop: 8, marginLeft: 10, marginRight: 20}}>Bought Date</Text>
                    <DatePicker
                        date={this.state.buydate}
                        disabled
                        mode="date"
                        placeholder="Select date"
                        format="DD-MM-YYYY"
                    />
                </View>
                <View style={{
                    flex:1, height: 0.5, 
                    backgroundColor: 'gray'}}/>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={{fontSize: 20, marginTop: 8, marginLeft: 10, marginRight: 29}}>Expire Date</Text>
                    <DatePicker
                        date={this.state.expiredate}
                        mode="date"
                        placeholder="select date"
                        format="DD-MM-YYYY"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onDateChange={expiredate => {
                        this.setState({ expiredate: expiredate });
                        }}
                    />
                </View>
                <View style={{
                    flex:1, height: 0.5, 
                    backgroundColor: 'gray'}}/>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style = {{marginTop: 14, marginLeft: 10, fontSize: 20}}>
                        Status:
                    </Text>
                    <TextInput 
                        placeholder = {this.props.navigation.state.params.status}
                        style = {{width: "80%", marginTop: 5}}
                        fontSize = {20}
                        onChangeText={status => this.setState({ status })}>

                    </TextInput>
                </View>
                <View style={{
                    flex:1, height: 0.5, 
                    backgroundColor: 'gray'}}/>
            <Button 
                //fontFamily='Lotalo'
                title = "SAVE"
                buttonStyle={{
                    backgroundColor: 'green',
                    borderRadius: 20,
                    marginTop: 14,
                    marginLeft: 100,
                    marginRight: 100}}
                //title= 'BACK'
                icon = {{
                    name: 'save',
                    size: 20,
                    color: 'white'
                }}
                onPress = {() => {
                    this.popupDialog.show();
                }}>
            </Button>
            <PopupDialog
                ref={(popupDialog) => {this.popupDialog = popupDialog;}}>
                <View>
                    <Text>
                        ID: {this.state.id}
                    </Text>
                    <Text>
                        Zone: {this.state.zone}
                    </Text>
                    <Text>
                        Type: {this.state.type}
                    </Text>
                    <Text>
                        Supplier: {this.state.supplier}
                    </Text>
                    <Text>
                        Price: {this.state.price}
                    </Text>
                    <Text>
                        Owner: {this.state.owner}
                    </Text>
                    <Text>
                        Buy Date: {this.state.buydate}
                    </Text>
                    <Text>
                        Expire Date: {this.state.expiredate}
                    </Text>
                    <Text>
                        Status: {this.state.status}
                    </Text>
                </View>
                </PopupDialog>
                <PopupDialog ref = {(addType) => {this.addType = addType; }} dialogStyle={{height: 180}}>
                    <Text style = {{marginTop: 14, marginLeft: 10, fontSize: 20}}>
                        Type:
                    </Text>
                    <TextInput 
                        style = {{width: "80%", marginLeft: 8}}
                        fontSize = {20}
                        onChangeText={type => this.setState({ type })}>

                    </TextInput>
                    <View style={{height: 1, backgroundColor: 'gray', marginBottom: 10}}/>
                    <Button 
                        //fontFamily='Lotalo'
                        title = "CREATE"
                        buttonStyle={{
                            backgroundColor: 'green',
                            borderRadius: 20,
                            marginTop: 14,
                            marginLeft: 100,
                            marginRight: 100}}
                        //title= 'BACK'
                        onPress = {() => {
                            
                        }}>
                    </Button> 
                </PopupDialog>
                <PopupDialog ref = {(addZone) => {this.addZone = addZone; }} dialogStyle={{height: 180}}>
                    <Text style = {{marginTop: 14, marginLeft: 10, fontSize: 20}}>
                        Zone:
                    </Text>
                    <TextInput 
                        style = {{width: "80%", marginTop: 5}}
                        fontSize = {20}
                        onChangeText={zone => this.setState({ zone })}>

                    </TextInput>
                    <View style={{height: 1, backgroundColor: 'gray', marginBottom: 10}}/>
                    <Button 
                        //fontFamily='Lotalo'
                        title = "CREATE"
                        buttonStyle={{
                            backgroundColor: 'green',
                            borderRadius: 20,
                            marginTop: 14,
                            marginLeft: 100,
                            marginRight: 100}}
                        //title= 'BACK'
                        onPress = {() => {
                            
                        }}>
                    </Button>
                </PopupDialog>
        </ScrollView>
    );
  }
}

export default EditAssetScreen