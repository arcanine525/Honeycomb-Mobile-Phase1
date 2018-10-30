import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Alert,
  AsyncStorage
} from "react-native";

import AnnounceSubmitSuccess from "../../Components/AnnounceSubmitSuccess/AnnounceSubmitSuccess";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent";
import axios from "axios";
import { Images, Metrics } from "../../Themes/";

// Styles
import styles from "./AssetReportListScreenStyle";
import { Avatar } from "../../../node_modules/react-native-elements";

class AssetReportScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isLoading: true,
      refreshing: false,
      data: {},
      reportList: [],
      submitSuccess: false
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: "REQUESTS"
  });

  async _getAssetData(asset_id) {
    let res = await axios.get(
      "http://api.honeycomb2.geekup.vn/api/assets/" + asset_id
    );
    res.data.create_date = res.data.create_date.substr(0, 10);
    this.setState({ data: res.data });
  }

  _refreshReportList = () => {
    if(this.state.data){
      this.setState({refreshing: true})
      axios.get('http://api.honeycomb2.geekup.vn/api/report/asset/' + this.state.data.id + '?priority=all&status=all')
      .then((response)=> {
        let temp = response.data.list_report
        let tempData = [];
        for(var i = 0;i < temp.length;i ++){
          if(temp[i].status != "ARCHIVED"){
            tempData.push(temp[i])
          }
        }
          this.setState({ reportList: tempData });
          this.setState({ refreshing: false });
          this.setState({ isLoading: false });
      })
      .catch(err => {
        console.error(err);
      });
    }
  };

  _changeStatusOfSubmitSuccess = () => {
    this.setState({ submitSuccess: false });
  };

  componentWillMount = async () =>{
    let user = {
      role: "",
      username: ""
    };
    user.role = await AsyncStorage.getItem("role");
    user.username = await AsyncStorage.getItem("username");

    this.setState({user: user})
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;

    this.setState(
      { data: params ? params.data : null },
      function(){
        this._refreshReportList();
      }
    );
  }

  _pickStatusColor(status) {
    switch (status) {
      case "NEW":
        return "#F2A63C";
      case "ARCHIVED":
        return "pink";
      case "IN-PROGRESS":
        return "#3498DB";
      case "RESOLVED":
        return "#16C72E";
      case "SOLVED":
        return "#16C72E";
    }
    return "black";
  }

  _pickPriorityColor(priority) {
    switch (priority) {
      case "MUST":
        return "#FF1616";
      case "SHOULD":
        return "#50C3B8";
    }
    return "black";
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

  _pickStatusImage(status){
    switch (status) {
      case "NEW":
        return Images.status_new;
      case "IN-PROGRESS":
        return Images.status_in_progress;
      case "RESOLVED":
        return Images.status_resolved;
    }
    return null;
  }

  _pickStatusImageSize(status){
    switch (status) {
      case "NEW":
        return styles.statusNewStyle;
      case "IN-PROGRESS":
        return styles.statusInProgressStyle;
      case "RESOLVED":
        return styles.statusResolvedStyle;
    }
    return null;
  }

  _getRequestNoteType(item) {
    return item.note_type;
  }

  _getRequestNoteText(item) {
    return item.note_text;
  }

  _renderItemFlatList = ({ item }) => {
    let sender = item.sender;
    sender = sender.replace("_", " ")
    let send_date = item.send_date.substr(0, 10);
    const notetype = item.note.map(this._getRequestNoteType);
    const notetext = item.note.map(this._getRequestNoteText);
    const status = item.status;
    const priority = item.priority;


    let day = item.send_date.substring(8, 10);
    let month = item.send_date.substring(5, 7);
    let year = item.send_date.substring(0, 4);
    send_date = `${day}/${month}/${year}`;
    console.warn(item)
    return (
      <TouchableOpacity
        onPress={() => {
          let temp = {report: item, name: item.asset_name, date: send_date, history: false}
          if(this.state.user.role == "staff"){
            this.props.navigation.navigate("ManagerReportDetailScreen", {
              item: temp
            });
          }
          else if(this.state.user.role == "client"){
            this.props.navigation.navigate("UserReportDetailScreen", {
              item: temp
            });
          }
        }}
      >
        <View style={styles.cardStyle}>
          <View style={styles.wrapTopStyle}>
            <Avatar
              small
              rounded
              title = {sender.charAt(0)}
            />
            <Text style={styles.senderStyle}> {sender} </Text>
            <Image
              source={this._pickPriorityImage(priority)}
              style={this._pickPriorityImageSize(priority)}
            />
          </View>
          <View style={{ height: 1, backgroundColor: "#F8F9F9" }} />
          <View style={styles.wrapMiddleStyle}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={styles.noteTypeStyle}
                numberOfLines={1}
                ellipsizeMode={"tail"}
              >
                {notetype.join(" | ")}
              </Text>
            </View>
            <Text
              style={styles.noteTextStyle}
              numberOfLines={1}
              ellipsizeMode={"tail"}
            >
              {notetext.join(" , ")}{" "}
            </Text>
          </View>
          <View style = {{height: 1, backgroundColor: '#F8F9F9'}}/>
          <View style = {styles.wrapBottomStyle}>
            <Text style = {styles.sendDateStyle}>{send_date}</Text>
            <Image source = {this._pickStatusImage(status)} style = {this._pickStatusImageSize(status)}/>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    if (this.state.isLoading) {
      return <LoadingComponent />;
    } else {
      const { reportList } = this.state;
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            backgroundColor: "#F8F9F9"
          }}
        >
          <View style={{ flex: 6, marginBottom: "7.2%" }}>
            {Object.keys(reportList).length != 0 && (
              <FlatList
                data={reportList}
                renderItem={this._renderItemFlatList}
                keyExtractor={item => item.asset_id}
                refreshing={this.state.refreshing}
                onRefresh={this._refreshReportList}
                ListHeaderComponent={() => {
                  return (
                    <View
                      style={{
                        width: "100%",
                        height: Metrics.screenHeight * 0.0105,
                        backgroundColor: "#F8F9F9"
                      }}
                    />
                  );
                }}
                ListFooterComponent={() => {
                  return (
                    <View
                      style={{
                        width: "100%",
                        height: 30,
                        backgroundColor: "#F8F9F9"
                      }}
                    />
                  );
                }}
              />
            )}
          </View>
          <TouchableOpacity
            style={{
              position: "absolute",
              width: "100%",
              height: Metrics.screenHeight * 0.072,
              bottom: 0,
              backgroundColor: "#2EBAAB",
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={() => {
              this.props.navigation.navigate("AddAssetReportScreen", {
                screen: "AssetReportListScreen",
                component: this
              });
            }}
          >
            <Text style={styles.btnSubmitTextStyle}>Submit a request</Text>
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

export default AssetReportScreen;
