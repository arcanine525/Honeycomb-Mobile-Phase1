import React, { Component } from 'react'
import {Alert, ScrollView, Text, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import axios from 'axios'
import {Card, Icon, Button, Header} from 'react-native-elements';
// Styles
import { Colors, Fonts } from '../../Themes';
import styles from './AssetScreenStyle'

class AssetDetailsScreen extends Component {
    constructor(props){
        super(props)
    }

    // static navigationOptions = {
    //     headerMode: 'float',
    //     headerStyle: styles.headers
    // };

    
    onDelete = (data) =>
    {
        console.warn(data)
        let deletedData = data
        console.log('Truoc khi axios')
        try{
            axios.post('http://45.32.127.118:8080/api/deleteasset', {deletedData});
        }catch(e){
            console.log(e);
        }
    }

  render () {
    const {navigation} = this.props;
    let passProps = {
        id: this.props.navigation.state.params.id,
        zone: this.props.navigation.state.params.zone,
        type: this.props.navigation.state.params.type,
        supplier: this.props.navigation.state.params.supplier,
        price: this.props.navigation.state.params.price,
        owner: this.props.navigation.state.params.owner,
        buydate: this.props.navigation.state.params.buydate,
        expiredate: this.props.navigation.state.params.expiredate,
        status: this.props.navigation.state.params.status
    }
    return (
        <View style = {{flex: 1}}>
            <Header
                leftComponent = {
                    <TouchableOpacity
                        onPress = {() => {navigation.navigate('AssetScreen')}}
                    >
                        <Icon
                            name = 'arrow-back'
                            color = 'white'
                        />
                    </TouchableOpacity>
                }
                centerComponent = {{text: 'Asset Detail', style: {color: 'white', fontSize: Fonts.size.h5}}}
                rightComponent = {
                    <TouchableOpacity
                        onPress = {() => {
                            //Alert.alert();
                            Alert.alert(
                                'Alert',
                                'Are you sure you want to delete?',
                                [
                                    {text: 'No', onPress: () => console.log('Cancel pressed'), style: 'cancel'},
                                    {text: 'Yes', onPress: () =>{
                                        //let deletedData = {id: this.props.navigation.state.params.id};
                                        // //console.warn(deletedData)
                                        
                                        navigation.navigate('AssetScreen')
                                        this.onDelete(passProps)
                                    } }
                                ],
                                {cancelable: true}
                            )

                            // let deletedData = {id: this.props.navigation.state.params.id};
                            //             //console.warn(deletedData)
                            //             console.log('Truoc khi axios')
                            //             axios.post('http://10.0.2.2:8080/api/deleteasset', {deletedData});
                            //             console.log('Chua chay duoc navigation')
                            //             //navigation.navigate('AssetScreen')
                            //             console.log('Chay duoc navigation')
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
            <ScrollView style={styles.mainView}>
            <View style={styles.twoCardInLine}>
                <TouchableOpacity style={{width: "50%"}}>
                <Card containerStyle={{alignItems: 'baseline'}}>
                    <Text>
                        ID: {this.props.navigation.state.params.id}
                    </Text>
                </Card>
                </TouchableOpacity>
                <TouchableOpacity style={{width: "50%"}}>
                <Card containerStyle={{alignItems: 'baseline'}}>
                    <Text>
                        Type: {this.props.navigation.state.params.type}
                    </Text>
                </Card>
                </TouchableOpacity>
            </View>
            <View style={styles.twoCardInLine}>
                <TouchableOpacity style={{width: "50%"}}>
                <Card containerStyle={{alignItems: 'baseline'}}>
                    <Text>
                        Zone: {this.props.navigation.state.params.zone}
                    </Text>
                </Card>
                </TouchableOpacity>
                <TouchableOpacity style={{width: "50%"}}>
                <Card containerStyle={{alignItems: 'baseline'}}>
                    <Text>
                        Supplier: {this.props.navigation.state.params.supplier}
                    </Text>
                </Card>
                </TouchableOpacity>
            </View>
            <View style={styles.twoCardInLine}>
                <TouchableOpacity style={{width: "50%"}}>
                <Card containerStyle={{alignItems: 'baseline'}}>
                    <Text>
                        Price: {this.props.navigation.state.params.price}
                    </Text>
                </Card>
                </TouchableOpacity>
                <TouchableOpacity style={{width: "50%"}}>
                <Card containerStyle={{alignItems: 'baseline'}}>
                    <Text>
                        Owner: {this.props.navigation.state.params.owner}
                    </Text>
                </Card>
                </TouchableOpacity>
            </View>
            <View style={styles.twoCardInLine}>
                <TouchableOpacity style={{width: "50%"}}>
                <Card containerStyle={{alignItems: 'baseline'}}>
                    <Text>
                        Buy Date: {this.props.navigation.state.params.buydate}
                    </Text>
                </Card>
                </TouchableOpacity>
                <TouchableOpacity style={{width: "50%"}}>
                <Card containerStyle={{alignItems: 'baseline'}}>
                    <Text>
                        Expire Date: {this.props.navigation.state.params.expiredate}
                    </Text>
                </Card>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{width: "50%"}}>
            <Card containerStyle={{alignItems: 'baseline'}}>
                <Text>
                    Status: {this.props.navigation.state.params.status}
                </Text>
            </Card>
            </TouchableOpacity>
            <Button 
                buttonStyle={{
                    backgroundColor: 'green',
                    borderRadius: 20,
                    marginTop: 14,
                    marginLeft: 80,
                    marginRight: 80}}
                //title= 'BACK'
                icon = {{
                    name: 'edit',
                    size: 20,
                    color: 'white'
                }}
                onPress = {() => {
                    this.props.navigation.navigate("EditAssetScreen", passProps)
                }}>
            </Button>
        </ScrollView>
        </View>
    );
  }
}

export default AssetDetailsScreen