import React, { Component } from "react";
import { Text, TouchableOpacity, View, FlatList, Image } from "react-native";

import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent";
import axios from "axios";
import { Metrics, Images } from "../../Themes/";

import styles from "./StorageAssetListScreenStyles";

class StorageAssetListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storage_info: "",
      storage_data: [],
      loading: true
      //user: this.props.navigation.state.params.user
    };
  }
  static navigationOptions = ({ navigation }) => ({
    header: null,
    title: "Assets"
  });

  _getData = async () => {
    const { params } = this.props.navigation.state;
    let storage_info = params.storage_info;
    //alert(storage_info.id);
    //console.warn("RECEIVED: " + storage_info.id);
    let res = await axios.get(
      "http://api.honeycomb2.geekup.vn/api/storage/" +
        storage_info.id +
        "/assets"
    );
    this.setState({
      storage_info: storage_info,
      storage_data: res.data,
      loading: false
    });
  };
  _renderStorageItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>{
          if(this.props.navigation.state.params.screenNavigate == "AssetReportScreen"){
            this.props.navigation.state.params.getAssetData(item.id)
          }
          this.props.navigation.navigate("AssetReportScreen", {
            screenNavigate: "StorageAssetListScreen",
            data: item,
            user: this.state.user
          })
        }}
        style={styles.cardStyle}
      >
        <View style={styles.topWrapper}>
          <Image source={{uri: item.image_url[0]}} style={styles.asset_pic} />
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
    if (this.state.loading) {
      return <LoadingComponent />;
    } else {
      return (
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 13,
              letterSpacing: 1,
              fontWeight: "bold",
              color: "#CCCFCE",
              marginTop: 0.03 * Metrics.screenHeight,
              marginLeft: Metrics.screenWidth * 0.0533
            }}
          >
            {this.state.storage_data.length > 1
              ? this.state.storage_data.length + " ASSETS"
              : this.state.storage_data.length + " ASSET"}
          </Text>
          <View style={{ marginTop: 0.018 * Metrics.screenHeight }}>
            <FlatList
              data={this.state.storage_data}
              keyExtractor={item => item._id}
              onEndReachedThreshold={0.5}
              renderItem={this._renderStorageItem}
              scrollEventThrottle={16}
            />
          </View>
        </View>
      );
    }
  }
}
export default StorageAssetListScreen;
