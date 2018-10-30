import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent";
import axios from "axios";
import styles from "./MaintenanceScreenStyle";
import { Metrics, Images } from "../../Themes/";
import LinearGradient from "react-native-linear-gradient";

const _width = Metrics.screenWidth;
const _height = Metrics.screenHeight;

export default class MaintenanceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
      zone_id: "",
      data: []
    };
  }

  getHistory = async zone_id => {
    this.setState({ refreshing: true });
    let res;
    try {
      res = await axios.get(
        "http://api.honeycomb2.geekup.vn/api/maintenancecheck/" + zone_id
      );
    } catch (e) {
      Alert.alert(
        "Oops...",
        "There is something wrong, please try again",
        [
          {
            text: "Try again",
            onPress: () => {
              this.getHistory(zone_id);
            }
          }
        ],
        { cancelable: true }
      );
    }
    this.setState({
      data: res.data,
      loading: false,
      refreshing: false
    });
  };

  _reloadData = () => {
    this.setState({ refreshing: true });
    
    axios
      .get(
        "http://api.honeycomb2.geekup.vn/api/maintenancecheck/" +
          this.state.zone_id
      )
      .then(res => {
        this.setState({
          data: res.data,
          refreshing: false
        });
      });
  };

  componentDidMount() {
    const { params } = this.props.navigation.state;
    this.setState({ zone_id: params.item.id });
    this.getHistory(params.item.id);
  }

  renderListItem = ({ item }) => {
    const complete = item.complete;
    const average_status = item.average_status;
    const scanned_assets = item.number_of_scanned_asset;
    const total_assets = item.number_of_total_asset;
    let lost_assets = item.number_of_lost_asset;
    let day = item.date.substring(8, 10);
    let month = item.date.substring(5, 7);
    let year = item.date.substring(0, 4);
    const date = `${day}/${month}/${year}`;
    let good;
    let percent;
    if (average_status == null) {
      percent = 0;
    } else {
      percent = parseInt(average_status);
    }
    total_assets == scanned_assets ? (good = true) : (good = false);
    return (
      <TouchableOpacity
        onPress={() => {
          if (complete == true)
            this.props.navigation.navigate("MaintenanceResult", {
              id: item.id,
              date: date
            });
          else alert("This maintenance check result is not completed");
        }}
        style={styles.itemContainer}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={styles.otherContainer1}>
            <Text style={styles.titleText}>Scanned assets</Text>
            <Text style={styles.dataText}>
              {scanned_assets}/{total_assets}
            </Text>
          </View>
          <View
            style={[
              styles.otherContainer1,
              {
                position: "absolute",
                right: _width * 0.0427,
                alignItems: "flex-end"
              }
            ]}
          >
            <Text style={styles.titleText}>Average status</Text>
            <Text style={styles.dataText}>{percent}%</Text>
          </View>
        </View>
        <View style={styles.horizontalLine} />
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.dateText}>{date}</Text>
          {good && (
            <View style={styles.otherContainer2}>
              <Image
                source={Images.good}
                style={{
                  width: _width * 0.0273,
                  height: _height * 0.0153
                }}
              />
              <Text style={styles.goodText}>Good</Text>
            </View>
          )}
          {!good && (
            <View style={styles.otherContainer2}>
              <Image
                source={Images.bad}
                style={{
                  width: _width * 0.0273,
                  height: _height * 0.0153
                }}
              />
              <Text style={styles.badText}>Lost {lost_assets} assets...</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  // render() {
  //   if (this.state.loading) {
  //     return (
  //       <View
  //         style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
  //       >
  //         <LoadingComponent/>
  //       </View>
  //     );
  //   } else {
  //     return (
  //       <View style={styles.container}>
  //         <Text style={styles.textBold}>Zone ID: {this.state.zone_id}</Text>
  //         <Text style={styles.textBold}>
  //           Total: {this.state.data.length} checking(s)
  //         </Text>
  //         {this.state.data.length == 0 && (
  //           <Text style={[styles.itemText]}>No history</Text>
  //         )}
  //         <FlatList
  //           data={this.state.data}
  //           keyExtractor={item => item.id}
  //           renderItem={this.renderListItem}
  //         />
  //         <TouchableOpacity
  //           style={styles.maintenanceCheckButton}
  //           onPress={() => {
  //             //alert(JSON.stringify(this.props.navigation.state.params.zone))
  //             this.props.navigation.navigate("MaintainanceCheck", {
  //               item: this.props.navigation.state.params.item
  //             });
  //           }}
  //         >
  //           <Text style={styles.buttonText}>Maintenance Check</Text>
  //         </TouchableOpacity>
  //       </View>
  //     );
  //   }
  // }

  render() {
    if (this.state.loading) {
      return <LoadingComponent />;
    } else {
      return (
        <View style={styles.container}>
          <FlatList
            style={{ marginBottom: _height * 0.0455 }}
            data={this.state.data}
            renderItem={this.renderListItem}
            keyExtractor={(item, index) => item.id}
            refreshing={this.state.refreshing}
            onRefresh={this._reloadData}
          />

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
            style={styles.blurContainer}
          />
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("MaintainanceCheck", {
                item: this.props.navigation.state.params.item
              });
            }}
            style={styles.maintenanceCheck}
          >
            <Text style={styles.checkText}>Start checking</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}
