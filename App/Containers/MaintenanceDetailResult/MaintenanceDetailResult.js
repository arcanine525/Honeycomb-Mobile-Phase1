import React, { Component } from "react";
import {
  View,
  ScrollView,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Icon } from "react-native-elements";
import axios from "axios";
import { Metrics, Images } from "../../Themes/";
import styles from "./MaintenanceDetailResultStyle";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent";

const _width = Metrics.screenWidth;
const _height = Metrics.screenHeight;

class MaintenanceDetailResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      zone_id: "",
      data: [],
      totalAsset: 0,
      lessThan50: 0,
      from50To70: 0,
      higherThan70: 0,
      lost: 0,
      redundant: 0
    };
  }

  _generateFakeData() {
    let tmp = [];
    let a = {
      name: "Office Series 7 Chair",
      id: "A1234",
      past: 90,
      current: 20
    };
    tmp.push(a);
    let b = {
      name: "Office Tulip 5 Chair",
      id: "A1235",
      past: 100,
      current: 80
    };
    tmp.push(b);
    let c = {
      name: "Office Wire 2 Chair",
      id: "A2456",
      past: 50,
      current: 80
    };
    tmp.push(c);

    let d = {
      name: "Office Table 1 Wood",
      id: "A2456",
      past: 20,
      current: 10
    };
    tmp.push(d);
    tmp.push(a);
    tmp.push(b);
    tmp.push(c);
    tmp.push(d);

    this.setState({ data: tmp });
  }

  static navigationOptions = ({ navigation }) => ({
    title: "REPORT DETAIL"
  });

  componentWillMount() {
    const { params } = this.props.navigation.state;
    this._getDataFromServer(params.id);
  }

  async _getDataFromServer(id) {
    let response = await axios.get(
      "http://api.honeycomb2.geekup.vn/api/maintenancecheck/compare/" + id
    );
    this.setState({ data: response.data });
    this.setState({ loading: false });
  }

  renderItem = ({ item }) => {
    const name = item.asset_name;
    const id = item.id;
    const past = item.last_status;
    const current = item.status;
    let haveImage = true;
    if (item.asset_image.length == 0) {
      haveImage = false;
    }
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {haveImage && (
            <Image source={{ uri: item.asset_image[0] }} style={styles.image} />
          )}
          {!haveImage && <Image source={Images.unknown} style={styles.image} />}
          <View style={{ marginLeft: _width * 0.0373 }}>
            <Text style={styles.assetNameText}>{name}</Text>
            <Text style={styles.assetIdText}>{id}</Text>
          </View>
          <Text style={styles.assetPastText}>{past}%</Text>
          <Text style={styles.assetCurrentText}>{current}%</Text>
        </View>
        <View style={styles.horizontalLine} />
      </View>
    );
  };

  render() {
    if (this.state.loading) {
      return <LoadingComponent />;
    } else {
      return (
        <ScrollView style={styles.container}>
          <View style={styles.otherContainer}>
            <Text style={[styles.titleText, { marginLeft: _width * 0.05333 }]}>
              ASSET
            </Text>

            <Text style={styles.totalCheckText}>
              ({this.state.data.scanned_assets}/{this.state.data.total_assets})
            </Text>
            <Text
              style={[
                styles.titleText,
                { left: _width * 0.632, position: "absolute" }
              ]}
            >
              PAST
            </Text>
            <Text
              style={[
                styles.titleText,
                { left: _width * 0.7867, position: "absolute" }
              ]}
            >
              CURRENT
            </Text>
          </View>
          <View style={styles.horizontalLine} />
          <FlatList
            data={this.state.data.list_scanned_assets}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => item.id}
          />
        </ScrollView>
      );
    }
  }
}

export default MaintenanceDetailResult;
