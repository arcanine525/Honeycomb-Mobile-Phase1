import React, { Component } from 'react'
import {
    View,
    FlatList,
    TouchableOpacity,
    Text,
} from 'react-native'
import {
    Header,
    Card,
} from 'react-native-elements'
import { Dropdown } from 'react-native-material-dropdown';
import { Colors, Fonts } from '../../Themes/'
import axios from 'axios'

var statusDropdownList = [
    {
        "value": "None"
    },
    {
        "value": "Doing"
    },
    {
        "value": "Pending"
    },
    {
        "value": "Done"
    }
]

export default class ReportScreen extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            data: [],
            refreshing: false,
            currentStatus: "None",
            fileredStatusList: [],
        }
    }

    _onStatusFilter = async () =>{
        var statusFilter = this.state.currentStatus;
        if(statusFilter != 'None'){
            var length = this.state.data.length;
            var result = [];
            for(var i = 0;i < length;i ++){
                var tempStatus = this.state.data[i].status;
                if(statusFilter == tempStatus){
                    result.push(this.state.data[i]);
                }
            }
            this.setState({fileredStatusList: result});
        }
        else{
            this.setState({fileredStatusList: this.state.data});
        }
        this.onRefresh = this.onRefresh.bind(this);
    }

    onRefresh = () =>
    {
        this.setState({refreshing: true})
        axios.get('http://api.honeycomb2.geekup.vn/api/report')
        .then((response)=> {
            this.setState({data: response.data})
            this.setState({refreshing: false})
            this._onStatusFilter()
            //console.warn(response.data)
        }).catch(err => {
            console.error(err);
        })
        
    }

    componentDidMount()
    {
        this.onRefresh()
    }

    renderItem = ({item}) =>
    {
        const id = item.id
        const type = item.type
        const priority = item.priority
        const asset_id = item.asset_id
        //const asset_type = item.asset_type
        const status = item.status
        const zone_id = item.zone_id
        const note = item.note

        return(
            <TouchableOpacity
                onPress = {() => {this.props.navigation.navigate("ReportDetail", {item: item,ReportScreen: this})}}
            >
                <Card>
                        <View>
                            <View style = {{flexDirection: 'row',}}>
                                <Text style = {{fontSize: 20}}>Type: </Text>
                                <Text style = {{fontSize: 20}}>{type}</Text>
                            </View>
                            <View style = {{flexDirection: 'row',}}>
                                <Text style = {{fontSize: 20}}>Priority: </Text>
                                <Text style = {{fontSize: 20}}>{priority}</Text>
                            </View>
                            <View style = {{flexDirection: 'row',}}>
                                <Text style = {{fontSize: 20}}>Location: </Text>
                                <Text style = {{fontSize: 20}}>{zone_id}</Text>
                            </View>
                            <View style = {{flexDirection: 'row',}}>
                                <Text style = {{fontSize: 20}}>Status: </Text>
                                <Text style = {{fontSize: 20}}>{status}</Text>
                            </View>
                        </View>
                    </Card>
            </TouchableOpacity>
        )
    }

    render()
    {
        const {fileredStatusList} = this.state
        return(
            <View 
              style = {{flex: 1, backgroundColor: 'white'}}
            >
                <Header
                    centerComponent = {{
                        text: 'Report Management', 
                        style: {color: 'white', fontSize: Fonts.size.h5}
                    }}
                    backgroundColor = {Colors.headerBackground}
                />
                <Dropdown 
                    label = 'Status'
                    data = {statusDropdownList}
                    onChangeText = {(value) => {
                        this.setState({currentStatus: value}, 
                        function(){
                            this._onStatusFilter()
                        })
                    }}
                    itemCount = {3}
                    fontSize = {20}
                    containerStyle = {{marginLeft: '4%', marginRight: '4%'}}
                >
                </Dropdown>
                <View style = {{flex: 1}}>
                    {Object.keys(fileredStatusList).length != 0 && 
                        <FlatList
                            data = {fileredStatusList}
                            renderItem = {this.renderItem}
                            keyExtractor = {(item, index) => item.id}
                            refreshing = {this.state.refreshing}
                            onRefresh = {this.onRefresh}
                        />
                    }
                </View>
            </View>
          )
    }
}