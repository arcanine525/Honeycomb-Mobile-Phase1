import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  AsyncStorage,
} from "react-native";
import { withNavigation } from 'react-navigation';

import AnnounceSubmitSuccess from '../../Components/AnnounceSubmitSuccess/AnnounceSubmitSuccess'
import LoadingComponent from '../../Components/LoadingComponent/LoadingComponent'
import axios from "axios";
import { Images, Metrics } from "../../Themes/";

// Styles
import styles from "./AssetReportScreenStyles";

class AssetReportScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      screenNavigate: "",
      isLoading: true,
      refreshing: false,
      data: {},
      reportList: [],
      submitSuccess: false,
    };
  }

  static navigationOptions = ({navigation}) => ({
    title: 'GENERAL INFO',
  });

  componentWillMount = async () =>{
    let user =
        {
            role: await AsyncStorage.getItem('role'),
            username: await AsyncStorage.getItem('username'),
        }
    this.setState({user: user.role})
    const { params } = this.props.navigation.state;
    this.setState({
        screenNavigate: params.screenNavigate
    })
  }

  _getAssetData = async (asset_id) =>{
    this.setState({isLoading: true})
    let res = await axios.get(
      "http://api.honeycomb2.geekup.vn/api/assets/" + asset_id
    );
    res.data.create_date = res.data.create_date.substr(0, 10);
    this.setState({ 
      data: res.data,
      isLoading: false
     });
  }

  _refreshReportList = () => {
    this.setState({refreshing: true})
    axios.get('http://api.honeycomb2.geekup.vn/api/report')
    .then((response)=> {
      this.setState({reportList: response.data})
      this.setState({refreshing: false})
      this.setState({isLoading: false})
    }).catch(err => {
        console.error(err);
      });
  };

  componentDidMount(){
    const { params } = this.props.navigation.state;

    this.setState(
      {data: params ? params.data : this.state.data}, 
      function(){
        this.setState({refreshing: false})
        this.setState({isLoading: false})
      }
    )
  }

  _changeStatusOfSubmitSuccess = () => {
    this.setState({submitSuccess: false})
  }
  

  _updateAssetInfo = (data) => {
    this.setState(
      {data: data},
    )
  }

  render() {
    if (this.state.isLoading) {
      return (
        <LoadingComponent/>
      );
    }
    else{
      return (
        <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
            <View style = {styles.firstViewStyle}>
              <Text style = {styles.assetStyle}>{this.state.data ? this.state.data.name : '--'}</Text>
              <Text style = {[{fontSize: 14, lineHeight: 16, fontWeight: "500", color: '#A5ADAD', letterSpacing: 0.5 }, styles.marginStyle, {marginBottom: Metrics.screenHeight * 0.024, letterSpacing: 0.5}]}>{this.state.data ? this.state.data.id : '--'}</Text>
            </View>
            <View style = {{backgroundColor: '#F8F9F9', height: 1}}></View>
            <View style = {styles.secondViewStyle}>
              <Image
                style = {styles.imageStyle}
                source = {{uri: (this.state.data && this.state.data.image_url) ? this.state.data.image_url[0] : Images.unknown}}>
              </Image>
              <View>
                <Text style = {[styles.titleStyle, {letterSpacing: 1.08}]}>ZONE</Text>
                <TouchableOpacity
                  onPress = {() => {
                    if(this.state.user == 'client'){
                      // this.props.navigation.dispatch({  
                      //   type: 'ReplaceCurrentScreen',
                      //   routeName: 'ZoneReportScreen',
                      //   params: { 
                      //     screenNavigate: "AssetReportScreen", 
                      //     zone_info: this.state.data.zone, 
                      //     updateAssetInfo: this._updateAssetInfo,
                      //     UserHomeScreen: this.props.navigation.state.params.UserHomeScreen
                      //   },
                      // });
                      //this.props.navigation.pop()
                      this.props.navigation.navigate(
                        'ZoneReportScreen', 
                        {
                          screenNavigate: this.props.navigation.screenNavigate == "ZoneListScreen" ? "ZoneListScreen" : "AssetReportScreen", 
                          zone_info: this.state.data.zone, 
                          updateAssetInfo: this._updateAssetInfo,
                          UserHomeScreen: this.props.navigation.state.params.UserHomeScreen
                        }
                      )
                    }
                    else if(this.state.user == 'staff'){
                      // this.props.navigation.dispatch({
                      //   type: 'ReplaceCurrentScreen',
                      //   routeName: 'ZoneTab',
                      //   params: { 
                      //     item: this.state.data.zone, 
                      //     screen: "AssetReportScreen",
                      //     UserHomeScreen: this.props.navigation.state.params.UserHomeScreen
                      //   },
                      // });
                      //this.props.navigation.pop()
                      this.props.navigation.navigate(
                        'ZoneTab', 
                        {
                          item: this.state.data.zone, 
                          screen: "AssetReportScreen",
                          UserHomeScreen: this.props.navigation.state.params.UserHomeScreen
                        }
                      )
                    }
                  }}
                >
                  <Text style = {[styles.zoneStyle, styles.marginStyle]}>{(this.state.data && this.state.data.zone) != null ? this.state.data.zone.name : '--'}</Text>
                </TouchableOpacity>
              </View>
              <View style = {styles.viewStyle}>
                <Text style = {[styles.titleStyle, {letterSpacing: 1.08}]}>STATUS</Text>
                <Text style = {[{lineHeight: 18, fontSize: 16, fontWeight: "500", color:(this.state.data && (this.state.data.status >= 50)) ? '#50C3B8' : '#FF1616'}, styles.marginStyle]}>{this.state.data ? this.state.data.status : '--'}%</Text>
              </View>
              <View style = {styles.viewStyle}>
                <Text style = {[styles.titleStyle, {letterSpacing: 1.08}]}>CATEGORIES</Text>
                <Text style = {[styles.categoryStyle, styles.marginStyle]}>{this.state.data ? this.state.data.category : '--'}</Text>
              </View>
              <View style = {styles.viewStyle}>
                <Text style = {[styles.titleStyle, {letterSpacing: 1.08}]}>PRICE</Text>
                <Text style = {[styles.priceStyle, styles.marginStyle]}>{this.state.data ? this.state.data.price : '--'} VND</Text>
              </View>
              <View style = {styles.viewStyle}>
                <Text style = {[styles.titleStyle, {letterSpacing: 1.08}]}>STORAGE</Text>
                <TouchableOpacity
                  onPress = {() => {
                    if(this.state.data.storage){
                      if(this.state.user == 'client'){
                        //this.props.navigation.pop()
                        this.props.navigation.navigate(
                          'StorageDetailScreen', 
                          {
                            storage_info: this.state.data.storage, 
                            screenNavigate: "AssetReportScreen", 
                            getAssetData: this._getAssetData,
                            UserHomeScreen: this.props.navigation.state.params.UserHomeScreen
                          }
                        )
                      }
                      else if(this.state.user == 'staff'){
                        //this.props.navigation.pop()
                        this.props.navigation.navigate(
                          'StorageTab', 
                          {
                            storage_info: this.state.data.storage,
                            UserHomeScreen: this.props.navigation.state.params.UserHomeScreen
                          }
                        )
                      }
                    }
                  }}
                >
                  <Text style = {[styles.storageStyle, styles.marginStyle]}>{(this.state.data && this.state.data.storage) != null ? this.state.data.storage.name : '--'}</Text>
                </TouchableOpacity>
              </View>
              <View style = {styles.viewStyle}>
                <Text style = {[styles.titleStyle, {letterSpacing: 1.08}]}>DESCRIPTION</Text>
                <Text style = {[styles.descriptionStyle, styles.marginStyle]}>{this.state.data ? this.state.data.note : '--'}</Text>
              </View>
            </View>
          <TouchableOpacity 
            style = {{
              position: 'absolute', 
              width: '100%', 
              height: Metrics.screenHeight * 0.072,
              bottom: 0,
              backgroundColor: '#2EBAAB', 
              justifyContent: 'center',
              alignItems: 'center'}}
            onPress = {() => {
              //alert(JSON.stringify(this.state.data))
              this.props.navigation.navigate("AddAssetReportScreen", {
                screen: "AssetReportScreen",
                component: this
              });
            }}>
              <Text style = {styles.btnSubmitTextStyle}>
                Submit a request
              </Text>
          </TouchableOpacity>
          {this.state.submitSuccess && <AnnounceSubmitSuccess submitSuccess = {this.state.submitSuccess} changeStatusSubmit = {this._changeStatusOfSubmitSuccess}/>}
        </View>
      );
    }
  }
}

export default withNavigation(AssetReportScreen);
