import React, {Component} from 'react'
import {View, FlatList, Text, Image, TouchableOpacity, TextInput, Button, ActivityIndicator} from 'react-native'
import {Card, ListItem} from 'react-native-elements'
import axios from 'axios'

export default class ReportResultStyleScreen extends Component{

    constructor(props){
        super(props);
        this.state={
            isLoading: false,
            data: [],
        }
    }

    async _getDataFromServer(input){
        if(input == "less"){
            let res = await axios.post('http://api.honeycomb2.geekup.vn/api/maintenancecheck/compareless/Z886');
            this.setState({data: res.data});
        }
        this.setState({isLoading: false})
    }

    fakeData(){
        let tmp = [];
        for(let i = 0; i<60; i++){
            let x = Math.floor((Math.random() * (100)) + 1);
            let y = Math.floor((Math.random() * (100)) + 1);
            let name = "TABLE" + i;
            let item = {name: name, pre: x, current: y}
            tmp.push(item)
        }
        this.setState({data: tmp})
    }

    componentWillMount(){
        //const {params} = this.props.navigation.state;
        this.fakeData()
    }

    renderItem = ({item}) => {
        const name = item.name;
        const current = item.current;
        const pre = item.pre;
        return(
            <View style={{flexDirection:'row'}}> 
                <Text style={{fontWeight: 'bold', fontSize: 20}}>{name}</Text>
                <Text>{pre}</Text>
                <Text>{current}</Text>
            </View>
        )
    }

    render(){
        return(
            <View style={{flex: 1, backgroundColor:'white'}}>
                <View style={{position:'absolute', height: '90%', width:'80%', alignSelf: 'center' ,  backgroundColor:'white', borderWidth: 1 }}>
                    
                </View>
                <FlatList
                            data = {this.state.data}
                            renderItem = {this.renderItem}
                            keyExtractor = {(item)=>item.name}
                        />
            </View>
        )
        // if(this.state.isLoading){
        //     return (
        //         <View
        //           style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        //         >
        //           <ActivityIndicator size="large" color="gray" />
        //         </View>
        //       );
        // }else{
        //     return(
        //         <View style={{flex: 1}}>
        //             <FlatList
        //                 data = {this.state.data}
        //                 renderItem = {this.renderItem}
        //                 keyExtractor = {(item)=>item.id}
        //             />
        //         </View>
        //     )
        // }//
    }
}

