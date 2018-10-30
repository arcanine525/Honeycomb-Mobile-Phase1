// Nguyễn Hồ Quốc Thịnh
import React, { Component } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Icon } from "react-native-elements";
import axios from "axios";
import { Metrics } from "../../Themes/";

const _width = Metrics.screenWidth;
const _height = Metrics.screenHeight;

class ReportResultScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
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

  //   async _getDataFromServer() {
  //     let response = await axios.get(
  //       "http://api.honeycomb2.geekup.vn/api/maintenancecheck/get/Z886"
  //     );
  //     this.setState({ data: response.data });
  //     // Calculate report
  //     let totalAsset =
  //       response.data[0].number_checked_asset + response.data[0].number_unchecked;
  //     this.setState({ totalAsset: totalAsset });
  //     this.setState({ isLoading: false });
  //   }

  static navigationOptions = ({ navigation }) => ({
    title: "Maintenance checks 07/07/2018",
    headerStyle: {
      backgroundColor: "#50C3B8",
      height: Metrics.screenHeight * 0.09,
      elevation: 0,
      shadowOpacity: 0
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      flex: 1,
      textAlign: "center",
      fontSize:16,
      lineHeight: 24
    },
    headerLeft: (
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{ marginLeft: 19 }}
      >
        <Icon name="keyboard-backspace" size={30} color="white" />
      </TouchableOpacity>
    ),
    headerRight: (
      <View
        style={{
          width: Metrics.screenWidth * 0.064,
          height: Metrics.screenHeight * 0.0319,
          marginRight: Metrics.screenWidth * 0.0427
        }}
      />
    )
  });

  componentDidMount() {
    // const {param} = this.props.navigate.state;
    // this.setState({zone_id: params.zone_id})
  }

  render() {
    return <View />;
  }

  //   render() {
  //     if (this.state.isLoading) {
  //       return (
  //         <View
  //           style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
  //         >
  //           <ActivityIndicator size="large" color="gray" />
  //         </View>
  //       );
  //     } else {
  //       return (
  //         <View style={{ flex: 1 }}>
  //           <View
  //             style={{
  //               flexDirection: "row",
  //               alignItems: "center",
  //               justifyContent: "center"
  //             }}
  //           >
  //             <Text style={{ fontSize: 30 }}>After big event</Text>
  //             <Text style={{ fontSize: 20, marginLeft: 100 }}>14/02/1997</Text>
  //           </View>
  //           <Text style={{ margin: 20 }}>
  //             {this.state.data[0].number_checked_asset}/{this.state.totalAsset}
  //           </Text>
  //           <TouchableOpacity
  //             onPress={() => {
  //               this._onNavigateToDetailScreen("less");
  //             }}
  //           >
  //             <Card>
  //               <Text>
  //                 {this.state.data[0].number_lessthan50} asset(s) have quality
  //                 under 50%
  //               </Text>
  //             </Card>
  //           </TouchableOpacity>
  //           <TouchableOpacity
  //             onPress={() => {
  //               this._onNavigateToDetailScreen("equal");
  //             }}
  //           >
  //             <Card>
  //               <Text>
  //                 {this.state.data[0].number_equal} asset(s) have quality from 50%
  //                 to 70%
  //               </Text>
  //             </Card>
  //           </TouchableOpacity>
  //           <TouchableOpacity
  //             onPress={() => {
  //               this._onNavigateToDetailScreen("greater");
  //             }}
  //           >
  //             <Card>
  //               <Text>
  //                 {this.state.data[0].number_greate70} asset(s) have quality
  //                 higher 70%
  //               </Text>
  //             </Card>
  //           </TouchableOpacity>
  //           <Card>
  //             <Text>Redundant: {this.state.data[0].number_found}</Text>
  //           </Card>
  //           <Card>
  //             <Text>Lost: {this.state.data[0].unchecked_list.length}</Text>
  //           </Card>
  //         </View>
  //       );
  //     }
  //   }
}

export default ReportResultScreen;
