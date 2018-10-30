// Nguyễn Hồ Quốc Thịnh
import React, { Component } from "react";
import {
  View,
  ScrollView,
  Image,
  FlatList,
  Text,
  Button,
  ActivityIndicator
} from "react-native";
import { Icon } from "react-native-elements";
import axios from "axios";
import { Metrics, Images } from "../../Themes/";
import styles from "./MaintenanceGeneralResultStyle";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent";

const _width = Metrics.screenWidth;
const _height = Metrics.screenHeight;

class MaintenanceGeneralResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      zone_id: "",
      data: [],
      // New state
      lost: false,
      redundant: false,
      good: true,
      lostAssets: [],
      redundantAssets: [],
      date: ""
    };
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    this.setState({ date: params.date });
    this._getDataFromServer(params.id);
  }

  async _getDataFromServer(id) {
    let response = await axios.get(
      "http://api.honeycomb2.geekup.vn/api/maintenancecheck/detail/" + id
    );
    this.setState({ data: response.data });
    this.setState({ lostAssets: response.data.lost_assets });
    this.setState({ redundantAssets: response.data.redundant_assets });
    response.data.number_of_lost_asset > 0
      ? this.setState({ lost: true })
      : this.setState({ lost: false });
    response.data.number_of_redundant_asset > 0
      ? this.setState({ redundant: true })
      : this.setState({ redundant: false });
    response.data.number_of_lost_asset == 0 &&
    response.data.number_of_redundant_asset == 0
      ? this.setState({ good: true })
      : this.setState({ good: false });
    this.setState({ isLoading: false });
  }

  static navigationOptions = ({ navigation }) => ({
    title: "GENERAL INFO"
  });

  renderItemRedundant = ({ item }) => {
    const name = item.asset_name;
    const id = item.id;
    const zone = item.asset_zone_name;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row" }}>
          <Image source={Images.zone_pic1} style={styles.assetAvatar} />
          <View style={styles.otherContainer}>
            <Text style={styles.assetNameText}>{name}</Text>
            <Text style={[styles.assetIdText, { marginTop: _height * 0.005 }]}>
              {id}
            </Text>
            <Text
              style={[styles.assetZoneText, { marginTop: _height * 0.005 }]}
            >
              {zone}
            </Text>
          </View>
        </View>
        <View style={styles.horizontalLine} />
      </View>
    );
  };

  renderItemLost = ({ item }) => {
    const name = item.name;
    const id = item.id;
    const zone = item.zone.name;
    let haveImage = true;
    if (item.image_url.length == 0) {
      haveImage = false;
    }
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row" }}>
          {haveImage && (
            <Image
              source={{ uri: item.image_url[0] }}
              style={styles.assetAvatar}
            />
          )}
          {!haveImage && (
            <Image source={Images.unknown} style={styles.assetAvatar} />
          )}
          <View style={styles.otherContainer}>
            <Text style={styles.assetNameText}>{name}</Text>
            <Text style={[styles.assetIdText, { marginTop: _height * 0.005 }]}>
              {id}
            </Text>
            <Text
              style={[styles.assetZoneText, { marginTop: _height * 0.005 }]}
            >
              {zone}
            </Text>
          </View>
        </View>
        <View style={styles.horizontalLine} />
      </View>
    );
  };

  render() {
    const percent = parseInt(this.state.data.average_status);
    if (this.state.isLoading) {
      return <LoadingComponent />;
    } else {
      return (
        <ScrollView style={styles.container}>
          <View style={{ backgroundColor: "white" }}>
            <Text style={styles.zoneNameText}>{this.state.data.zone_name}</Text>
            <Text style={styles.zoneIdText}>{this.state.data.zone_id}</Text>
            <View
              style={[styles.horizontalLine, { marginTop: _height * 0.024 }]}
            />
            <Text style={[styles.titleText, { marginTop: _height * 0.024 }]}>
              SCANNED ASSETS
            </Text>
            <Text style={[styles.dataText, { marginTop: _height * 0.012 }]}>
              {this.state.data.number_of_available_asset}/{
                this.state.data.total_assets
              }
            </Text>
            <Text style={[styles.titleText, { marginTop: _height * 0.045 }]}>
              AVERAGE STATUS
            </Text>
            <Text style={[styles.dataText, { marginTop: _height * 0.012 }]}>
              {percent}%
            </Text>
            <Text style={[styles.titleText, { marginTop: _height * 0.045 }]}>
              DATE CHECKED
            </Text>
            <Text style={[styles.dataText, { marginTop: _height * 0.012 }]}>
              {this.state.date}
            </Text>
            <Text style={[styles.titleText, { marginTop: _height * 0.045 }]}>
              RESULT
            </Text>

            {/* This is good */}
            {this.state.good && (
              <View
                style={{
                  flexDirection: "row",
                  marginTop: _height * 0.0173
                }}
              >
                <View style={styles.imageContainer}>
                  <Image source={Images.good} style={styles.image} />
                </View>
                <Text style={styles.goodText}>Good</Text>
              </View>
            )}

            {/* This is Lost */}
            {this.state.lost && (
              <View
                style={{
                  flexDirection: "row",
                  marginTop: _height * 0.0173
                }}
              >
                <View style={styles.imageContainer}>
                  <Image source={Images.bad} style={styles.image} />
                </View>
                <Text style={styles.badText}>
                  Lost {this.state.data.number_of_lost_asset} assets
                </Text>
              </View>
            )}
            {this.state.lost && (
              <View
                style={[styles.horizontalLine, { marginTop: _height * 0.01 }]}
              />
            )}
            {this.state.lost && (
              <FlatList
                style={{ marginBottom: 30 }}
                data={this.state.lostAssets}
                renderItem={this.renderItemLost}
                keyExtractor={(item, index) => item.id}
              />
            )}

            {/* This is redundant */}
            {this.state.redundant && (
              <View
                style={{
                  flexDirection: "row",
                  marginTop: _height * 0.0249
                }}
              >
                <View style={styles.imageContainer}>
                  <Image source={Images.bad} style={styles.image} />
                </View>
                <Text style={styles.badText}>
                  Redundant {this.state.data.number_of_redundant_asset} assets
                </Text>
              </View>
            )}
            {this.state.redundant && (
              <View
                style={[styles.horizontalLine, { marginTop: _height * 0.01 }]}
              />
            )}
            {this.state.redundant && (
              <FlatList
                style={{ marginBottom: 30 }}
                data={this.state.redundantAssets}
                renderItem={this.renderItemRedundant}
                keyExtractor={(item, index) => item.id}
              />
            )}
          </View>
        </ScrollView>
      );
    }
  }
}

export default MaintenanceGeneralResult;
