import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  FlatList,
  Alert
} from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import { Card, Icon, Avatar } from "react-native-elements";
import axios from "axios";
import { Images, Metrics } from "../../Themes/";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent";
import styles from "./ZoneRequestScreenStyles";
import ModalDropdown from "react-native-modal-dropdown";

const _width = Metrics.screenWidth;
const _height = Metrics.screenHeight;

var allReports = [];

class ZoneRequestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zone_id: "",
      zone_info: "init",
      zone_reports: [],
      loading: true,
      refreshing: false,
      totalRequest: 0,
      filter: "All",
      filterText: "All",
      filterData: []
    };
  }

  static navigationOptions = {
    //header: null
    title: "Zone Request Screen"
  };

  async _getData(zone_id) {
    let res;
    try {
      res = await axios.get(
        "http://api.honeycomb2.geekup.vn/api/zones/" +
          zone_id +
          "/report/zone?priority=all&status=all"
      );
    } catch (e) {
      Alert.alert("Oops...", "There is something wrong, please try again", [
        {
          text: "Try again",
          onPress: () => {
            this._getData(zone_id);
          }
        }
      ]);
    }
    //console.warn(res.data.list_filter_report)
    if (res.data.list_filter_report)
      this.setState({ totalRequest: res.data.list_filter_report.length });
    else this.setState({ totalRequest: 0 });
    this.setState({ data: res.data.list_filter_report });
    this.setState({ filterData: res.data.list_filter_report });
    this.setState({ loading: false });
  }

  _reloadData = async () => {
    let res;
    this.setState({ refreshing: true });
    try {
      res = await axios.get(
        "http://api.honeycomb2.geekup.vn/api/zones/" +
          this.state.zone_id +
          "/report/zone?priority=all&status=" +
          this.state.filter
      );
    } catch (e) {
      Alert.alert("Oops...", "There is something wrong, please try again", [
        {
          text: "There is an error",
          onPress: () => {
            this._reloadData();
          }
        }
      ]);
    }
    console.warn(res.data.list_filter_report);
    if (res.data.list_filter_report.length)
      this.setState({ totalRequest: res.data.list_filter_report.length });
    else this.setState({ totalRequest: 0 });
    this.setState({ data: res.data.list_filter_report });
    this.setState({ filterData: res.data.list_filter_report });
    this.setState({ refreshing: false });
  };

  _filterStatus(status) {
    let tempReportList = [];
    switch (status) {
      case "None":
        tempReportList = allReports;
        break;
      case "New":
        for (var i = 0; i < allReports.length; i++) {
          if (allReports[i].status == "New") {
            tempReportList.push(allReports[i]);
          }
        }
        break;
      case "In Progress":
        for (var i = 0; i < allReports.length; i++) {
          if (allReports[i].status == "In-Progress") {
            tempReportList.push(allReports[i]);
          }
        }
        break;
    }
    this.setState({ zone_reports: tempReportList });
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    this.setState({ zone_id: params.item.id });
  }

  componentDidMount() {
    this._getData(this.state.zone_id);
  }

  _getRequestNote(item) {
    if (item.note_text == "") return "--";
    else {
      return item.note_text;
    }
  }

  renderItem = ({ item }) => {
    let sender = item.sender;
    sender = sender.replace("_", " ")
    let priority = item.priority;
    let type = "";
    let fullNote = item.note.map(this._getRequestNote);

    if (item.type.length == 1) {
      type = item.type[0];
    } else if (item.type.length == 2) {
      type = item.type[0] + " | " + item.type[1];
    } else {
      type = item.type[0] + " | " + item.type[1] + " | " + item.type[2];
    }

    let day = item.send_date.substring(8, 10);
    let month = item.send_date.substring(5, 7);
    let year = item.send_date.substring(0, 4);
    let date = `${day}/${month}/${year}`;

    let status = item.status;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          let param = {
            report: item,
            name: item.zone_name,
            date: date,
            history: false
          };
          this.props.navigation.navigate("ManagerReportDetailScreen", {
            item: param
          });
        }}
      >
        <View style={styles.otherContainer2}>
          <Avatar
            small
            rounded
            title = {sender.charAt(0)}
          />
          {/* <Image
            source={{
              uri:
                "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
            }}
            style={{
              width: _width * 0.064,
              height: _height * 0.036,
              borderRadius: 20
            }}
          /> */}
          <Text style={styles.senderText}>{sender}</Text>
          {priority == "SHOULD" && (
            <View style={styles.shouldImage}>
              <Image
                source={Images.should}
                style={{
                  width: null,
                  height: null,
                  flex: 1,
                  resizeMode: "stretch"
                }}
              />
            </View>
          )}
          {priority == "MUST" && (
            <View style={styles.mustImage}>
            <Image
              source={Images.must}
              style={{
                width: null,
                height: null,
                flex: 1,
                resizeMode: "stretch"
              }}
            />
          </View>
          )}
        </View>
        <View style={styles.horizontalLine} />
        <View
          style={{
            marginVertical: _height * 0.024,
            marginHorizontal: _width * 0.0427
          }}
        >
          <Text style={styles.typeText}>{type}</Text>
          {fullNote != "" && (
            <Text
              numberOfLines={1}
              ellipsizeMode={"tail"}
              style={styles.noteText}
            >
              {fullNote.join(" | ")}
            </Text>
          )}
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.otherContainer3}>
          <Text style={styles.dateText}>{date}</Text>
          {status == "NEW" && (
            <View
              style={{
                position: "absolute",
                right: 0,
                width: _width * 0.112,
                height: _height * 0.027
              }}
            >
              <Image
                source={Images.new}
                style={{
                  flex: 1,
                  width: null,
                  height: null,
                  resizeMode: "stretch"
                }}
              />
            </View>
          )}
          {status == "IN-PROGRESS" && (
            <View
              style={{
                position: "absolute",
                right: 0,
                width: _width * 0.248,
                height: _height * 0.027
              }}
            >
              <Image
                source={Images.in_progress}
                style={{
                  flex: 1,
                  width: null,
                  height: null,
                  resizeMode: "stretch"
                }}
              />
            </View>
          )}
          {status == "SOLVED" && (
            <View
              style={{
                height: (2.7 * Metrics.screenHeight) / 100,
                width: (19.73 * Metrics.screenWidth) / 100,
                borderRadius: 13,
                backgroundColor: "#16C72E",
                position: "absolute",
                right: 0,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 12,
                  fontWeight: "500",
                  lineHeight: 14
                }}
              >
                SOLVED
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  filterData(data) {
    if (data == "New" && data != this.state.filter) {
      this.setState({ loading: true });

      this.setState({ filter: "new" });
      axios
        .get(
          "http://api.honeycomb2.geekup.vn/api/zones/" +
            this.state.zone_id +
            "/report/zone?priority=all&status=new"
        )
        .then(response => {
          this.setState({ data: response.data.list_filter_report });
          this.setState({ loading: false });
        });
    }
    if (data == "In-progress" && data != this.state.filter) {
      this.setState({ loading: true });

      this.setState({ filter: "inprogress" });
      axios
        .get(
          "http://api.honeycomb2.geekup.vn/api/zones/" +
            this.state.zone_id +
            "/report/zone?priority=all&status=inprogress"
        )
        .then(response => {
          this.setState({ data: response.data.list_filter_report });
          this.setState({ loading: false });
        });
    }
    if (data == "Solved" && data != this.state.filter) {
      this.setState({ loading: true });

      this.setState({ filter: "solved" });
      axios
        .get(
          "http://api.honeycomb2.geekup.vn/api/zones/" +
            this.state.zone_id +
            "/report/zone?priority=all&status=solved"
        )
        .then(response => {
          this.setState({ data: response.data.list_filter_report });
          this.setState({ loading: false });
        });
    }
    if (data == "All" && data != this.state.filter) {
      this.setState({ loading: true });

      this.setState({ filter: "all" });
      axios
        .get(
          "http://api.honeycomb2.geekup.vn/api/zones/" +
            this.state.zone_id +
            "/report/zone?priority=all&status=all"
        )
        .then(response => {
          this.setState({ data: response.data.list_filter_report });
          this.setState({ loading: false });
        });
    }
  }

  render() {
    console.log(this.state.loading);
    if (this.state.loading) {
      return <LoadingComponent />;
    } else {
      return (
        <ScrollView style={styles.container}>
          <View style={styles.otherContainer1}>
            <Text style={styles.totalRequestText}>
              {this.state.totalRequest} REQUESTS
            </Text>
            <View
              style={{
                flexDirection: "row",
                position: "absolute",
                right: 0,
                justifyContent: "flex-end",
                alignItems: "center"
              }}
            >
              <Text style={styles.fitlerByText}>Filter by</Text>
              <ModalDropdown
                options={["All", "New", "In-progress", "Solved"]}
                renderSeparator={() => {
                  <View />;
                }}
                onSelect={(index, data) => {
                  this.setState({ filterText: data });
                  this.filterData(data);
                }}
                dropdownTextStyle={styles.dropDownStyle}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.filterText}>{this.state.filterText}</Text>
                  <Icon name="keyboard-arrow-down" size={20} />
                </View>
              </ModalDropdown>
            </View>
          </View>
          <FlatList
            style={{ marginBottom: _height * 0.024 }}
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
            //refreshing={this.state.refreshing}
            //onRefresh={this._reloadData}
          />
        </ScrollView>
      );
    }
  }
}

export default ZoneRequestScreen;
