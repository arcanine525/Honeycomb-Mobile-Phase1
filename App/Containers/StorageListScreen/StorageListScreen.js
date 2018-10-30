import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";

import axios from "axios";
import Images from "../../Themes/Images";
import { Metrics } from "../../Themes/";

import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent";
import styles from "./StorageListScreenStyles";

export default class StorageListScreen extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      storage_data: [],
      user: "thang_nd",
      refreshing: false
    };
  }

  static navigationOptions = ({ navigation }) => ({});

  //http://api.honeycomb2.geekup.vn/api/zones/${zone_id}/assets
  _getData = async () => {
    const { params } = this.props.navigation.state;
    let zone_id = params.item.id;
    this.setState({ isLoading: true });
    this.setState({ refreshing: true, data: [] });
    //console.warn("Zone ID: " + zone_id);
    let storage = await axios.get(
      "http://api.honeycomb2.geekup.vn/api/zones/" + zone_id + "/storage"
    );
    this.setState({
      storage_data: storage.data,
      refreshing: false,
      isLoading: false
    });
  };

  componentDidMount() {
    this._getData();
  }

  _renderStorageItem = ({ item }) => {
    let number_asset_text;
    if (item.totalasset > 1) {
      number_asset_text = item.totalasset + " assets";
    } else {
      number_asset_text = item.totalasset + " asset";
    }
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("StorageTab", {
            storage_info: item
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
    if (this.state.isLoading) {
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
              ? this.state.storage_data.length + " STORAGES"
              : this.state.storage_data.length + " STORAGE"}
          </Text>
          <FlatList
            data={this.state.storage_data}
            keyExtractor={item => item._id}
            onEndReachedThreshold={0.5}
            renderItem={this._renderStorageItem}
            scrollEventThrottle={48}
            style={{ marginTop: 0.018 * Metrics.screenHeight }}
          />
        </View>
      );
    }
  }
}
