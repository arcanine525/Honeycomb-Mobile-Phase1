import React, { Component } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
  FlatList
} from "react-native";
import { Header, Icon, Card, ListItem } from "react-native-elements";
import axios from "axios";
import { Colors, Fonts, Images } from "../../Themes/";

// Styles
import styles from "./ZoneReportListScreenStyles";

class ZoneReportListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zone_id: "",
      zone_info: "init",
      zone_reports: [],
      loading: true
    };
  }

  static navigationOptions = {
    //header: null
    title: "Zone Report List Screen"
  };

  async _getData(zone_id) {
    let zone_info = await axios.get(
      "http://api.honeycomb2.geekup.vn/api/zones/" + zone_id + "/report"
    );

    this.setState({ zone_reports: zone_info.data });

    this.setState({ loading: false });
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    this.setState({ zone_id: params.zone_id });
    //this.setState({ zone_id: "Z525" });
    //this._getZoneName(this.state.zone_id);
  }

  componentDidMount() {
    this._getData(this.state.zone_id);
  }

  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity>
        <Card>
          <View style={styles.headerContainer}>
            <Image source={Images.no_avatar} style={styles.avatar} />
            <View style={styles.headerText}>
              <Text style={styles.description}>{item.sender}</Text>
              <Text style={styles.description}>{item.send_date}</Text>
            </View>

            <View style={styles.status}>
              <Text>{item.status}</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.description}>{item.type}</Text>
            <Text style={styles.description}>{item.priority}</Text>
          </View>

          {/* <ListItem
            roundAvatar
            hideChevron={true}
            title={<Text style={styles.description}>{item.sender}</Text>}
            subtitle={item.send_date}
            avatar={Images.no_avatar}
            rightTitle={<Text>{item.status}</Text>}
          />

          <View style={styles.item}>
            <Text style={styles.description}>{item.type}</Text>
            <Text style={styles.description}>{item.priority}</Text>
          </View> */}
        </Card>
      </TouchableOpacity>
    );
  };

  render() {
    if (this.state.loading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <FlatList
            style={styles.flatlist}
            data={this.state.zone_reports}
            keyExtractor={item => item._id}
            onEndReachedThreshold={0.5}
            renderItem={this._renderItem}
          />
        </View>
      );
    }
  }
}

export default ZoneReportListScreen;
