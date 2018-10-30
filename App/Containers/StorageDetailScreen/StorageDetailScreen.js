import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  TextInput,
  Alert,
  Animated,
  AsyncStorage
} from "react-native";
import { Icon } from "react-native-elements";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent";
import axios from "axios";
import { Metrics, Images } from "../../Themes/";
import Swiper from "react-native-swiper";
import styles from "./StorageDetailScreenStyles";

HEADER_MAX_HEIGHT = 0.2476 * Metrics.screenHeight;
HEADER_MIN_HEIGHT = 0.0969 * Metrics.screenHeight;
STORAGE_INFO_MAX_HEIGHT = 0.2086 * Metrics.screenHeight;
STORAGE_INFO_MIN_HEIGHT = 0.0548 * Metrics.screenHeight;

class StorageDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      storage_info: "",
      storage_data: [],
      loading: true,
      refreshing: false
      //user: this.props.navigation.state.params.user
    };
  }
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  _getData = async () => {
    const { params } = this.props.navigation.state;
    let storage_info = params.storage_info;
    this.setState({ refreshing: true });
    //console.warn(storage_info);
    let res = await axios.get(
      "http://api.honeycomb2.geekup.vn/api/storage/" +
        storage_info.id +
        "/assets"
    );
    this.setState({
      storage_info: storage_info,
      storage_data: res.data,
      loading: false,
      refreshing: false
    });
  };

  _getAssetData = async asset_id => {
    this.setState({ isLoading: true });
    let res = await axios.get(
      "http://api.honeycomb2.geekup.vn/api/assets/" + asset_id
    );
    res.data.create_date = res.data.create_date.substr(0, 10);
    this.setState({
      data: res.data,
      isLoading: false
    });
  };

  _renderAssetItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (
            this.props.navigation.state.params.screenNavigate ==
            "AssetReportScreen"
          ) {
            this.props.navigation.state.params.updateAssetInfo(item);
          }

          this.props.navigation.navigate(
            "AssetReportScreen", 
            {
              screenNavigate: params.screenNavigate == "ZoneListScreen" ? "ZoneListScreen" : "ZoneReportScreen",
              data: item,
              user: this.state.user,
              UserHomeScreen: params.UserHomeScreen
            }
          )
        }}
        style={styles.cardStyle}
      >
        <View style={styles.topWrapper}>
          <Image source={{ uri: item.image_url[0] }} style={styles.asset_pic} />
          <View
            style={{
              // flexDirection: "column",
              // marginTop: 0.0375 * Metrics.screenHeight,
              marginLeft: 0.0427 * Metrics.screenWidth
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Roboto-Regular",
                fontWeight: "500",
                color: "#274541"
              }}
            >
              {item.name}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Roboto-Regular",
                color: "#A5ADAD"
              }}
            >
              ID: {item.id}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              position: "absolute",
              right: Metrics.screenWidth * 0.064,
              top: "1.05%"
            }}
            onPress={() => {
              this.props.navigation.navigate("AssetReportScreen", {
                screenNavigate: "AssetScreen",
                data: item
              });
            }}
          >
            <Image
              style={styles.reportImageStyle}
              source={Images.report_flag}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: "#F8F8F8",
            height: 1,
            width: "100%"
          }}
        />
        <View style={styles.bottomWrapper}>
          <Text style={styles.categoryStyle}>{item.category}</Text>
          <Text
            style={[
              styles.statusStyle,
              { color: item.status < 50 ? "#FF1616" : "#50C3B8" }
            ]}
          >
            {item.status}%
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  componentDidMount() {
    this._getData();
  }

  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: "clamp"
    });

    const storage_info_margin = this.state.scrollY.interpolate({
      inputRange: [0, STORAGE_INFO_MAX_HEIGHT - STORAGE_INFO_MIN_HEIGHT],
      outputRange: [STORAGE_INFO_MAX_HEIGHT, STORAGE_INFO_MIN_HEIGHT],
      extrapolate: "clamp"
    });
    const top_margin = this.state.scrollY.interpolate({
      inputRange: [0, (ZONE_INFO_MAX_HEIGHT - ZONE_INFO_MIN_HEIGHT) * 2],
      outputRange: [0, -0.13 * Metrics.screenHeight],
      extrapolate: "clamp"
    });

    if (this.state.loading) {
      return <LoadingComponent />;
    } else {
      return (
        <View style={styles.container}>
          {/*HEADER*/}
          <Animated.View
            style={{ width: Metrics.screenWidth, marginTop: top_margin }}
          >
            <Image
              style={{ width: Metrics.screenWidth, height: HEADER_MAX_HEIGHT }}
              source={{ uri: this.state.storage_info.image_url[0] }}
            />

            <View
              style={{
                marginLeft: 0.0533 * Metrics.screenWidth,
                marginRight: 0.0533 * Metrics.screenWidth,
                alignItems: "flex-start",
                borderRadius: 3,
                backgroundColor: "#FFFFFF",
                // position: "absolute",
                paddingRight: 0.0427 * Metrics.screenWidth,
                paddingLeft: 0.0427 * Metrics.screenWidth,
                paddingBottom: 0.0105 * Metrics.screenHeight,
                marginTop: -0.04 * Metrics.screenHeight
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  marginTop: 0.0169 * Metrics.screenHeight,
                  fontFamily: "Roboto-Regular",
                  color: "#274541",
                  lineHeight: 22
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Roboto-Regular",
                    fontWeight: "bold",
                    color: "#274541",
                    lineHeight: 22
                  }}
                >
                  {this.state.storage_info.name}
                </Text>
              </Text>
              <Text
                style={{
                  // marginTop: 0.0042 * Metrics.screenHeight,
                  fontSize: 14,
                  fontFamily: "Roboto-Regular",
                  color: "#A5ADAD",
                  lineHeight: 16
                }}
              >
                ID: {this.state.storage_info.id}
              </Text>
              <Text
                style={{
                  marginTop: 0.02 * Metrics.screenHeight,
                  // marginBottom: 0.02 * Metrics.screenHeight,
                  fontSize: 14,
                  fontFamily: "Roboto-Regular",
                  color: "#8C9B99",
                  lineHeight: 16
                }}
              >
                {this.state.storage_info.note == ""
                  ? "--"
                  : this.state.storage_info.note}
              </Text>
            </View>
          </Animated.View>
          {/*HEADER BACK BUTTON */}
          <View
            style={{
              position: "absolute",
              top: 0.02 * Metrics.screenHeight,
              width: Metrics.screenWidth,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <TouchableOpacity
              style={{ marginLeft: 14, width: 28, height: 28 }}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Icon name="keyboard-backspace" color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const { params } = this.props.navigation.state
                if (params.screenNavigate == "UserHomeScreen"
                  || params.screenNavigate == "ZoneReportScreen"
                  || params.screenNavigate == "AssetReportScreen") {
                  //params.UserHomeScreen._unlockScanQR();
                  //params.UserHomeScreen._turnOnCamera();
                }
  
                this.props.navigation.navigate("QRScreen", { flag: false });
              }}
              style={{
                width: Metrics.screenWidth * 0.1013
              }}
            >
              <Image source={Images.qr} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 0.03 * Metrics.screenHeight }}>
            <Text
              style={{
                fontSize: 13,
                letterSpacing: 1,
                lineHeight: 15,
                fontWeight: "bold",
                color: "#CCCFCE",
                marginTop: 0.02 * Metrics.screenHeight,
                marginLeft: Metrics.screenWidth * 0.0533
              }}
            >
              {this.state.storage_data.length > 1
                ? this.state.storage_data.length + " ASSETS"
                : this.state.storage_data.length + " ASSET"}
            </Text>
            <FlatList
              data={this.state.storage_data}
              keyExtractor={item => item._id}
              onEndReachedThreshold={0.5}
              renderItem={this._renderAssetItem}
              scrollEventThrottle={16}
              refreshing={this.state.refreshing}
              onRefresh={this._getData}
              // style={{ marginBottom: 0.0717 * Metrics.screenHeight }}
              // onScroll={Animated.event([
              //   {
              //     nativeEvent: {
              //       contentOffset: { y: this.state.scrollY }
              //     }
              //   }
              // ])}
            />
          </View>
        </View>
      );
    }
  }
}
export default StorageDetailScreen;
