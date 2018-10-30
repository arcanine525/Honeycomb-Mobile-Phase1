import React, { Component } from 'react'
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    Alert,
    Button
} from 'react-native'
import styles from './ZoneScreenStyle'
import { Header, Card, Icon } from 'react-native-elements'
import axios from 'axios'
import {Dropdown} from 'react-native-material-dropdown';
import {Colors, Fonts} from '../../Themes/'

var floorDropDownList = [{
    "value":"None"
}];

export default class ZoneContainer extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            data : [],
            filteredList: [],
            onFilter: false,
            tempData: [],
            index: 0,
            mess: '',
            refreshing: false,
        }
        
    }
    
           

    createFloorDropDown(inputData){
        var length = inputData.length
        for(var i = 0; i<length; i++){
            var currentFloor = inputData[i].Floor;
            if(this.checkFloor(currentFloor)){
                floorDropDownList.push({"value": currentFloor});
            }
        }
        
    }

    checkFloor(currentFloor){
        for(var i = 0; i<floorDropDownList.length; i++){
            if(floorDropDownList[i].value == currentFloor){
                return false;
            }
        }
        return true;
    }

    onFilterChange = async (selectedFloor) => {
        
        if(selectedFloor != "None"){
            this.setState({filteredList: []});
            var tmp = [];
            for(var i = 0; i<this.state.data.length; i++){
                if(this.state.data[i].Floor == selectedFloor){
                    tmp.push(this.state.data[i]);
                }
            }
            this.setState({filteredList: tmp, onFilter: true});
        }else{
            this.setState({onFilter: false})
        }
    }

    onRefresh = () =>
    {
        this.setState({refreshing: true, data: [], tempData: [], filteredList: []})
        axios.get('http://34.201.49.123:8080/api/getzones')
       .then((response) => {
           this.setState({data: response.data})
           //console.log("In data", this.state.data)
           this.setState({filteredList: response.data});
           this.createFloorDropDown(response.data);
           //console.log("Data" , response)
               for(var i = 0; i <= 19; i++)
               {
                   if(this.state.data[i] == null)
                   {
                       this.setState({index: i})
                       break
                   }
                   if(i == 19)
                   {
                      this.setState({index: 19})
                   }
                   this.state.tempData.push(this.state.data[i])
               }
            this.setState({refreshing: false})
           //console.log("In tempdata", this.state.tempData)
        })
    }

    componentDidMount()
    {
        this.onRefresh()
    }

    _onAscendingButtonPress=(low, hight)=>{
        Alert.alert('Ascendeing Sort');
    }

    _onDescendingButtonPress=()=>{
        Alert.alert('Descending Sort');
    }

    _onButtonAddPress=()=>{
        this.setState({isButtonAddPressed: true});
        this.props.navigation.navigate('Add New Zone')
    }

    onLoadMore = () =>
    {
        const {index,tempData,data} = this.state
        if(!this.state.onFilter)
        {
            for(var i = index; i<= index+20; i++)
            {
                if(data[i] == null)
                {
                    this.setState({index: index + i})
                    break
                }
                if(i == 19)
                {
                    this.setState({index: index + 20})
                }
                this.state.tempData.push(this.state.data[i])
            }
        }
    }


    renderItem = ({item}) =>
    {
        const Name = item.Name
        const Floor = item.Floor
        const ID = item.ID
            return(
                <TouchableOpacity
                    onPress = {() => {
                        this.props.navigation.navigate(
                            'Zone Detail', 
                            {
                                ZoneScreen: this,
                                Name: Name, 
                                Floor: Floor, 
                                ID: ID
                            }
                        )
                    }}
                >
                    <Card>
                        <View>
                            <View style = {{flexDirection: 'row',}}>
                                <Text style = {{fontSize: 20}}>Name: </Text>
                                <Text style = {{fontSize: 20}}>{Name}</Text>
                            </View>
                            <View style = {{flexDirection: 'row',}}>
                                <Text style = {{fontSize: 20}}>Floor: </Text>
                                <Text style = {{fontSize: 20}}>{Floor}</Text>
                            </View>
                        </View>
                    </Card>
                </TouchableOpacity>
            )
    }

    render()
    {
        const {data, tempData, index} = this.state
            return(
                <View style = {styles.container}>
                    <Header
                        centerComponent = {{text: 'Zone Management', style: {color: 'white', fontSize: Fonts.size.h5}}}
                        backgroundColor = {Colors.headerBackground}
                    />
                    <View style = {{
                        flexDirection : 'row'
                    }}>
                        <View
                            style={{
                                width: 300,
                                marginLeft: 15,
                                marginRight: 15
                            }}
                        >
                            <Dropdown 
                                label='Floor'
                                data={floorDropDownList}
                                onChangeText = {(selectedFloor)=>this.onFilterChange(selectedFloor)}
                            />  
                        </View>
                        <TouchableOpacity
                            onPress = {this._onAscendingButtonPress}
                        >
                            <View style = {{
                                marginTop: 30,
                                marginRight: 15,
                            }}>
                                <Icon name='arrow-downward' />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress = {this._onDescendingButtonPress}
                        >
                            <View style = {{
                                marginTop:30,
                                marginRight: 15,
                            }}>
                                <Icon name='arrow-upward' />
                            </View>
                        </TouchableOpacity>
                    </View> 
                    {Object.keys(this.state.data).length != 0 && 
                    <View style = {{flex: 1}}>
                        <FlatList
                            data={this.state.onFilter ? this.state.filteredList : tempData}
                            //data={this.state.data}
                            renderItem={this.renderItem}
                            keyExtractor = {(item, index) => item.ID}
                            onEndReached = {this.onLoadMore}
                            onEndReachedThreshold = {1}
                            refreshing = {this.state.refreshing}
                            onRefresh = {this.onRefresh}
                        />
                        
                    </View>}
                    <View style={styles.buttonAddNewZoneContainer}>
                            <TouchableOpacity
                                //onPress = {()=>this.props.navigation.navigate('Add New Zone')}
                                onPress = {this._onButtonAddPress}
                            >
                                <Image
                                    source = {require('../../../Assets/Images/add.png')}
                                    style={{width:60, height: 60}}
                                />
                            </TouchableOpacity>
                        </View>
                </View>
            )
    }
}