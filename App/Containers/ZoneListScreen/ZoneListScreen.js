// Nguyễn Hồ Quốc Thịnh
import React, { Component } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  Image,
  RefreshControl,
  ScrollView,
  Alert
} from "react-native";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent";
import { Card, Icon } from "react-native-elements";
import axios from "axios";
import { Metrics, Images } from "../../Themes";
import styles from "./ZoneListScreenStyle";

const _width = Metrics.screenWidth;
const _height = Metrics.screenHeight;

export default class ZoneListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.navigation.state.params.user,
      isLoading: true,
      data: [],
      searchingData: [],
      searchSuccess: false,
      onSearching: false,
      zoneName: [],
      refreshing: false,
      // New state
      searchData: "",
      roleManager: false,
      totalZone: 0,
      refreshing: false,
      user: {},
      images: [],
      haveImage: false,
      index: -1
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Zones",
    headerStyle: {
      backgroundColor: "#50C3B8",
      height: Metrics.screenHeight * 0.0899,
      elevation: 0,
      shadowOpacity: 0
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      flex: 1,
      textAlign: "center"
    },
    headerLeft: (
      <TouchableOpacity
        onPress={() => {
          navigation.openDrawer();
        }}
        style={{ marginLeft: 19 }}
      >
        <Icon name="menu" size={30} color="white" />
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity
        onPress={() => {
          if (navigation.state.params.screenNavigate == "UserHomeScreen") {
            navigation.state.params.UserHomeScreen._unlockScanQR();
            //navigation.state.params.UserHomeScreen._unlockScanQR();
          }
          //console.warn(navigation)
          navigation.navigate("QRScreen", { flag: false });
        }}
        style={{
          width: Metrics.screenWidth * 0.064,
          height: _height * 0.0319,
          marginRight: 16
        }}
      >
        {navigation.state.params.openQR && (
          <Image
            source={Images.qr}
            style={{
              width: null,
              height: null,
              flex: 1,
              resizeMode: "stretch"
            }}
          />
        )}
      </TouchableOpacity>
    )
  });

  _refreshReportList = async () => {
    this.setState({ refreshing: true });
    let res;
    try {
      res = await axios.get("http://api.honeycomb2.geekup.vn/api/zones");
    } catch (e) {
      Alert.alert("Oops...", "There is something wrong, please try again", [
        {
          text: "Try again",
          onPress: () => {
            this._refreshReportList();
          }
        }
      ]);
    }
    this.setState({ data: res.data });
    this.setState({ searchingData: res.data });
    this.setState({ totalZone: res.data.length });
    this.setState({ refreshing: false });
    this.setState({ isLoading: false });
  };

  componentDidMount() {
    this._refreshReportList();
  }

  componentWillMount = async () => {
    let user = {
      role: "",
      username: ""
    };
    user.role = await AsyncStorage.getItem("role");
    user.username = await AsyncStorage.getItem("username");
    if (user.role == "staff") {
      this.setState({ roleManager: true });
      this.props.navigation.setParams({ openQR: false });
    } else {
      this.props.navigation.setParams({ openQR: true });
    }
    this.setState({ user: user });
  };

  _navigateToZoneReport(item) {
    var zone_info = item;
    this.props.navigation.navigate("ZoneReportScreen", {
      screenNavigate: "ZoneListScreen",
      zone_info
    });
  }

  renderItem = ({ item }) => {
    const name = item.name;
    const totalAssets = item.totalasset;
    const totalRequest = item.request.new + item.request.inprogress;
    let request;
    if (totalRequest > 0) {
      request = true;
    } else {
      request = false;
    }
    let haveImage = false;
    if (item.image_url.length != 0) {
      haveImage = true;
    }
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          if (this.state.roleManager) {
            this.props.navigation.navigate("ZoneTab", {
              item: item,
              screen: "ZoneListScreen"
            });
          } else {
            this._navigateToZoneReport(item);
          }
        }}
      >
        <View style={styles.zoneAvatarContainer}>
          {haveImage && (
            <Image
              source={{ uri: item.image_url[0] }}
              style={[
                styles.image2,
                {
                  overflow: "hidden",
                  borderTopLeftRadius: 3,
                  borderTopRightRadius: 3
                }
              ]}
            />
          )}
          {!haveImage && (
            <Image
              source={Images.zone_pic1}
              style={[
                styles.image2,
                {
                  overflow: "hidden",
                  borderTopLeftRadius: 3,
                  borderTopRightRadius: 3
                }
              ]}
            />
          )}
        </View>
        <Text numberOfLines={1} ellipsizeMode={"tail"} style={styles.zoneName}>
          {name}
        </Text>
        <Text style={styles.totalAsset}>{totalAssets} asset(s)</Text>
        {this.state.roleManager && (
          <View style={styles.otherContainer1}>
            <View
              style={{
                marginTop: _height * 0.0117,
                width: 12,
                height: 10.29
              }}
            >
              <Image
                source={request ? Images.request_3x : Images.non_request_3x}
                style={styles.image}
              />
            </View>
            <Text
              style={request ? styles.requests_text : styles.non_requests_text}
            >
              {totalRequest} new request(s)
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  onSearching(key) {
    if (key == "") {
      this.setState({ searchingData: this.state.data });
    } else {
      this.setState({ onSearching: true });
      this.setState({ searchingData: [] });
      let x = [];
      for (let i = 0; i < this.state.data.length; i++) {
        let currentZoneName = this.state.data[i].name.toLowerCase();
        let tmp = key.toLowerCase();

        if (currentZoneName.includes(tmp)) {
          x.push(this.state.data[i]);
        }
      }
      this.setState({ searchingData: x });
      this.setState({ onSearching: false });
    }
  }

  render() {
    let refreshing = this.state.refreshing;
    if (this.state.isLoading) {
      return <LoadingComponent />;
    } else {
      return (
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._refreshReportList}
            />
          }
        >
          <View style={styles.searchBarContainer}>
            <View style={styles.searchIconContainer}>
              <Image source={Images.search_icon_3x} style={styles.image} />
            </View>
            <TextInput
              style={styles.searchText}
              underlineColorAndroid="transparent"
              placeholder="Search"
              onChangeText={data => this.onSearching(data)}
            />
          </View>
          <View style={styles.allZoneContainer}>
            <Text style={styles.totalZoneText}>
              {this.state.searchingData.length > 1 ? `${this.state.searchingData.length} ZONES` : `${this.state.searchingData.length} ZONE`}
            </Text>
            <FlatList
              style={{
                marginTop: _height * 0.0159,
                marginBottom: _height * 0.0492
              }}
              numColumns={2}
              data={this.state.searchingData}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => item.id}
            />
          </View>
        </ScrollView>
      );
    }
  }
}
