import React, { Component } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";

import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent";
import axios from "axios";
import { Metrics, Images } from "../../Themes/";

import styles from "./StorageInfoScreenStyles";


class StorageInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storage_info: "",
      storage_data: [],
      loading: true,
      parse_date: ""
      //user: this.props.navigation.state.params.user
    };
  }
  static navigationOptions = ({ navigation }) => ({
    header: null,
    title: "General Info"
  });

  _getData = async () => {
    const { params } = this.props.navigation.state;
    let storage_info = params.storage_info;
    //console.warn(storage_info.totalasset);
    //PASRE DATE
    let day = storage_info.date.substring(8, 10);
    let month = storage_info.date.substring(5, 7);
    let year = storage_info.date.substring(0, 4);
    let date = `${day}/${month}/${year}`;

    let res = await axios.get(
      "http://api.honeycomb2.geekup.vn/api/storage/" +
        storage_info.id +
        "/assets"
    );
    this.setState({
      storage_info: storage_info,
      storage_data: res.data,
      parse_date: date,
      loading: false
    });
  };

  componentDidMount() {
    this._getData();
  }

  render() {
    if (this.state.loading) {
      return <LoadingComponent />;
    } else {
      return (
        <View
          style={{ flex: 1, flexDirection: "column", backgroundColor: "white" }}
        >
          <View style={styles.firstViewStyle}>
            <Text style={styles.assetStyle}>
              {this.state.storage_info.name}
            </Text>
            <Text
              style={[
                {
                  fontSize: 14,
                  lineHeight: 16,
                  fontWeight: "500",
                  color: "#A5ADAD",
                  letterSpacing: 0.5
                },
                styles.marginStyle,
                {
                  marginBottom: Metrics.screenHeight * 0.024,
                  letterSpacing: 0.5
                }
              ]}
            >
              {this.state.storage_info.id}
            </Text>
          </View>
          <View style={{ backgroundColor: "#F8F9F9", height: 1 }} />
          <View style={styles.secondViewStyle}>
            <Image style={styles.imageStyle} source={{uri: this.state.storage_info.image_url[0]}} />
            <View>
              <Text style={[styles.titleStyle, { letterSpacing: 1.08 }]}>
                ZONE
              </Text>
              <TouchableOpacity>
                <Text style={[styles.zoneStyle, styles.marginStyle]}>
                  {this.state.storage_info.zone_id != null
                    ? this.state.storage_info.zone_id
                    : "--"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.viewStyle}>
              <Text style={[styles.titleStyle, { letterSpacing: 1.08 }]}>
                TOTAL ASSETS
              </Text>
              <Text style={[styles.descriptionStyle, styles.marginStyle]}>
                {this.state.storage_info.totalasset}
              </Text>
            </View>
            <View style={styles.viewStyle}>
              <Text style={[styles.titleStyle, { letterSpacing: 1.08 }]}>
                DATE CREATED
              </Text>
              <Text style={[styles.descriptionStyle, styles.marginStyle]}>
                {this.state.parse_date}
              </Text>
            </View>
            <View style={styles.viewStyle}>
              <Text style={[styles.titleStyle, { letterSpacing: 1.08 }]}>
                DESCRIPTION
              </Text>
              <Text style={[styles.descriptionStyle, styles.marginStyle]}>
                {this.state.storage_info.note == ""
                  ? "--"
                  : this.state.storage_info.note}
              </Text>
            </View>
          </View>
        </View>
      );
    }
  }
}
export default StorageInfoScreen;
