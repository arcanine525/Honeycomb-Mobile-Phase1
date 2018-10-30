import React, { Component } from 'react'
import {
    View, 
    Text, 
    TouchableOpacity, 
    Image,
    Keyboard,
    StatusBar,
    TextInput,
    ScrollView,
    Alert
} from 'react-native';
import Modal from 'react-native-modal'
import {RNCamera} from 'react-native-camera'; 
import {Icon, Slider} from 'react-native-elements';
import PopupDialog from 'react-native-popup-dialog';
import LoadingComponent from '../../Components/LoadingComponent/LoadingComponent'
import axios from 'axios';
import styles from './MonthlyCheckingStyle';
import Images from '../../Themes/Images'

import { Metrics } from '../../Themes/'


class AssetView extends Component {
    constructor(props){
        super(props)

        this.state = {
            status: -1,
        }
    }

    _createNewMaintenanceCheck = async () =>{
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
        await axios
        .post('http://api.honeycomb2.geekup.vn/api/maintenancecheck', {
            zone_id: this.props.zone.id
        })
    }

    componentWillMount(){
        //this.props.switchView()
        //this.setState({status: this.props.data.status})
    }

    render(){
        if(this.props.isLoading){
            return (
                <View
                    style = {{
                        position: 'absolute',
                        bottom: 0,
                        height: Metrics.screenHeight * 0.328, 
                        width: Metrics.screenWidth, 
                    }}
                >
                    <LoadingComponent/>
                </View>
            );
        }
        else{
            return (
                <View
                    style = {{
                        position: 'absolute',
                        bottom: 0,
                        height: Metrics.screenHeight * 0.328, 
                        width: Metrics.screenWidth, 
                        backgroundColor: 'white'
                    }}
                >
                    <View style ={{
                        flexDirection: 'row', 
                        height: Metrics.screenHeight * 0.126, 
                        width: Metrics.screenWidth * 0.8934, 
                        backgroundColor: 'white',
                        marginTop: Metrics.screenHeight * 0.03,
                        marginLeft: Metrics.screenWidth * 0.0533,
                        }}
                    >
                        <Image 
                            source = {this.props.data.image_url.length > 0 ? {uri: this.props.data.image_url[0]} : Images.unknown}
                            style = {{width: 58, height: 58, resizeMode: 'stretch'}}/>
                        <View style = {{flex: 1, flexDirection: 'row'}}>
                            <View style = {{width: '100%'}}>
                                <Text style = {{fontSize: 16, lineHeight: 18, fontWeight: "500", color: '#274541'}}>     {this.props.data.name}</Text>
                                <Text style = {{fontSize: 14, lineHeight: 16, fontWeight: "500", color: '#A5ADAD', marginTop: Metrics.screenHeight * 0.006}}>     {this.props.data.id}</Text>
                                <View
                                    style = {{
                                        flexDirection: 'row'
                                    }}
                                >
                                    <Text style = {{fontSize: 14, lineHeight: 16, color: '#A5ADAD', marginTop: Metrics.screenHeight * 0.006}}>     {this.props.data.zone_name}</Text>
                                    <Text style = {{fontSize: 14, lineHeight: 16, color: '#FF1616', marginTop: Metrics.screenHeight * 0.006}}>{this.props.data.right_place == false ? ' - Wrong place' : ''}</Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                style = {{
                                    position: 'absolute', 
                                    right: 0, 
                                    top: 0,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}  
                                onPress = {async () => {
                                    this.props.btnMoveUp(true)
                                    var index = this.props.assetIsExist(this.props.data)

                                    if(index == -1 && this.props.data.right_place == true){
                                        this.props.switchView(false)
                                        Alert.alert(
                                            "Duplicate",
                                            "You scanned this asset before !",
                                            [{text: 'OK', onPress: () => {
                                                      this.props.switchView(true)
                                                  }}],
                                            {cancelable: false}
                                        )
                                    }
                                    else{
                                        if(index == -1){
                                            this.props.addWrongItemToData(this.props.data, this.state.status)
                                        }
                                        else{
                                           this.props.increaseTotalChecked(index, this.state.status)
                                            let data = [];
                                            data.push(
                                                {
                                                    id: this.props.data.id,
                                                    status: this.props.data.status
                                                }   
                                            )
                                            this.setState({status: -1})
                                            if(this.props.maintenanceIsCreated == false){
                                                this.props.createNewMaintenance()
                                                this._createNewMaintenanceCheck()
                                            } 
                                        }
                                        
                                    }
                                    this.props.showCompleteView()
                                }}
                            >
                                <Image source = {Images.check_off} style = {{width: 34, height: 34, resizeMode: 'stretch'}}/>
                            </TouchableOpacity> 
                        </View>

                        {/* 10% */}
                        {this.state.status == 10 &&
                            <View
                                style = {{
                                    position: 'absolute', 
                                    bottom: 0, 
                                    left: '6.5%',
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
                                    left: '16%',
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
                                    left: '25.5%',
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
                                    left: '35%',
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
                                    left: '44.5%',
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
                                    left: '54%',
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
                                    left: '63.5%',
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
                                    left: '73%',
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
                                    left: '82.5%',
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
                    <View style = {{
                        marginLeft: Metrics.screenWidth * 0.0533,
                        height: Metrics.screenHeight * 0.05,
                        width: Metrics.screenWidth * 0.8934, 
                        backgroundColor: 'white',
                        }}
                    >
                        <Slider
                            trackStyle = {{backgroundColor: '#F0F2F2'}}
                            thumbStyle = {{backgroundColor: '#50C3B8'}}
                            style = {{bottom: Metrics.screenHeight * 0.01, width: '100%'}}
                            thumbTintColor = '#50C3B8'
                            step = {10}
                            animationType = 'spring'
                            value = {this.props.data.status}
                            maximumValue = {100}
                            onValueChange = {(value) => {
                                this.setState(
                                    {status: parseInt(value)},
                                    function(){
                                        var index = this.props.assetIsExist(this.props.data)

                                        if(index == -1 && this.props.data.right_place == true){
                                            this.props.switchView(false)
                                            Alert.alert(
                                                "Duplicate",
                                                "You scanned this asset before !",
                                                [{text: 'OK', onPress: () => {
                                                        this.props.switchView(true)
                                                    }}],
                                                {cancelable: false}
                                            )
                                        }
                                        else{
                                            if(index != -1){
                                                this.props.updateStatus(this.state.status, index)
                                            }
                                        }
                                        
                                    }
                                )
                            }}>
                        </Slider>

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
                        < View style = {
                                {
                                    position: 'absolute',
                                    bottom: 0,
                                    width: '100%',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    backgroundColor: 'transparent'
                                }
                            }
                        >
                            <Text style = {{
                                fontSize: 14, 
                                lineHeight: 16, 
                                fontWeight: "500", 
                                color: '#8C9B99'
                            }}>0%</Text>
                            <Text style = {{
                                fontSize: 14, 
                                lineHeight: 16, 
                                fontWeight: "500", 
                                color: '#8C9B99'
                            }}>100%</Text>
                        </View>
                    </View>
                </View>
            );
        }
    }
}

class CompleteView extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <View
                style = {{
                    position: 'absolute',
                    bottom: 0,
                    height: Metrics.screenHeight * 0.328, 
                    width: Metrics.screenWidth, 
                    backgroundColor: 'white'
                }}
            >
                <View
                    style = {{
                        height: Metrics.screenHeight * 0.0525,
                        width: '100%',
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        alignItems: 'flex-end',
                        marginLeft: Metrics.screenWidth * 0.0533,
                    }}
                >
                    <Text style = {{
                        fontSize: 13, 
                        lineHeight: 15, 
                        fontWeight: "bold", 
                        color: '#8C9B99', 
                        letterSpacing: 1.08,
                    }}>SCANNED ASSETS: </Text>
                    <Text style = {{
                        fontSize: 13, 
                        lineHeight: 15, 
                        fontWeight: "bold", 
                        color: '#727272', 
                        letterSpacing: 1.08,
                    }}>{this.props.totalChecked}/{this.props.totalasset}</Text>
                </View>
                <View
                    style = {{
                        //flex: 2,
                        height: Metrics.screenHeight * 0.1274,
                        width: Metrics.screenWidth,
                        backgroundColor: 'white',
                    }}
                >
                    <ScrollView
                        horizontal = {true}
                    >
                        {
                            this.props.assetList != null && this.props.assetList.map((item, index) => (
                                <View
                                    style = {{
                                        width: Metrics.screenWidth * 0.136 + 4,
                                        height: Metrics.screenHeight * 0.0765 + 4,
                                        marginBottom: Metrics.screenHeight * 0.0172,
                                        marginTop: Metrics.screenHeight * 0.0172,
                                        marginLeft: Metrics.screenWidth * 0.04,
                                    }}
                                >
                                    <View
                                        style = {{
                                            borderWidth: 1,
                                            borderRadius: 3,
                                            borderColor: '#F8F9F9',
                                            width: Metrics.screenWidth * 0.136,
                                            height: Metrics.screenHeight * 0.0765,
                                        }}
                                    >
                                        <Image 
                                            source = {item.image_url ? {uri: item.image_url} : Images.unknown}
                                            style = {{
                                                width: Metrics.screenWidth * 0.136 - 1,
                                                height: Metrics.screenHeight * 0.0765 - 1,
                                                resizeMode: 'stretch',
                                            }}
                                        />
                                    </View>
                                    <Image
                                        source = {item.checked == true ? Images.check_on : null}
                                        style = {{
                                            position: 'absolute',
                                            bottom: 0,
                                            right: 0,
                                            width: 16,
                                            height: 16,
                                            resizeMode: 'stretch'
                                        }}
                                    />
                                </View>
                            ))
                        }
                    </ScrollView>
                </View>
                <TouchableOpacity
                    style = {{
                        height: Metrics.screenHeight * 0.072, 
                        width: Metrics.screenWidth,
                        backgroundColor: '#2EBAAB'
                    }}
                    onPress = {() => {
                        this.props.completeChecking.show();
                    }}
                >
                    <Text style = {{
                        color: 'white', 
                        fontSize: 16, 
                        lineHeight: 24, 
                        fontWeight: "bold", 
                        textAlign: 'center',
                        textAlignVertical: 'center', 
                        marginTop: Metrics.screenHeight * 0.016, 
                    }}>Complete scan</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

class MonthlyCheckingScreen extends Component{
    constructor(props){
        super(props)

        this.state = {
            inputCode: '',
            showAssetView: false,
            showCompleteView: false,
            visibleModal: false,
            hideContent: false,
            newMaintenanceIsCreated: false,
            qrStarted: false,
            isLoading: false,
            isReporting: true,
            btnMoveUp: false,
            zoneData: {},
            data: {},
            zone: {},
            date: '',
        }
    }

    static navigationOptions = ({navigation}) => ({
        header: null
    })

    componentWillMount(){
        const {params} = this.props.navigation.state;
        this.setState({zoneData: params.zoneData})

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
        this.setState({date: today})
    }

    _createNewMaintenanceCheck = () =>{
        this.setState({newMaintenanceIsCreated: true})
    }

    _alertIncorrectQRCode(){
        Alert.alert(
          "Invalid",
          "Please enter the ID of asset or zone",
          [{text: 'OK', onPress: () => {
                    this.setState({isReporting: true})
                }}],
          {cancelable: false}
        )
    }

    _assetIsExist = (target) => {
        var tempAssetList = this.props.navigation.state.params.component.state.zoneData
        var index = -1;
        for(var i = 0;i < tempAssetList.length;i ++){
            if(target.id == tempAssetList[i].id && tempAssetList[i].checked == false){
                index = i
                return index;
            }
        }

        return index
    }

    _getDataForMonthlyChecking = async (asset_id) => {
        if(this.state.isReporting == true && asset_id.charAt(0) == 'A'){
            this.setState({qrStarted: true})

            this.setState({isLoading: true})
            this._showAssetView()

            this.setState({isReporting: false})
            let res = await axios
            .get("http://api.honeycomb2.geekup.vn/api/maintenancecheck/place/" + this.state.zoneData.id + "/" + asset_id)

            if(res){
                this.setState(
                    {
                        data: res.data,
                        zone: res.data.zone,
                        isReporting: true
                    },
                )
            }
            else
                this._alertIncorrectQRCode()
            this.setState({isLoading: false})
        }
    }

    _moveButtonUp = () => {
        this.setState({btnMoveUp: true})
    }

    _updateItemStatus = (status, index) => {
        const { component } = this.props.navigation.state.params
        this.state.data.status = status;
        component.state.zoneData[index].status = status
        component.state.itemList[index].setState({status: status})
    }

    _addWrongItemToData = (data, status) =>{
        let result = {
            id: data.id,
            image_url: data.image_url ? data.image_url[0] : null,
            name: data.name,
            status: status,
            checked: true
        }
        const { component } = this.props.navigation.state.params
        component.state.zoneData.push(result)
        component.setState({totalNumber: component.state.totalNumber + 1})
        component.setState({totalChecked: component.state.totalChecked + 1})
    }

    _switchView = (mode) => {
        this.setState({isReporting: mode})
    }

    _showCompleteView = () => {
        this.setState({showCompleteView: true})
        this.setState({showAssetView: false})
    }

    _showAssetView = () => {
        this.setState({showAssetView: true})
        this.setState({showCompleteView: false})
    }

    _getButtonInputcode = (btnMoveUp) => {
        if(btnMoveUp == true){
            return styles.btnInputCodeMoveUp
        }
        else{
            if (this.state.hideContent == false)
                return styles.btnInputCode
            else if (this.state.hideContent == true)
                return styles.btnTransparent
        }
    }

    _increaseTotalItemChecked = (index, status) => {
        const { component } = this.props.navigation.state.params
        component.state.zoneData[index].checked = true
        component.state.itemList[index].setState({checkStatusIcon: 'checked'})
        component.state.itemList[index].status =  status
        component.setState({totalChecked: component.state.totalChecked + 1})
    }

    render(){
        return(
            <View style={styles.container}>
				<StatusBar
					backgroundColor="rgba(1,1,1,0.6)"
					barStyle="light-content">
				</StatusBar>
				<RNCamera
					ref={(ref) => {
						this.camera = ref;
					}}
					style={styles.preview}
					type={RNCamera.Constants.Type.back}
					flashMode={RNCamera.Constants.FlashMode.on}
					permissionDialogTitle={'Permission to use camera'}
					permissionDialogMessage={'We need your permission to use your camera phone'}
					onBarCodeRead={(data) => {
                        this._getDataForMonthlyChecking(data.data);
					}}
					barCodeTypes={[ RNCamera.Constants.BarCodeType.qr ]}
				>
					<View style={styles.topOutter}>
                        <View style = {{marginBottom: Metrics.screenHeight * 0.03}}>
                            <Text style = {{color: 'white', textAlign: 'center', fontSize: 14}}>
                                Maintenance checks
                            </Text>
                            <Text style = {{color: 'white', textAlign: 'center', letterSpacing: 0.8, fontSize: 18, lineHeight: 24, fontWeight: "bold"}}>
                                {this.state.date}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style = {{
                                position: 'absolute', 
                                bottom: Metrics.screenHeight* 0.084, 
                                right: Metrics.screenWidth * 0.0668, 
                            }}
                            onPress = {() => {
                                this.props.navigation.goBack()
                            }}
                        >
                            <Image source = {Images.close_circle_outline} style = {{resizeMode: 'stretch', width: 31, height: 31}}/>
                        </TouchableOpacity>
                    </View>
					<View style = {{
							width: '100%',
							height: Metrics.screenWidth * 0.7334 + 1, 
							backgroundColor: 'transparent', 
							flexDirection: 'row',
							marginTop: -0.06
						}}
					>
						<View style={this.state.hideContent == false ? styles.leftOutter : {flex: 1, backgroundColor: 'rgba(1,1,1,0.6)'}}></View>
						<View style={this.state.hideContent == false ? styles.rightOutter : null}></View>
					</View>
					<View style={styles.bottomOutter}>
						{!this.state.qrStarted && <Text style={styles.guideArea}>
							{this.state.hideContent == false ? 'Move the code scan to the QR code area to scan' : ''}
						</Text>}
						<TouchableOpacity
							style={this._getButtonInputcode(this.state.btnMoveUp)}
							onPress={() => {
								this.setState({ isReporting: false })
								this.setState({visibleModal: true})
                                this.setState({hideContent: true})
                                this.setState({showCompleteView: false})
                                this.setState({showAssetView: false})
							}}
						>
							<Text style={{ fontSize: 20, color: 'white', backgroundColor: 'transparent', fontFamily: "Roboto-Regular", }}>
								{this.state.hideContent == false ? "I can't scan QR code" : ''}
							</Text>
						</TouchableOpacity>
                        {this.state.showAssetView && <AssetView
                            data = {this.state.data} 
                            zone = {this.state.zone} 
                            updateStatus = {this._updateItemStatus} 
                            isLoading = {this.state.isLoading}
                            maintenanceIsCreated = {this.state.newMaintenanceIsCreated}
                            createNewMaintenance = {this._createNewMaintenanceCheck}
                            btnMoveUp = {this._moveButtonUp}
                            showCompleteView = {this._showCompleteView}
                            assetIsExist = {this._assetIsExist}
                            switchView = {this._switchView}
                            increaseTotalChecked = {this._increaseTotalItemChecked}
                            addWrongItemToData = {this._addWrongItemToData}
                        />}
                        {this.state.showCompleteView && 
                            <CompleteView 
                                completeChecking = {this.completeChecking}
                                totalChecked = {this.props.navigation.state.params.component.state.totalChecked}
                                totalasset = {this.props.navigation.state.params.component.state.totalNumber}
                                assetList = {this.props.navigation.state.params.component.state.zoneData}
                            /> 
                        }
					</View>
				</RNCamera>
				<View
					style = {{
						position: 'absolute',
						alignSelf: 'center',
						backgroundColor: 'transparent',
						marginTop: Metrics.screenHeight * 0.1665 - 3,
						width: Metrics.screenWidth * 0.7334 + 6,
						height: Metrics.screenWidth * 0.7334 + 7,
					}} 
				>
					<View style = {this.state.hideContent == false ? styles.leftTop : styles.transparentLine}>
						<View style = {styles.verticalLeftLine}></View>
						<View style = {styles.topLine}></View>
					</View>
					<View style = {this.state.hideContent == false ? styles.rightTop : styles.transparentLine}>
						<View style = {styles.verticalRightLine}></View>
						<View style = {styles.topLine}></View>
					</View>
					<View style = {this.state.hideContent == false ? styles.leftBottom : styles.transparentLine}>
						<View style = {styles.verticalLeftLine}></View>
						<View style = {styles.bottomLine}></View>
					</View>
					<View style = {this.state.hideContent == false ? styles.rightBottom : styles.transparentLine}>
						<View style = {styles.verticalRightLine}></View>
						<View style = {styles.bottomLine}></View>
					</View>
				</View>
				<Modal
					avoidKeyboard = {true}
					animationIn = 'fadeIn'
            		animationOut = 'fadeOut'
					isVisible = {this.state.visibleModal}
					onBackdropPress = {() => {
						this.setState({ isReporting: true })
						this.setState({visibleModal: false})
						this.setState({hideContent: false})
						Keyboard.dismiss();
					}}
					onBackButtonPress = {() => {
						this.setState({ isReporting: true })
						this.setState({visibleModal: false})
						this.setState({hideContent: false})
						Keyboard.dismiss();
					}}
					>
					<View style={{
						flex: 0,
						position: 'absolute',
						alignSelf: 'center',
						top: '34.18%',
						bottom: Metrics.screenHeight * 0.3343,
						height: Metrics.screenHeight * 0.2939,
						width: Metrics.screenWidth * 0.84,
						borderRadius: 3,
						backgroundColor: 'white'
					}}>
						<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
							<Text
								style={{
									marginTop: Metrics.screenHeight * 0.03,
									fontSize: 24,
									fontWeight: "500",
									alignItems: 'center',
									color: '#274542'
								}}
							>	
								Input code
							</Text>
						</View>
						<TextInput
							autoFocus = {true}
							clearTextOnFocus={true}
							underlineColorAndroid='transparent'
							placeholder = 'Input code to access the asset or zone'
							maxLength={20}
							onChangeText={(value) => {
								this.setState({ inputCode: value });
							}}
							style={{
								fontSize: 16,
								paddingLeft: Metrics.screenWidth * 0.0427,
								alignSelf: 'center',
								height: Metrics.screenHeight * 0.072,
								width: Metrics.screenWidth * 0.7333,
								marginBottom: Metrics.screenHeight * 0.03,
								borderRadius: 3,
								borderWidth: 1,
								borderColor: '#F0F2F2'
							}}
						/>
						<TouchableOpacity
							onPress = {() => {
								Keyboard.dismiss();
								this.setState({hideContent: false})
								this.setState({ isReporting: true }, function() {
                                    this._getDataForMonthlyChecking(this.state.inputCode)     
								});
								this.setState({visibleModal: false})
							}}
							style = {{
								height: Metrics.screenHeight * 0.072,
								width: Metrics.screenWidth * 0.7333,
								alignSelf: 'center',
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor: '#2EBAAB',
								borderRadius: 3,
								marginBottom: Metrics.screenHeight * 0.03,
							}}>
								<Text style = {{fontSize: 24, fontWeight: 'bold', fontFamily: "Roboto-Regular", color: 'white'}}>
									Submit
								</Text>
						</TouchableOpacity>
					</View>
				</Modal>
                <PopupDialog
                    ref = {(completeChecking) => {
                        this.completeChecking = completeChecking
                    }}
                    dialogStyle = {{
                        height: Metrics.screenHeight * 0.24,
                        width: Metrics.screenWidth * 0.84, 
                        position: 'absolute', 
                        top: Metrics.screenHeight * 0.3688,
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
                                    {this.props.navigation.state.params.component.state.totalChecked}/{this.props.navigation.state.params.component.state.totalNumber} assets.
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
                                //flex: 2, 
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
                                onPress = {async () => {
                                    this.completeChecking.dismiss();
                                    this.preparingNavigate.show();
                                    let temp = this.props.navigation.state.params.component.state.zoneData
                                    let data = []

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

                                    for(var i = 0;i < temp.length;i ++){
                                        if(temp[i].checked == true){
                                            data.push({
                                                id: temp[i].id,
                                                status: temp[i].status,
                                                //image_url: temp
                                            })
                                        }
                                    }

                                    await axios.put("http://api.honeycomb2.geekup.vn/api/maintenancecheck/scan/" + this.state.zoneData.id, data)
                                    let check_id = await axios.get("http://api.honeycomb2.geekup.vn/api/maintenancecheck/complete/" + this.state.zoneData.id)
                                    this.preparingNavigate.dismiss()
                                    this.completeChecking.dismiss()
                                    this.props.navigation.navigate('MaintenanceResult', {id: check_id.data.maintenance_check_id, date: today})
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
                        top: Metrics.screenHeight * 0.3688,
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

export default MonthlyCheckingScreen;