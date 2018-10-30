import React, {Component} from 'react'
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
} from 'react-native'

import PopupDialog from 'react-native-popup-dialog';
import LoadingComponent from '../../Components/LoadingComponent/LoadingComponent'

import {
    Slider,
    Icon,
} from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'

import axios from 'axios'

import { Metrics } from '../../Themes/'
import Images from '../../Themes/Images'
import styles from './MaintainanceCheckScreenStyle'

class RenderItemFlatList extends Component {
    constructor(props){
        super(props)

        this.state = {
            checkStatusIcon: '',
            status: 0
        }
    }

    componentWillMount(){
        //let randomNumber = Math.floor(Math.random() * 2);       
        this.setState({status: this.props.item.status})
        this.setState({
            checkStatusIcon: this.props.item.checked == true ? 'checked' : 'unchecked'},
        )
    }

    componentDidMount(){
        this.props.addToItemList(this)
    }
    
    render(){
        return(
            <View 
                style = {{
                    marginLeft: Metrics.screenWidth * 0.0533, 
                    marginRight: Metrics.screenWidth * 0.0533, 
                    marginTop: Metrics.screenHeight * 0.023, 
                    marginBottom: Metrics.screenHeight * 0.001,
                    backgroundColor: 'white',
                    borderRadius: 3,
                    shadowOffset:{
                      width: 0,
                      height: 3,
                    },
                    elevation: 2,
                }}
            >
                <View style = {{flex: 1}}>
                    <View 
                        style = {{
                            flex: 3, 
                            flexDirection: 'row', 
                            marginTop: Metrics.screenHeight * 0.024, 
                            marginLeft: Metrics.screenWidth * 0.0427, 
                            marginRight: Metrics.screenWidth * 0.0427,
                            alignItems: 'center'
                        }}
                    >
                        <Image
                            source = {this.props.item.image_url != null ? {uri: this.props.item.image_url} : Images.unknown}
                            style = {{width:56, height: 56}}>
                        </Image>
                        <View style = {{marginLeft: Metrics.screenWidth * 0.0427}}>
                            <Text style = {{fontSize: 16, lineHeight: 18, fontWeight: "500", letterSpacing: 0, color: '#274541'}}>{this.props.item.name}</Text>
                            <Text style = {{fontSize: 16, lineHeight: 18, fontWeight: "500", letterSpacing: 0.5, color: '#A5ADAD', marginTop: Metrics.screenHeight * 0.006}}>{this.props.item.id}</Text>
                        </View>
                        <TouchableOpacity 
                            style ={{
                                flex: 1, 
                                position: 'absolute', 
                                right: 0,
                                top: 0,
                            }}
                            onPress = {() => {
                                if(this.state.checkStatusIcon == 'checked'){
                                    this.props.decrease(this.props.index);
                                    this.setState({checkStatusIcon: 'unchecked'})
                                }
                                else{
                                    this.props.increase(this.props.index);
                                    this.setState({checkStatusIcon: 'checked'})
                                }
                            }}
                        >
                            <Image
                                source = {this.state.checkStatusIcon == 'checked' ? Images.check_on : Images.check_off}
                                style = {{width: 32, height: 32}}>

                            </Image>
                        </TouchableOpacity>
                    </View>
                    <View
                        style = {{
                            //flex: 1, 
                            height: Metrics.screenHeight * 0.05, 
                            marginLeft: Metrics.screenWidth * 0.0427, 
                            marginRight: Metrics.screenWidth * 0.0427, 
                        }}
                    >

                        {/* 10% */}
                        {this.state.status == 10 &&
                                <View
                                    style = {{
                                        position: 'absolute', 
                                        bottom: 0, 
                                        left: '6.3%',
                                    }}
                                >
                                    <Image 
                                    source = {Images.percent} 
                                    style = {{
                                        width: 43, 
                                        height: 32,
                                        resizeMode: 'stretch', 
                                        
                                    }}
                                /> 
                                <Text
                                    style = {{
                                        fontSize: 14, 
                                        lineHeight: 16, 
                                        fontWeight: "500", 
                                        position: 'absolute',
                                        color: 'white',
                                        bottom: 10,
                                        left: '18%'
                                    }}
                                >10%</Text>
                                </View>
                            }

                            {/* 20% */}
                            {this.state.status == 20 &&
                                <View
                                    style = {{
                                        position: 'absolute', 
                                        bottom: 0, 
                                        left: '15.75%',
                                    }}
                                >
                                    <Image 
                                    source = {Images.percent} 
                                    style = {{
                                        width: 43, 
                                        height: 32,
                                        resizeMode: 'stretch', 
                                        
                                    }}
                                /> 
                                <Text
                                    style = {{
                                        fontSize: 14, 
                                        lineHeight: 16, 
                                        fontWeight: "500", 
                                        position: 'absolute',
                                        color: 'white',
                                        bottom: 10,
                                        left: '18%'
                                    }}
                                >20%</Text>
                                </View>
                            }

                            {/* 30% */}
                            {this.state.status == 30 &&
                                <View
                                    style = {{
                                        position: 'absolute', 
                                        bottom: 0, 
                                        left: '25.15%',
                                    }}
                                >
                                    <Image 
                                    source = {Images.percent} 
                                    style = {{
                                        width: 43, 
                                        height: 32,
                                        resizeMode: 'stretch', 
                                        
                                    }}
                                /> 
                                <Text
                                    style = {{
                                        fontSize: 14, 
                                        lineHeight: 16, 
                                        fontWeight: "500", 
                                        position: 'absolute',
                                        color: 'white',
                                        bottom: 10,
                                        left: '20.5%'
                                    }}
                                >30%</Text>
                                </View>
                            }

                            {/* 40% */}
                            {this.state.status == 40 &&
                                <View
                                    style = {{
                                        position: 'absolute', 
                                        bottom: 0, 
                                        left: '34.45%',
                                    }}
                                >
                                    <Image 
                                    source = {Images.percent} 
                                    style = {{
                                        width: 43, 
                                        height: 32,
                                        resizeMode: 'stretch', 
                                        
                                    }}
                                /> 
                                <Text
                                    style = {{
                                        fontSize: 14, 
                                        lineHeight: 16, 
                                        fontWeight: "500", 
                                        position: 'absolute',
                                        color: 'white',
                                        bottom: 10,
                                        left: '21%'
                                    }}
                                >40%</Text>
                                </View>
                            }

                            {/* 50% */}
                            {this.state.status == 50 &&
                                <View
                                    style = {{
                                        position: 'absolute', 
                                        bottom: 0, 
                                        left: '43.85%',
                                    }}
                                >
                                    <Image 
                                    source = {Images.percent} 
                                    style = {{
                                        width: 43, 
                                        height: 32,
                                        resizeMode: 'stretch', 
                                        
                                    }}
                                /> 
                                <Text
                                    style = {{
                                        fontSize: 14, 
                                        lineHeight: 16, 
                                        fontWeight: "500", 
                                        position: 'absolute',
                                        color: 'white',
                                        bottom: 10,
                                        left: '20%'
                                    }}
                                >50%</Text>
                                </View>
                            }

                            {/* 60% */}
                            {this.state.status == 60 &&
                                <View
                                    style = {{
                                        position: 'absolute', 
                                        bottom: 0, 
                                        left: '53.35%',
                                    }}
                                >
                                    <Image 
                                    source = {Images.percent} 
                                    style = {{
                                        width: 43, 
                                        height: 32,
                                        resizeMode: 'stretch', 
                                        
                                    }}
                                /> 
                                <Text
                                    style = {{
                                        fontSize: 14, 
                                        lineHeight: 16, 
                                        fontWeight: "500", 
                                        position: 'absolute',
                                        color: 'white',
                                        bottom: 10,
                                        right: '18%'
                                    }}
                                >60%</Text>
                                </View>
                            }

                            {/* 70% */}
                            {this.state.status == 70 &&
                                <View
                                    style = {{
                                        position: 'absolute', 
                                        bottom: 0, 
                                        left: '62.75%',
                                    }}
                                >
                                    <Image 
                                    source = {Images.percent} 
                                    style = {{
                                        width: 43, 
                                        height: 32,
                                        resizeMode: 'stretch', 
                                        
                                    }}
                                /> 
                                <Text
                                    style = {{
                                        fontSize: 14, 
                                        lineHeight: 16, 
                                        fontWeight: "500", 
                                        position: 'absolute',
                                        color: 'white',
                                        bottom: 10,
                                        right: '18%'
                                    }}
                                >70%</Text>
                                </View>
                            }

                            {/* 80% */}
                            {this.state.status == 80 &&
                                <View
                                    style = {{
                                        position: 'absolute', 
                                        bottom: 0, 
                                        left: '72.25%',
                                    }}
                                >
                                    <Image 
                                    source = {Images.percent} 
                                    style = {{
                                        width: 43, 
                                        height: 32,
                                        resizeMode: 'stretch', 
                                        
                                    }}
                                /> 
                                <Text
                                    style = {{
                                        fontSize: 14, 
                                        lineHeight: 16, 
                                        fontWeight: "500", 
                                        position: 'absolute',
                                        color: 'white',
                                        bottom: 10,
                                        right: '18%'
                                    }}
                                >80%</Text>
                                </View>
                            }

                            {/* 90% */}
                            {this.state.status == 90 &&
                                <View
                                    style = {{
                                        position: 'absolute', 
                                        bottom: 0, 
                                        left: '81.7%',
                                    }}
                                >
                                    <Image 
                                    source = {Images.percent} 
                                    style = {{
                                        width: 43, 
                                        height: 32,
                                        resizeMode: 'stretch', 
                                        
                                    }}
                                /> 
                                <Text
                                    style = {{
                                        fontSize: 14, 
                                        lineHeight: 16, 
                                        fontWeight: "500", 
                                        position: 'absolute',
                                        color: 'white',
                                        bottom: 10,
                                        right: '19%'
                                    }}
                                >90%</Text>
                                </View>
                            }
                    </View>
                    <View 
                        style = {{
                            flex: 1, 
                            marginLeft: Metrics.screenWidth * 0.0427, 
                            marginRight: Metrics.screenWidth * 0.0427,
                        }}
                    >
                        <View 
                            style = {{
                                height: Metrics.screenHeight * 0.03,
                                backgroundColor: 'transparent'
                            }}
                        >
                            <Slider
                                style = {{width: '100%', position: 'absolute', top: -8}}
                                trackStyle = {{backgroundColor: '#F0F2F2'}}
                                thumbStyle = {{backgroundColor: '#50C3B8'}}
                                step = {10}
                                animationType = 'spring'
                                thumbTintColor = '#50C3B8'
                                value = {this.state.status}
                                maximumValue = {100}
                                onValueChange = {(value) => {
                                    this.setState(
                                        {status: parseInt(value)},
                                        function(){
                                            this.props.updateStatus(this.props.index, this.state.status)
                                        }
                                    )
                                }}>

                            </Slider>
                        </View>

                        {/* 0% */}
                        {this.state.status != 0 && <View
                            style = {{
                                height: 4, 
                                width: 1, 
                                position: 'absolute', 
                                left: 0, 
                                top: 10, 
                                backgroundColor: 'white'
                            }}
                        />}

                        {/* 10% */}
                        {this.state.status != 10 && <View
                            style = {{
                                height: 4, 
                                width: 1, 
                                position: 'absolute', 
                                left: '10%', 
                                top: 10, 
                                backgroundColor: 'white'
                            }}
                        />}

                        {/* 20% */}
                        {this.state.status != 20 && <View
                            style = {{
                                height: 4, 
                                width: 1, 
                                position: 'absolute', 
                                left: '20%', 
                                top: 10, 
                                backgroundColor: 'white'
                            }}
                        />}

                        {/* 30% */}
                        {this.state.status != 30 && <View
                            style = {{
                                height: 4, 
                                width: 1, 
                                position: 'absolute', 
                                left: '30%', 
                                top: 10, 
                                backgroundColor: 'white'
                            }}
                        />}

                        {/* 40% */}
                        {this.state.status != 40 && <View
                            style = {{
                                height: 4, 
                                width: 1, 
                                position: 'absolute', 
                                left: '40%', 
                                top: 10, 
                                backgroundColor: 'white'
                            }}
                        />}

                        {/* 50% */}
                        {this.state.status != 50 && <View
                            style = {{
                                height: 4, 
                                width: 1, 
                                position: 'absolute', 
                                left: '50%', 
                                top: 10, 
                                backgroundColor: 'white'
                            }}
                        />}

                        {/* 60% */}
                        {this.state.status != 60 && <View
                            style = {{
                                height: 4, 
                                width: 1, 
                                position: 'absolute', 
                                left: '60%', 
                                top: 10, 
                                backgroundColor: 'white'
                            }}
                        />}

                        {/* 70% */}
                        {this.state.status != 70 && <View
                            style = {{
                                height: 4, 
                                width: 1, 
                                position: 'absolute', 
                                left: '70%', 
                                top: 10, 
                                backgroundColor: 'white'
                            }}
                        />}

                        {/* 80% */}
                        {this.state.status != 80 && <View
                            style = {{
                                height: 4, 
                                width: 1, 
                                position: 'absolute', 
                                left: '80%', 
                                top: 10, 
                                backgroundColor: 'white'
                            }}
                        />}

                        {/* 90% */}
                        {this.state.status != 90 && <View
                            style = {{
                                height: 4, 
                                width: 1, 
                                position: 'absolute', 
                                left: '90%', 
                                top: 10, 
                                backgroundColor: 'white'
                            }}
                        />}

                        {/* 100% */}
                        {this.state.status != 100 && <View
                            style = {{
                                height: 4, 
                                width: 1, 
                                position: 'absolute', 
                                left: '100%', 
                                top: 10, 
                                backgroundColor: 'white'
                            }}
                        />}
                        <View
                            style = {{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Text style = {{fontSize: 14, lineHeight: 16, fontWeight: "500", color: '#8C9B99'}}>0</Text>
                            <Text style = {{fontSize: 14, lineHeight: 16, fontWeight: "500", color: '#8C9B99'}}>100</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
  }

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1; //January is 0!
let yyyy = today.getFullYear();

if (dd < 10) {
    dd = "0" + dd;
}

if (mm < 10) {
    mm = "0" + mm;
}

today = dd + "-" + mm + "-" + yyyy;

class MaintainanceCheckScreen extends Component{
    constructor(props){
        super(props)

        this.state = {
            zonePassed: {},
            isLoading: true,
            refreshing: false,
            zoneData: [],
            itemList: [],
            maintenanceID: '',
            totalChecked: 0,
            totalNumber: 0,
        }
    }
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.item.name,
        headerStyle: {
            backgroundColor: "#50C3B8",
            height: Metrics.screenHeight * 0.0899,
            shadowOpacity: 0,
            shadowOffset: {
                height: 0
            },
            shadowRadius: 0,
            elevation: 0
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          flex: 1,
          textAlign: "center",
          fontSize: 16,
          lineHeight: 24,
          fontWeight: "500"
        },
   
        headerLeft: (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack()
              }}
              style={{ marginLeft: Metrics.screenWidth * 0.0427 }}
            >
                <Icon name = 'keyboard-backspace' size = {30} color = 'white' />
            </TouchableOpacity>
        ),

        headerRight: (     
            <TouchableOpacity
              onPress={() => {
                const {params} = navigation.state;
                navigation.navigate(
                    "MonthlyChecking", 
                    {
                        component: params.MaintenanceCheck,
                        zoneData: params.item,
                        assetList: params.assetList,
                    }
                );
              }}
              style={{ width: Metrics.screenWidth * 0.1013 }}
            >
                <Image source={Images.qr} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
        )
            
    })

    componentWillMount = async () =>{
        this.setState(
            {zonePassed: this.props.navigation.state.params.item},
            function(){
                this._refreshAssetList()
            }
        )
    }

    _addToItemList = (item) => {
        this.state.itemList.push(item)
    }

    _createNewMaintenanceCheck = async () =>{
        this.preparingNavigate.show();
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();

        if (dd < 10) {
            dd = "0" + dd;
        }

        if (mm < 10) {
            mm = "0" + mm;
        }

        today = dd + "/" + mm + "/" + yyyy;
        await axios
        .post('http://api.honeycomb2.geekup.vn/api/maintenancecheck', {
            zone_id: this.state.zonePassed.id
        })

        let data = [];
        for(var i = 0;i < this.state.zoneData.length;i ++){
            if(this.state.zoneData[i].checked == true){
                let temp = [];
                temp.push(this.state.zoneData[i].image_url)
                data.push({
                    id: this.state.zoneData[i].id,
                    status: this.state.zoneData[i].status,
                    //image_url: temp
                })
            }
        }

        await axios.put("http://api.honeycomb2.geekup.vn/api/maintenancecheck/scan/" + this.state.zonePassed.id, data)
        let check_id = await axios.get("http://api.honeycomb2.geekup.vn/api/maintenancecheck/complete/" + this.state.zonePassed.id)

        this.preparingNavigate.dismiss()
        this.completeChecking.dismiss()
        this.props.navigation.navigate('MaintenanceResult', {id: check_id.data.maintenance_check_id, date: today})
    }

    _decreaseTotalItemChecked = (index) => {
        this.state.zoneData[index].checked = false
        this.setState(
            {totalChecked: this.state.totalChecked - 1},
        )
    }

    _updateItemStatus = (index, status) => {
        this.state.zoneData[index].status = status;
    }

    _increaseTotalItemChecked = (index) => {
        this.state.zoneData[index].checked = true
        this.setState(
            {totalChecked: this.state.totalChecked + 1},
        )
    }

    _refreshAssetList = async () => {
        this.setState({refreshing: true})
        this.setState({zoneData: []})
        this.setState({totalNumber: 0})
        this.setState({totalChecked: 0})

        let response = await axios.get('http://api.honeycomb2.geekup.vn/api/maintenancecheck/get/' + this.state.zonePassed.id)
        let length = 0;
        let checkedList = [];
        let uncheckedList = [];
        
        if(response.data.message){
           response = await axios.get("http://api.honeycomb2.geekup.vn/api/zones/" + this.state.zonePassed.id + "/assets")
           uncheckedList = response.data.data;

           this.setState({totalNumber: uncheckedList.length})
        }
        else{
            length = response.data.length;
            alert(JSON.stringify(response.data[length - 1]))
            checkedList = response.data[length - 1].checked_list;

            for(var i = 0;i < checkedList.length;i ++){
                this.state.zoneData.push(
                    {
                        image_url: checkedList[i].asset_image ? checkedList[i].asset_image[0] : null,
                        id: checkedList[i].id,
                        name: checkedList[i].name,
                        status: checkedList[i].status,
                        checked: true,
                    }
                )
            }
            this.setState(
                {totalChecked: response.data[length - 1].number_checked_asset},
            )

            uncheckedList = response.data[length - 1].unchecked_list;
            this.setState({totalNumber: response.data[length - 1].number_checked_asset + response.data[length - 1].number_unchecked})
        }

        for(var i = 0;i < uncheckedList.length;i ++){
            this.state.zoneData.push(
                {
                    image_url: uncheckedList[i].image_url ? uncheckedList[i].image_url[0] : null,
                    id: uncheckedList[i].id,
                    name: uncheckedList[i].name,
                    status: uncheckedList[i].status,
                    checked: false,
                }
            )
        }

        this.setState({refreshing: false})
        this.setState({isLoading: false})

        this.props.navigation.setParams({MaintenanceCheck: this})
      }
    
    render(){
        if(this.state.isLoading){
            return(
                <LoadingComponent/>
            );
        }
        else{
            return(
                <View style = {{flex: 1, backgroundColor: '#F8F9F9'}}>
                    <View style = {{
                        flexDirection: 'row', 
                        marginBottom: Metrics.screenHeight * 0.024, 
                        marginTop: Metrics.screenHeight * 0.03, 
                        marginLeft: Metrics.screenWidth * 0.0427
                    }}
                >
                        <Text style = {
                            {
                                fontSize: 20,
                                lineHeight: 24,
                                color: '#274541'
                            }
                        } > Maintenance checks: </Text>
                        < Text style = {
                            {
                                fontSize: 20,
                                lineHeight: 24,
                                fontWeight: "bold",
                                color: '#274541'
                            }
                        } > {
                            today
                        } </Text>
                    </View>
                    <View
                        style = {{
                            flexDirection: 'row',
                            marginLeft: Metrics.screenWidth * 0.0533
                        }}
                    >
                        <Text style = {{fontSize: 13, lineHeight: 15, fontWeight: "bold", letterSpacing: 1.08, color: '#8C9B99'}}>SCANNED ASSETS: </Text>
                        <Text style = {{fontSize: 13, lineHeight: 15, fontWeight: "bold", letterSpacing: 1.08, color: '#212B36'}}>{this.state.totalChecked}/{this.state.totalNumber}</Text>
                    </View>
                    <View style = {{flex: 8, marginBottom: '10%'}}>
                        <FlatList
                            data = {this.state.zoneData}
                            renderItem = {({item, index}) => <RenderItemFlatList 
                                                        item = {item}
                                                        index = {index}
                                                        increase = {this._increaseTotalItemChecked}
                                                        decrease = {this._decreaseTotalItemChecked}
                                                        updateStatus = {this._updateItemStatus}
                                                        addToItemList = {this._addToItemList}
                                                    />
                                        }
                            keyExtractor={item => item.id}
                            refreshing = {this.state.refreshing}
                            onRefresh = {this._refreshAssetList}
                            ListFooterComponent = {() => {
                                return(
                                    <View
                                        style = {{
                                            marginBottom: Metrics.screenHeight * 0.01
                                        }}
                                    >
                                    </View>
                                );
                            }}
                        />
                    </View>
                    <LinearGradient
                        colors={[
                        "rgba(248,248,248,0) 0%",
                        "rgba(250,250,250,0.75)",
                        "rgba(250,250,250,0.82)",
                        "#FFFFFF"
                        ]}
                        start={{ x: 0.5, y: 0.02 }}
                        end={{ x: 0.5, y: 1.0 }}
                        locations={[0, 0.1613879, 0.19907887, 1]}
                        type="linear"
                        style={styles.blurContainer}
                    />
                    <TouchableOpacity
                        style = {{
                            flex: 1, 
                            position: 'absolute',
                            backgroundColor: '#2EBAAB',
                            width: '100%',
                            height: Metrics.screenHeight * 0.072, 
                            bottom: 0,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onPress = {() => {
                            this.completeChecking.show();
                        }}
                    >
                        <Text style = {{fontSize: 16, lineHeight: 24, fontWeight: "500",  color: 'white'}}>Complete Checking</Text>
                    </TouchableOpacity>
                    <PopupDialog
                        ref = {(completeChecking) => {
                            this.completeChecking = completeChecking
                        }}
                        dialogStyle = {{
                            height: Metrics.screenHeight * 0.24,
                            width: Metrics.screenWidth * 0.84, 
                            position: 'absolute', 
                            top: '20%',
                            borderRadius: 3,
                            overflow: 'hidden'
                        }}
                        dismissOnTouchOutside = {false}>
                        <View style = {{flex: 1}}>
                            <View 
                                style = {{
                                    flex: 1, 
                                    flexDirection: 'row', 
                                    backgroundColor: 'white',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: Metrics.screenHeight * 0.036
                                }}
                            >
                                <Text style = {{fontSize: 20, lineHeight: 24, fontWeight: "500", color: '#274542'}}>
                                    Confirmation
                                </Text>
                                <TouchableOpacity 
                                    style = {{
                                        position: 'absolute', 
                                        right: 0
                                    }}
                                    onPress = {() => {
                                        this.completeChecking.dismiss();
                                    }}
                                >
                                    <Icon
                                        name = 'close'
                                        color = 'white'
                                        size = {40}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style = {{
                                    flex: 2, 
                                    backgroundColor: 'white',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: Metrics.screenHeight * 0.015
                                }}
                            >
                                <View
                                    style = {{
                                        flexDirection: 'row'
                                    }}
                                >
                                    <Text style = {
                                        {
                                            fontSize: 14, 
                                            lineHeight: 21,
                                            color: '#274542'
                                        }
                                    }
                                    >
                                        You have checked 
                                    </Text>
                                    <Text> </Text>
                                    <Text style = {
                                            {
                                                fontSize: 14, 
                                                lineHeight: 21,
                                                fontWeight: 'bold',
                                                color: '#274542'
                                            }
                                        }
                                    >
                                     {this.state.totalChecked}/{this.state.totalNumber} assets.
                                    </Text>
                                </View>
                                <Text style = {
                                        {
                                            fontSize: 14, 
                                            lineHeight: 21,
                                            color: '#274542'
                                        }
                                    }
                                >
                                    Are you sure want to complete
                                </Text>
                            </View>
                            <View
                                style = {{
                                    height: 1,
                                    borderWidth: 1,
                                    borderColor: '#F8F8F8',
                                }}
                            >

                            </View>
                            <View 
                                style = {{
                                    flexDirection: 'row',
                                    height: Metrics.screenHeight * 0.0765,
                                    borderColor: '#F8F8F8'
                                }}
                            >
                                <TouchableOpacity 
                                    style = {{
                                        width: '50%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: 'white',
                                    }}
                                    onPress = {() => {
                                        this.completeChecking.dismiss();
                                    }}
                                >
                                    <Text 
                                        style = {{
                                            fontSize: 16,
                                            lineHeight: 19,
                                            letterSpacing: 0, 
                                            color: '#274542',
                                        }}
                                    >
                                        Close
                                    </Text>
                                </TouchableOpacity>
                                <View
                                    style = {{
                                        width: 2,
                                        borderWidth: 1,
                                        borderColor: '#F8F8F8'
                                    }}
                                />
                                <TouchableOpacity 
                                    style = {{
                                        width: '50%',
                                        height: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        position: 'absolute',
                                        right: 0,
                                    }}
                                    onPress = {() => {
                                        this._createNewMaintenanceCheck();
                                    }}
                                >
                                    <Text 
                                        style = {{
                                            fontSize: 16,
                                            lineHeight: 18,
                                            fontWeight: "500",
                                            letterSpacing: 0, 
                                            color: '#2EBAAB'
                                        }}
                                    >
                                        Complete
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </PopupDialog>
                    <PopupDialog
                        ref = {(preparingNavigate) => {
                            this.preparingNavigate = preparingNavigate
                        }}
                        dialogStyle = {{
                            height: Metrics.screenHeight * 0.24,
                            width: Metrics.screenWidth * 0.84, 
                            position: 'absolute', 
                            top: '20%',
                            borderRadius: 3,
                            overflow: 'hidden'
                        }}
                        dismissOnTouchOutside = {false}>
                            <LoadingComponent/>
                    </PopupDialog>
                </View>
            );
        }
    }
}

export default MaintainanceCheckScreen;