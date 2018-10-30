import React, { Component } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  Image,
  Button,
  Modal
} from "react-native";
import { Header, Icon } from "react-native-elements";
import axios from "axios";
import { Colors, Fonts, Images, Metrics } from "../../Themes/";
import ImageViewer from "react-native-image-zoom-viewer";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent";
// Styles
import styles from "./ZoneInfomationScreenStyles";

const _width = Metrics.screenWidth;
const _height = Metrics.screenHeight;

class ZoneInfomationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zone_id: "",
      zone_name: "",
      totalRequests: 0,
      images: [],
      loading: true,
      imageIndex: 0,
      modalVisible: false,
      date: "",
      submitSuccess: null,
      haveImages: false
    };
  }

  async _getZoneInfo(zone_id) {
    let zone_info = await axios.get(
      "http://api.honeycomb2.geekup.vn/api/zones/" + zone_id
    );
    this.setState({ zone_info: zone_info.data });
    let tmp = [];
    for (let i = 0; i < zone_info.data.image_url.length; i++) {
      let x = {
        url: zone_info.data.image_url[i],
        props: {
          url: zone_info.data.image_url[i]
        }
      };
      tmp.push(x);
    }
    this.setState({ images: tmp });
    if (zone_info.data.image_url.length != 0) {
      this.setState({ haveImages: true });
    }
    let day = zone_info.data.date.substring(8, 10);
    let month = zone_info.data.date.substring(5, 7);
    let year = zone_info.data.date.substring(0, 4);
    let date = `${day}/${month}/${year}`;
    this.setState({ date: date });
    this.setState({ loading: false });
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    this.setState({ zone_id: params.item.id });
    this._getZoneInfo(params.item.id);
  }

  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener(
        "didBlur",
        () => console.log("WillBlur"),
        this._showSubmitSuccess
      ),
      this.props.navigation.addListener("willFocus", () => {
        if (this.props.navigation.state.params.screen != "ZoneListScreen")
          console.log("WillFocus");
      })
    ];
  }

  componentWillUnmount() {
    this.subs.forEach(sub => {
      sub.remove();
    });
  }

  render() {
    if (this.state.loading) {
      return <LoadingComponent />;
    } else {
      return (
        <ScrollView style={styles.container}>
          <View style={{ backgroundColor: "white" }}>
            <Text style={styles.zoneNameText}>{this.state.zone_info.name}</Text>
            <Text style={styles.zoneIdText}>{this.state.zone_info.id}</Text>
            <View style={styles.horizontalLine} />
            <View style={styles.otherContainer1}>
              <View style={{ width: _width * 0.3307 }}>
                <Text style={styles.titleText}>TOTAL ASSETS</Text>
                <Text style={styles.dataText}>
                  {this.state.zone_info.totalasset}
                </Text>
              </View>
              <View style={styles.otherContainer2}>
                <Text style={styles.titleText}>TOTAL REQUESTS</Text>
                <Text style={styles.dataText}>
                  {this.state.zone_info.request.totalrequest}
                </Text>
              </View>
            </View>
            <View style={styles.otherContainer3}>
              <View style={{ width: _width * 0.3307 }}>
                <Text style={styles.titleText}>TOTAL STORAGES</Text>
                <Text style={styles.dataText}>
                  {this.state.zone_info.totalstorage}
                </Text>
              </View>
              <View style={styles.otherContainer2}>
                <Text style={styles.titleText}>DATE CREATED</Text>
                <Text style={styles.dataText}>{this.state.date}</Text>
              </View>
            </View>
            <View style={styles.otherContainer4}>
              <Text style={styles.titleText}>DESCRIPTION</Text>
              <Text style={[styles.dataText, { marginRight: _width * 0.0533 }]}>
                {this.state.zone_info.note}
              </Text>
            </View>
            <View
              style={[
                styles.otherContainer4,
                { marginRight: _width * 0.0533, marginBottom: _height * 0.045 }
              ]}
            >
              <Text style={styles.titleText}>PICTURE</Text>
              <View
                style={{ marginTop: _height * 0.012, flexDirection: "row" }}
              >
                {this.state.images[0] != null && (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState(
                        { imageIndex: 0 },
                        this.setState({ modalVisible: true })
                      );
                    }}
                  >
                    <Image
                      source={{
                        uri: this.state.images[0].url
                      }}
                      style={styles.image}
                    />
                  </TouchableOpacity>
                )}

                {this.state.images[1] != null && (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState(
                        { imageIndex: 1 },
                        this.setState({ modalVisible: true })
                      );
                    }}
                  >
                    <Image
                      source={{
                        uri: this.state.images[1].url
                      }}
                      style={[styles.image, { marginLeft: _width * 0.0427 }]}
                    />
                  </TouchableOpacity>
                )}

                {this.state.images[2] != null && (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState(
                        { imageIndex: 2 },
                        this.setState({ modalVisible: true })
                      );
                    }}
                  >
                    <Image
                      source={{
                        uri: this.state.images[2].url
                      }}
                      style={[styles.image, { marginLeft: _width * 0.0427 }]}
                    />
                  </TouchableOpacity>
                )}

                {this.state.images[3] != null && (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState(
                        { imageIndex: 3 },
                        this.setState({ modalVisible: true })
                      );
                    }}
                  >
                    <Image
                      source={{
                        uri: this.state.images[3].url
                      }}
                      style={[styles.image, { marginLeft: _width * 0.0427 }]}
                    />
                  </TouchableOpacity>
                )}

                
              </View>
              {this.state.images[4] != null && (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState(
                        { imageIndex: 4 },
                        this.setState({ modalVisible: true })
                      );
                    }}
                  >
                    <Image
                      source={{
                        uri: this.state.images[4].url
                      }}
                      style={[styles.image, { marginTop: _height * 0.012 }]}
                    />
                  </TouchableOpacity>
                )}
            </View>
          </View>
          <Modal
            visible={this.state.modalVisible}
            transparent={true}
            onRequestClose={() => this.setState({ modalVisible: false })}
          >
            <View style={{ width: "100%", height: "100%" }}>
              <ImageViewer
                renderHeader={() => {
                  return (
                    <TouchableOpacity
                      style={{ width: "10%", marginTop: 20, marginLeft: "85%" }}
                      onPress={() => this.setState({ modalVisible: false })}
                    >
                      <Icon name="close" size={30} color="white" />
                    </TouchableOpacity>
                  );
                }}
                imageUrls={this.state.images}
                index={this.state.imageIndex}
                //backgroundColor="white"
                enableSwipeDown="true"
                onCancel={() => this.setState({ modalVisible: false })}
              />
            </View>
          </Modal>
        </ScrollView>
      );
    }
  }
}

export default ZoneInfomationScreen;
