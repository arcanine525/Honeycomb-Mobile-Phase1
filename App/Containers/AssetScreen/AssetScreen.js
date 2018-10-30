import React, { Component } from "react";
import {
  View,
  AsyncStorage,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";
import { Icon } from "react-native-elements";

import Modal from "react-native-modal";

import axios from "axios";
import Images from "../../Themes/Images";
import { Metrics } from "../../Themes/";
import LinearGradient from "react-native-linear-gradient";
import AnnounceSubmitSuccess from "../../Components/AnnounceSubmitSuccess/AnnounceSubmitSuccess";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent";
import styles from "./AssetScreenStyle";

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

export default class AssetScreen extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      isLoading: false,
      submitSuccess: false,
      data: [],
      searchingData: [],
      refreshing: false,
      visibleModal: false,
      chooseList: [],
      categoryList: [],
      ignoreList: []
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Assets",
    headerStyle: {
      backgroundColor: "#50C3B8",
      height: Metrics.screenHeight * 0.09,
      shadowOpacity: 0,
      shadowOffset: {
        height: 0
      },
      shadowRadius: 0,
      elevation: 0
    },
    headerTintColor: "#fff",
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
          navigation.openDrawer();
        }}
        style={{ marginLeft: Metrics.screenWidth * 0.0507 }}
      >
        <Icon name="menu" size={30} color="white" />
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity
        onPress={() => {
          if (navigation.state.params.screenNavigate == "UserHomeScreen") {
            navigation.state.params.UserHomeScreen._unlockScanQR();
            navigation.state.params.UserHomeScreen._turnOnCamera();
          }
          navigation.navigate("QRScreen", { flag: false });
        }}
        style={{
          alignItems: "flex-start",
          width: Metrics.screenWidth * 0.1013
        }}
      >
        {navigation.state.params.openQR && (
          <Image source={Images.qr} style={{ width: 24, height: 24 }} />
        )}
      </TouchableOpacity>
    )
  });

  //http://api.honeycomb2.geekup.vn/api/zones/${zone_id}/assets
  onLoadData = async () => {
    this.setState({ isLoading: true });
    this.setState({ refreshing: true, data: [] });
    let res;
    if (this.state.user.role == "client") {
      res = await axios.get(`http://api.honeycomb2.geekup.vn/api/assets`);
      this.setState(
        {
          data: res.data,
          refreshing: false,
          searchingData: res.data
        },
        function() {
          this.setState({ isLoading: false });
        }
      );
    } else {
      const { params } = this.props.navigation.state;

      if (params.screen == "ZoneListScreen") {
        let zone_id = params.item.id;
        res = await axios.get(
          "http://api.honeycomb2.geekup.vn/api/zones/" + zone_id + "/assets"
        );

        this.setState({
          data: res.data.data,
          refreshing: false,
          searchingData: res.data.data
        });
      } else {
        res = await axios.get(`http://api.honeycomb2.geekup.vn/api/assets`);
        this.setState({
          data: res.data,
          refreshing: false,
          searchingData: res.data
        });
      }
      this.setState({ isLoading: false });
    }
  };

  componentWillMount = async () => {
    categoryList = await axios.get(
      "http://api.honeycomb2.geekup.vn/api/assets/category"
    );
    this.setState({ categoryList: categoryList.data.category }, function() {
      this._initialChooseList();
    });

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

  componentDidMount = () => {
    this.onLoadData();
  };

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

  _toggleModal = () => {
    this.setState({ visibleModal: !this.state.visibleModal });
  };

  onSearching(key) {
    if (key == "") {
      this.setState({ searchingData: this.state.data });
    } else {
      this.setState({ searchingData: [] });
      let x = [];
      for (let i = 0; i < this.state.searchingData.length; i++) {
        let currentZoneName = this.state.searchingData[i].name.toLowerCase();
        let tmp = key.toLowerCase();

        if (currentZoneName.includes(tmp)) {
          x.push(this.state.searchingData[i]);
        }
      }
      this.setState({ searchingData: x });
    }
  }

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

  _changeStatusOfSubmitSuccess = () => {
    this.setState({ submitSuccess: !this.state.submitSuccess });
  };

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("AssetReportScreen", {
            screenNavigate: "AssetList",
            data: item,
            user: this.state.user
          })
        }
        style={styles.cardStyle}
      >
        <View style={styles.topWrapper}>
          <Image
            source={
              item.image_url.length > 0
                ? { uri: item.image_url[0] }
                : Images.unknown
            }
            style={styles.asset_pic}
          />
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
              let d = { data: item };
              this.props.navigation.navigate("AddAssetReportScreen", {
                screen: "AssetScreen",
                component: d,
                changeStatusSubmit: this._changeStatusOfSubmitSuccess
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

  render() {
    if (this.state.isLoading) {
      return <LoadingComponent />;
    } else {
      return (
        <View style={styles.container}>
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
                  placeholderTextColor="#CCCFCE"
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
              <Image source={Images.filter} style={{ width: 15, height: 15 }} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={this.state.searchingData}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
            refreshing={this.state.refreshing}
            onRefresh={this.onLoadData}
            ListHeaderComponent={() => {
              return (
                <Text style={styles.totalAssetStyle}>
                  {this.state.searchingData.length > 1
                    ? this.state.searchingData.length + " ASSETS"
                    : this.state.searchingData.length + " ASSET"}
                </Text>
              );
            }}
            ListFooterComponent={() => {
              return <View style={{ height: 25 }} />;
            }}
          />
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
