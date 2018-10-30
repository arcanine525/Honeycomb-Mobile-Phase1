import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Alert } from "react-native";
import {Card, FormLabel, FormInput, Button, Header, Icon} from 'react-native-elements'
import styles from './ZoneDetailScreenStyle'
import { Colors, Fonts } from '../../Themes';
import axios from 'axios'

export default class ZoneDetailScreen extends Component
{
    constructor(props)
    {
        super(props)
        this.state = 
        {
            onEdit: false,
        }
    }

    onEdit(val)
    {
        this.setState({onEdit: val})
    }

    render()
    {
        const {navigation} = this.props
        const Name = navigation.getParam('Name')
        const Floor = navigation.getParam('Floor')
        const ID = navigation.getParam('ID')
        //console.warn(ID)
        if (!this.state.onEdit){
            return(
                <View style = {styles.container}>
                    <Header
                        leftComponent = {
                            <TouchableOpacity
                                onPress = {() => {
                                    navigation.state.params.ZoneScreen.onRefresh()
                                    navigation.navigate('Zone Management')
                                }}
                            >
                                <Icon
                                    name = 'arrow-back'
                                    color = 'white'
                                />
                            </TouchableOpacity>
                        }
                        centerComponent = {{text: 'Zone Detail', style: {color: 'white', fontSize: Fonts.size.h5}}}
                        rightComponent = {
                            <TouchableOpacity
                                onPress = {() => {
                                    Alert.alert(
                                        'Alert',
                                        'Are you sure you want to delete?',
                                        [
                                            {text: 'No', onPress: () => console.log('Cancel pressed'), style: 'cancel'},
                                            {text: 'Yes', onPress: () =>{
                                                let params = {ID: navigation.getParam('ID')}
                                                //console.warn(params)
                                                axios.post('http://45.32.127.118:8080/api/deletezone', {params})
                                                navigation.navigate('Zone Management')
                                            } }
                                        ],
                                        {cancelable: true}
                                    )
                                }}
                                style = {{flexDirection: 'row', alignItems:'center'}}
                            >
                                <Icon
                                    name = 'delete'
                                    color = 'white'
                                />
                                <Text style = {{color: 'white', fontSize: 15}}>Delete</Text>
                            </TouchableOpacity>
                        }
                        backgroundColor = {Colors.headerBackground}
                    />
                    <Card>
                        <Text style = {{fontSize: 20}}>Name: {Name}</Text>
                    </Card>
                    <Card>
                        <Text style = {{fontSize: 20}}>Floor: {Floor}</Text>
                    </Card>
                    <Card>
                        <Text style = {{fontSize: 20}}>ID: {ID}</Text>
                    </Card>
                    <Text 
                        style = {{color: 'blue', marginTop: 20, fontSize: 17, alignSelf: 'center'}}
                        onPress = {() =>{this.onEdit(true)}}
                    >
                        Edit
                    </Text>
                </View>
            )
        }
        else{
            return(
                <View style = {styles.container}>
                    <Header
                        leftComponent = {
                            <TouchableOpacity
                                onPress = {() => {this.onEdit(false)}}
                            >
                                <Icon
                                    name = 'arrow-back'
                                    color = 'white'
                                />
                            </TouchableOpacity>
                        }
                        centerComponent = {{text: 'Edit Zone Detail', style: {color: 'white', fontSize: Fonts.size.h5}}}
                        backgroundColor = {Colors.headerBackground}
                    />
                    <FormLabel
                        labelStyle = {{fontSize: 20}}
                    >
                        Name
                    </FormLabel>
                    <FormInput
                        placeholder = 'Please enter zone name'
                        inputStyle = {{fontSize: 19}}
                        value = {Name}
                    />
                    <FormLabel
                        labelStyle = {{fontSize: 20}}
                    >
                        Floor
                    </FormLabel>
                    <FormInput
                        placeholder = 'Please enter floor'
                        keyboardType = 'numeric'
                        inputStyle = {{fontSize: 19}}
                        value = {Floor}
                    />
                    <Button
                        onPress = {() => {this.onEdit(false)}}
                        title = 'SAVE'
                        buttonStyle = {{alignSelf: 'center',marginTop: 20, width: '80%', backgroundColor: '#00e6ac'}}
                        textStyle = {{fontSize: 20}}
                    /> 
                </View>
            )
        }
    }
}