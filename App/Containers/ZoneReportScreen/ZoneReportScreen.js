import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  TextInput,
  Alert,
  Animated
} from "react-native";
import { Icon, Avatar } from "react-native-elements";
import axios from "axios";
import { Images, Metrics } from "../../Themes/";
import Swiper from "react-native-swiper";
import Modal from "react-native-modal";
import { ScrollableTabView } from "@valdio/react-native-scrollable-tabview";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent";
import LinearGradient from "react-native-linear-gradient";
import AnnounceSubmitSuccess from "../../Components/AnnounceSubmitSuccess/AnnounceSubmitSuccess";
import { NavigationActions, StackActions } from "react-navigation";
// Styles
import styles from "./ZoneReportScreenStyles";

HEADER_MAX_HEIGHT = 0.2476 * Metrics.screenHeight;
HEADER_MIN_HEIGHT = 0.0969 * Metrics.screenHeight;
ZONE_INFO_MAX_HEIGHT = 0.2086 * Metrics.screenHeight;
ZONE_INFO_MIN_HEIGHT = 0.0548 * Metrics.screenHeight;

///FOR MODAL
class ItemFlatList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: this.props.category,
      isChosen: false,
      color: "#274541",
      fontWeight: "normal"
    };
  }

  componentWillMount() {
    this.setState({ isChosen: this.props.isChosen }, function() {
      this._setColor();
      this._setFontWeight();
    });
  }

  _changeAppearance = () => {
    this.setState({ isChosen: !this.state.isChosen }, function() {
      this._setColor();
      this._setFontWeight();
      this.props.setChosenIndex(this.props.index, this.state.isChosen);
    });
  };

  _getImage() {
    if (this.state.isChosen == true) {
      return Images.checked_modal;
    }

    return null;
  }

  _getBackgroundColor() {
    if (this.state.isChosen == true) {
      return "#F8F9F9";
    } else return "white";
  }

  _setColor() {
    if (this.state.isChosen == true) this.setState({ color: "#2EBAAB" });
    else this.setState({ color: "#274541" });
  }

  _setFontWeight() {
    if (this.state.isChosen == true) this.setState({ fontWeight: "500" });
    else this.setState({ fontWeight: "normal" });
  }

  componentDidMount() {
    this.props.addToIgnoreList(this);
  }

  render() {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: "row",
          height: Metrics.screenHeight * 0.0765,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: this._getBackgroundColor()
        }}
        onPress={() => {
          this._changeAppearance();
        }}
      >
        <Text
          style={{
            fontSize: 19,
            fontWeight: this.state.fontWeight,
            fontFamily: "Roboto-Regular",
            color: this.state.color,
            marginLeft: Metrics.screenWidth * 0.0533
          }}
        >
          {this.state.category}
        </Text>
        <Image
          source={this._getImage()}
          style={{
            width: 20,
            height: 20,
            marginRight: Metrics.screenWidth * 0.048,
            resizeMode: "stretch"
          }}
        />
      </TouchableOpacity>
    );
  }
}
///MAIN COMPONENT

class ZoneReportScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.navigation.state.params.user,
      zone_info: "",
      number_report: "",
      number_request: "",
      number_asset: "",
      data: [],
      loading: true,
      searchingData: [],
      searchSuccess: false,
      onSearching: false,
      refreshing: false,
      submitSuccess: false, // This variable created by Quoc Thinh
      request_data: [],
      storage_data: [],
      scrollY: new Animated.Value(0),
      visibleModal: false,
      chooseList: [],
      categoryList: [],
      // swiperWidth: "99%",
      ignoreList: []
    };
  }

  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  _changeStatusOfSubmitSuccess = () => {
    this.setState({ submitSuccess: false });
  };

  _getData = async () => {
    const { params } = this.props.navigation.state;

    let zone_id = params.zone_info.id;
    this.setState({ refreshing: true });
    let assets;
    let res;
    let storage;
    let categoryList;
    try {
      assets = await axios.get(
        "http://api.honeycomb2.geekup.vn/api/zones/" + zone_id + "/assets"
      );

      res = await axios.get(
        "http://api.honeycomb2.geekup.vn/api/zones/" + zone_id + "/report"
      );

      storage = await axios.get(
        "http://api.honeycomb2.geekup.vn/api/zones/" + zone_id + "/storage"
      );
      categoryList = await axios.get(
        "http://api.honeycomb2.geekup.vn/api/assets/category"
      );
    } catch (error) {
      Alert.alert("Error: " + error);
    }

    this.setState({
      number_report: res.data.length,
      request_data: res.data,
      number_asset: assets.data.quantity,
      data: assets.data.data,
      searchingData: assets.data.data,
      storage_data: storage.data,
      categoryList: categoryList.data.category,
      loading: false
    });
    this.setState({ refreshing: false });
  };

  _toggleModal = () =>
    this.setState({ visibleModal: !this.state.visibleModal });

  _initialChooseList = () => {
    //this.setState({chooseList: []})
    for (var i = 0; i < this.state.categoryList.length; i++) {
      this.state.chooseList.push(true);
    }
  };

  _setChosenIndex = (index, isChosen) => {
    this.state.chooseList[index] = isChosen;
    //alert(this.state.chooseList[index])
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
  ///FOR FILLTER CATEGORY
  _initialChooseList = () => {
    //this.setState({chooseList: []})
    for (var i = 0; i < this.state.categoryList.length; i++) {
      this.state.chooseList.push(true);
    }
  };
  _getCategoryList = () => {
    let list = this.state.searchingData;
    let tempData = [];
    let existed = false;
    for (var i = 0; i < list.length; i++) {
      for (var j = 0; j < tempData.length; j++) {
        if (tempData[j] == list[i].category) {
          existed = true;
          break;
        }
      }
      if (existed == false) {
        tempData.push(list[i].category);
      } else existed = false;
    }
    this.setState({ categoryList: tempData });
  };

  _addItemToIgnoreList = component => {
    this.state.ignoreList.push(component);
  };

  _ignoreAll = () => {
    for (var i = 0; i < this.state.ignoreList.length; i++) {
      this.state.ignoreList[i].setState({ isChosen: false });
      this.state.ignoreList[i].setState({ color: "#274541" });
      this.state.ignoreList[i].setState({ fontWeight: "normal" });
    }
  };

  _filterData = () => {
    let tempList = this.state.ignoreList;
    let target = [];

    for (var i = 0; i < tempList.length; i++) {
      if (tempList[i].state.isChosen == true) {
        target.push(tempList[i].state.category);
      }
    }

    let tempData = this.state.data;
    let result = [];
    if (target.length > 0) {
      for (var i = 0; i < tempData.length; i++) {
        for (var j = 0; j < target.length; j++) {
          if (tempData[i].category == target[j]) {
            result.push(tempData[i]);
            break;
          }
        }
      }
      this.setState({ searchingData: result });
    } else this.setState({ searchingData: [] });
    this._ignoreAll();
    this.setState({ visibleModal: false });
  };

  componentWillMount = async () => {
    // const { params } = this.props.navigation.state;
    // this.setState({ zone_id: params.zone_info.id });

    categoryList = await axios.get(
      "http://api.honeycomb2.geekup.vn/api/assets/category"
    );

    this.setState({ categoryList: categoryList.data.category }, function() {
      this._initialChooseList();
    });
   // this._initialChooseList();
    // this.props.navigation.dispatch(
    //   StackActions.replace({
    //     routeName: "ZoneReportScreen",
    //     params: this.props.navigation.state.params
    //   })
    // );
  };

  componentDidMount() {
    const { params } = this.props.navigation.state;
    this._getData();
    // this._getZoneInfo(zone_id);
    this.setState({ zone_info: params.zone_info });
  }

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
          this.props.navigation.navigate("AssetReportScreen", {
            screenNavigate: this.props.navigation.state.params.screenNavigate == "ZoneListScreen" ? "ZoneListScreen" : "AssetScreen",
            data: item,
            user: this.state.user
          });
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

  _getRequestNote(item) {
    if (item.note_text == "") {return "--"}
     else{
      return item.note_text;
    }
    
  }
  _pickPriorityImage(priority) {
    switch (priority) {
      case "MUST":
        return Images.must;
      case "SHOULD":
        return Images.should;
    }
    return null;
  }

  _pickPriorityImageSize(priority) {
    switch (priority) {
      case "MUST":
        return styles.priorityMustStyle;
      case "SHOULD":
        return styles.priorityShouldStyle;
    }
    return null;
  }

  _pickStatusStyle(status) {
    switch (status) {
      case "NEW":
        return styles.statusNewStyle;

      case "IN-PROGRESS":
        return styles.statusInProgressStyle;
    }
    return null;
  }

  _pickStatusImage(status) {
    switch (status) {
      case "NEW":
        return Images.new;
      case "IN-PROGRESS":
        return Images.in_progress;
    }
    return null;
  }

  _renderRequestItem = ({ item }) => {
    const fullnotes = item.note.map(this._getRequestNote);
    const send_date = item.send_date.substr(0, 10);
    const priority = item.priority;
    //PASS TO HISTORY
    const report = item;
    const type = item.type;
    const day = report.send_date.substring(8, 10);
    const month = report.send_date.substring(5, 7);
    const year = report.send_date.substring(0, 4);
    const date = `${day}/${month}/${year}`;
    let sender = report.sender.replace("_", " ")
    if (priority) {
      return (
        <TouchableOpacity
          onPress={() => {
            let param = {
              report: report,
              name: item.zone_name,
              date: date,
              history: true
            };
            this.props.navigation.navigate("UserReportDetailScreen", {
              item: param
            });
          }}
          style={{
            marginLeft: 0.0533 * Metrics.screenWidth,
            marginRight: 0.0533 * Metrics.screenWidth,
            backgroundColor: "white",
            marginTop: 0.0169 * Metrics.screenHeight,
            alignItems: "flex-start",
            shadowOpacity: 1,
            shadowOffset: {
              height: 5
            },
            shadowRadius: 5,
            elevation: 1
          }}
        >
          <View
            style={{
              flexDirection: "row",
             alignItems: 'center',
              //justifyContent: 'center',
              marginTop: 0.0133 * Metrics.screenHeight,
              paddingLeft: 0.0427 * Metrics.screenWidth,
              paddingRight: 0.0427 * Metrics.screenWidth,
              width: "100%"
              //backgroundColor: "red"
            }}
          >
            <Avatar
              small
              rounded
              title = {sender.charAt(0)}
            />
            <Text
              style={{
               // marginTop: 0.0053 * Metrics.screenHeight,
               // marginBottom: 0.0053 * Metrics.screenHeight,
                marginLeft: 0.0213 * Metrics.screenWidth,
                color: "#A5ADAD",
                fontFamily: "Roboto-Regular",
                fontSize: 14,
                lineHeight: 16
              }}
            >
              {sender}
            </Text>

            <Image
              source={this._pickPriorityImage(priority)}
              style={this._pickPriorityImageSize(priority)}
            />
          </View>

          <View
            style={{
              marginTop: 0.0133 * Metrics.screenHeight,
              backgroundColor: "#F8F8F8",
              // backgroundColor: "red",
              height: 1,
              width: "100%"
            }}
          />

          <Text
            numberOfLines={1}
            ellipsizeMode={"tail"}
            style={{
              marginTop: 0.0212 * Metrics.screenHeight,
              marginLeft: 0.0427 * Metrics.screenWidth,
              color: "#274541",
              fontFamily: "Roboto-Regular",
              fontSize: 16,
              fontWeight: "500",
              lineHeight: 24
            }}
          >
            {item.type.join(" | ")}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode={"tail"}
            style={{
              marginTop: 0.0106 * Metrics.screenHeight,
              marginLeft: 0.0427 * Metrics.screenWidth,
              marginRight: 0.0427 * Metrics.screenWidth,
              color: "#A5ADAD",
              fontFamily: "Roboto-Regular",
              fontSize: 14
              //lineHeight: 16
            }}
          >
            {fullnotes.join(" | ")}
          </Text>
          <View
            style={{
              marginTop: 0.0212 * Metrics.screenHeight,
              backgroundColor: "#F8F8F8",
              // backgroundColor: "red",
              height: 1,
              width: "100%"
            }}
          />
          <View
            style={{
              marginTop: 0.0146 * Metrics.screenHeight,
              marginBottom: 0.0146 * Metrics.screenHeight,
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Text
              style={{
                marginLeft: 0.0427 * Metrics.screenWidth,
                color: "#CCCFCE",
                fontFamily: "Roboto-Regular",
                fontSize: 14
                //lineHeight: 16
              }}
            >
              {date}
            </Text>

            <Image
              source={this._pickStatusImage(item.status)}
              style={this._pickStatusStyle(item.status)}
            />
          </View>
        </TouchableOpacity>
      );
    }
  };

  _rendeStorageItem = ({ item }) => {
    let number_asset_text;
    if (item.totalasset > 1) {
      number_asset_text = item.totalasset + " assets";
    } else {
      number_asset_text = item.totalasset + " asset";
    }
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("StorageDetailScreen", {
            screenNavigate: this.props.navigation.state.params.screenNavigate == "ZoneListScreen" ? "ZoneListScreen" : "ZoneReportScreen",
            storage_info: item,
            UserHomeScreen: this.props.navigation.state.params.UserHomeScreen
          });
        }}
        style={{
          marginLeft: 0.0533 * Metrics.screenWidth,
          marginRight: 0.0533 * Metrics.screenWidth,
          backgroundColor: "white",
          marginTop: 0.0169 * Metrics.screenHeight,
          alignItems: "flex-start",
          shadowOpacity: 1,
          shadowOffset: {
            height: 5
          },
          shadowRadius: 5,
          elevation: 1
        }}
      >
        <View
          style={{
            marginTop: 0.024 * Metrics.screenHeight,
            marginBottom: 0.024 * Metrics.screenHeight,
            marginLeft: 0.0427 * Metrics.screenWidth,
            width: "100%",
            flexDirection: "row"
          }}
        >
          <Image
            source={{ uri: item.image_url[0] }}
            style={{
              height: 72,
              width: 72,
              borderRadius: 3,
              resizeMode: "stretch"
            }}
          />
          <View
            style={{
              marginLeft: 0.032 * Metrics.screenWidth,
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                color: "#274541",
                fontFamily: "Roboto-Regular",
                fontSize: 16,
                fontWeight: "500",
                lineHeight: 18
              }}
            >
              {item.name}
            </Text>
            <Text
              style={{
                color: "#A5ADAD",
                fontFamily: "Roboto-Regular",
                fontSize: 14,
                fontWeight: "500",
                letterSpacing: 0.5,
                lineHeight: 16
              }}
            >
              {item.id}
            </Text>
            <Text
              style={{
                color: "#A5ADAD",
                fontFamily: "Roboto-Regular",
                fontSize: 14,
                lineHeight: 16
              }}
            >
              {number_asset_text}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    // const headerHeight = this.state.scrollY.interpolate({
    //   inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    //   outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    //   extrapolate: "clamp"
    // });

    // const zone_info_margin = this.state.scrollY.interpolate({
    //   inputRange: [0, ZONE_INFO_MAX_HEIGHT - ZONE_INFO_MIN_HEIGHT],
    //   outputRange: [ZONE_INFO_MAX_HEIGHT, ZONE_INFO_MIN_HEIGHT],
    //   extrapolate: "clamp"
    // });

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
            <View
              style={{
                width: Metrics.screenWidth,
                height: HEADER_MAX_HEIGHT
              }}
            >
              <Swiper showsButtons={false} activeDotColor={"#FFFFFF"}>
                <View style={styles.image}>
                  <Image
                    style={styles.zone_pic}
                    source={{
                      uri: this.state.zone_info.image_url[0]
                    }}
                  />
                </View>
                <View style={styles.image}>
                  <Image style={styles.zone_pic} source={Images.zone_pic1} />
                </View>

                <View style={styles.image}>
                  <Image style={styles.zone_pic} source={Images.zone_pic2} />
                </View>
              </Swiper>
            </View>
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
                //top: 0.2086 * Metrics.screenHeight
                //top: -zone_info_margin
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
                  {this.state.zone_info.name}
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
                ID: {this.state.zone_info.id}
              </Text>
              <View
                style={{
                  marginTop: 0.0084 * Metrics.screenHeight,
                  backgroundColor: "#F8F8F8",
                  // backgroundColor: "red",
                  height: 1,
                  width: "100%"
                }}
              />
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
                {this.state.zone_info.note == ""
                  ? "--"
                  : this.state.zone_info.note}
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
                if (
                  this.props.navigation.state.params.screenNavigate ==
                  "UserHomeScreen"
                ) {
                  this.props.navigation.state.params.UserHomeScreen._unlockScanQR();
                  this.props.navigation.state.params.UserHomeScreen._turnOnCamera();
                }
                this.props.navigation.goBack();
              }}
            >
              <Icon name="keyboard-backspace" color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const { params } = this.props.navigation.state
 
                //this.props.navigation.pop()
                if (params.screenNavigate == "UserHomeScreen"
                  || params.screenNavigate == "AssetReportScreen") {
                  //params.UserHomeScreen._unlockScanQR();
                  //params.UserHomeScreen._turnOnCamera();
                }
                this.props.navigation.navigate("QRScreen", { flag: false });
                // this.props.navigation.dispatch({
                //   type: 'ReplaceCurrentScreen',
                //   routeName: 'HomeScreen',
                //   params: { 
                //     params: {flag: false} 
                //   },
                // });
              }}
              style={{
                width: Metrics.screenWidth * 0.1013
              }}
            >
              <Image source={Images.qr} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
          </View>
          {/*TAB VIEW*/}
          <ScrollableTabView
            tabBarTextStyle={{
              fontFamily: "Roboto-Regular",
              //color: "#2EBAAB",
              fontSize: 13,
              fontWeight: "500",
              letterSpacing: 1,
              lineHeight: 16
            }}
            tabBarUnderlineStyle={{ backgroundColor: "#2EBAAB" }}
            style={{
              marginTop: 15,
              marginBottom: 0.018 * Metrics.screenHeight
            }}
            tabBarActiveTextColor={"#2EBAAB"}
            tabBarInactiveTextColor={"#A5ADAD"}
          >
            <View tabLabel="ASSETS" style={{ flex: 1 }}>
              {/*ASSETS TAB*/}
              <View style={styles.searchAndFilterWrapper}>
                <View style={styles.searchWrapper}>
                  <Image source={Images.search_icon} />
                  <View
                    style={{
                      marginLeft: 0.0263 * Metrics.screenWidth,
                      flex: 1
                    }}
                  >
                    <TextInput
                      style={{
                        padding: 0,
                        color: "#CCCFCE",
                        fontSize: 14,
                        fontFamily: "Roboto-Regular",
                        lineHeight: 16
                      }}
                      underlineColorAndroid="transparent"
                      placeholder="Search"
                      onChangeText={key => {
                        this.onSearching(key);
                      }}
                    />
                  </View>
                </View>
                <View style={{ flex: 1 }} />
                <TouchableOpacity
                  style={styles.filterWrapper}
                  onPress={this._toggleModal}
                >
                  <View
                    style={{
                      marginLeft: 0.0263 * Metrics.screenWidth,
                      flex: 1
                    }}
                  >
                    <Text
                      style={{
                        padding: 0,
                        color: "#CCCFCE",
                        fontSize: 14,
                        fontFamily: "Roboto-Regular",
                        lineHeight: 16
                      }}
                      //placeholder="Category"
                      onChangeText={key => {
                        this.onSearching(key);
                      }}
                    >
                      Category
                    </Text>
                  </View>
                  <Image
                    source={Images.filter}
                    style={{ width: 15, height: 15 }}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.totalAssetStyle}>
                {Object.keys(this.state.searchingData).length} ASSETS
              </Text>

              <FlatList
                data={this.state.searchingData}
                keyExtractor={item => item.id}
                onEndReachedThreshold={0.5}
                renderItem={this._renderAssetItem}
                scrollEventThrottle={16}
                refreshing={this.state.refreshing}
                onRefresh={this._getData}
                // style={{ marginBottom: 0.0717 * Metrics.screenHeight }}
                onScroll={Animated.event([
                  {
                    nativeEvent: {
                      contentOffset: { y: this.state.scrollY }
                    }
                  }
                ])}
              />
            </View>

            <View style={{ flex: 1 }} tabLabel="REQUESTS">
              <FlatList
                data={this.state.request_data}
                keyExtractor={item => item._id}
                onEndReachedThreshold={0.5}
                renderItem={this._renderRequestItem}
                scrollEventThrottle={48}
                //style={{ marginBottom: 0.0717 * Metrics.screenHeight }}
                onScroll={Animated.event([
                  {
                    nativeEvent: {
                      contentOffset: { y: this.state.scrollY }
                    }
                  }
                ])}
              />
            </View>
            <View style={{ flex: 1 }} tabLabel="STORAGES">
              <Text
                style={{
                  fontSize: 13,
                  letterSpacing: 1,
                  lineHeight: 15,
                  fontWeight: "bold",
                  color: "#CCCFCE",
                  marginTop: 0.03 * Metrics.screenHeight,
                  marginLeft: Metrics.screenWidth * 0.0533
                }}
              >
                {this.state.storage_data.length > 1
                  ? this.state.storage_data.length + " STORAGES"
                  : this.state.storage_data.length + " STORAGE"}
              </Text>
              <FlatList
                data={this.state.storage_data}
                keyExtractor={item => item._id}
                onEndReachedThreshold={0.5}
                renderItem={this._rendeStorageItem}
                scrollEventThrottle={48}
                // style={{ marginBottom: 0.0717 * Metrics.screenHeight }}
                onScroll={Animated.event([
                  {
                    nativeEvent: {
                      contentOffset: { y: this.state.scrollY }
                    }
                  }
                ])}
              />
            </View>
          </ScrollableTabView>
          <Modal
            isVisible={this.state.visibleModal}
            onBackdropPress={this._toggleModal}
            animationIn="slideInRight"
            animationOut="slideOutRight"
            style={{
              margin: 0,
              marginLeft: 0.1493 * Metrics.screenWidth,
              height: Metrics.screenHeight
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "white"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text style={styles.searchCategoryStyle}>SEARCH CATEGORY</Text>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ visibleModal: false });
                  }}
                >
                  <Image
                    source={Images.close_modal}
                    style={styles.closeModalStyle}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  marginLeft: 0.0533 * Metrics.screenWidth,
                  marginTop: Metrics.screenHeight * 0.0265
                }}
                onPress={() => {
                  this._ignoreAll();
                }}
              >
                <Image
                  source={Images.reset}
                  style={{ width: 20, height: 20, resizeMode: "stretch" }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Roboto-Regular",
                    fontWeight: "500",
                    color: "#2EBAAB",
                    marginLeft: Metrics.screenWidth * 0.0258
                  }}
                >
                  Reset
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flex: 10,
                  //marginLeft: 0.0533 * Metrics.screenWidth,
                  marginTop: Metrics.screenHeight * 0.025
                }}
              >
                <FlatList
                  data={this.state.categoryList}
                  renderItem={({ item, index }) => (
                    <ItemFlatList
                      index={index}
                      category={item}
                      addToIgnoreList={this._addItemToIgnoreList}
                      isChosen={this.state.chooseList[index]}
                      setChosenIndex={this._setChosenIndex}
                    />
                  )}
                  //keyExtractor = {(item) => item.index}
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
                style={styles.linearStyle}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "transparent",
                    height: Metrics.screenHeight * 0.1634
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ visibleModal: false });
                    }}
                    style={{
                      marginLeft: Metrics.screenWidth * 0.0533,
                      marginBottom: Metrics.screenHeight * 0.0315,
                      width: Metrics.screenWidth * 0.3532,
                      height: Metrics.screenHeight * 0.072,
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth: 1,
                      borderRadius: 3,
                      borderColor: "#2EBAAB",
                      backgroundColor: "white"
                    }}
                  >
                    <Text style={styles.cancelStyle}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this._filterData();
                    }}
                    style={{
                      marginRight: Metrics.screenWidth * 0.0533,
                      marginBottom: Metrics.screenHeight * 0.0315,
                      marginLeft: Metrics.screenWidth * 0.04,
                      width: Metrics.screenWidth * 0.3532,
                      height: Metrics.screenHeight * 0.072,
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth: 1,
                      borderRadius: 3,
                      borderColor: "#2EBAAB",
                      backgroundColor: "#2EBAAB"
                    }}
                  >
                    <Text style={styles.applyStyle}>Apply</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          </Modal>
          <TouchableOpacity
            style={styles.submitContainer}
            onPress={() => {
              //alert(JSON.stringify(this.state.data))
              this.props.navigation.navigate("AddZoneReportScreen", {
                screen: "ZoneReportScreen",
                component: this
              });
            }}
          >
            <Text style={styles.submitText}>Submit a request</Text>
          </TouchableOpacity>
          {this.state.submitSuccess && (
            <AnnounceSubmitSuccess
              submitSuccess={this.state.submitSuccess}
              changeStatusSubmit={this._changeStatusOfSubmitSuccess}
            />
          )}
        </View>
      );
    }
  }
}

export default ZoneReportScreen;
