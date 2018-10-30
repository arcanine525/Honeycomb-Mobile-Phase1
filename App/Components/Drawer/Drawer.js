import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, AsyncStorage } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { NavigationActions, StackActions } from "react-navigation";
import { Colors, Fonts, Metrics, Images } from "../../Themes/";

export default class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      onScan: true,
      onHistory: false,
      onZones: false,
      onAssets: false
    };
  }
  onReset = async () => {
    this.setState({
      onScan: false,
      onHistory: false,
      onZones: false,
      onAssets: false
    });
  };
  onScan() {
    this.onReset();
    this.setState({ onScan: true });
  }
  onAssets() {
    this.onReset();
    this.setState({ onAssets: true });
  }
  onHistory() {
    this.onReset();
    this.setState({ onHistory: true });
  }
  onZones() {
    this.onReset();
    this.setState({ onZones: true });
  }
  onLogout = async () => {
    await AsyncStorage.clear()
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: "Login" })]
    });
    this.props.navigation.dispatch(resetAction);
  }

  getUser = async () =>
  {
    let user =
    {
      role: await AsyncStorage.getItem('role'),
      username: await AsyncStorage.getItem('username'),
      phone: await AsyncStorage.getItem('phone'),
    }
    user.username = user.username.replace("_", " ")
    //console.warn(user.username)
    this.setState({user: user})
  }

  componentWillMount()
  {
    this.getUser()
  }

  render() {
    //console.warn(this.state.user)
    return (
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <Avatar
          onPress = {()=>{console.warn(this.props.navigation)}}
            large
            rounded
            title = {this.state.user.username ? this.state.user.username.charAt(0) : '--'}
            containerStyle={{
              marginBottom: (2.4 * Metrics.screenHeight) / 100
            }}
          />
          <Text style={styles.username}>{this.state.user.username}</Text>
          <Text style={styles.userInfo}>{this.state.user.phone}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.onScan();
            this.props.navigation.navigate("HomeScreen", {flag: true});
            // StackActions.reset({
            //       index: 0,
            //       actions: [
            //         NavigationActions.navigate(
            //           { 
            //             routeName: 'HomeScreen',
            //             params: {flag: true} 
            //           }
            //         )
            //       ],
            //   })
          }}
          style={[
            styles.itemContainer,
            {
              backgroundColor: this.state.onScan ? "#F0F2F2" : "#F8F9F9"
            }
          ]}
        >
          {this.state.onScan && <View style={styles.selectedItem} />}
          {this.state.onScan && (
            <Image source={Images.scan_qr} style={styles.selectedIcon} />
          )}
          {!this.state.onScan && (
            <Image
              source={Images.scan_qr_black}
              style={styles.unselectedIcon}
            />
          )}
          <Text
            style={[
              styles.itemText,
              {
                fontWeight: this.state.onScan ? "500" : "normal",
                marginLeft: "5.31%",
                color: this.state.onScan ? "#2EBAAB" : "#274541"
              }
            ]}
          >
            Scan
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.onHistory();
            this.props.navigation.navigate("HistoryNav", {
              user: this.state.user
            });
          }}
          style={[
            styles.itemContainer,
            {
              backgroundColor: this.state.onHistory ? "#F0F2F2" : "#F8F9F9"
            }
          ]}
        >
          {this.state.onHistory && <View style={styles.selectedItem} />}
          {this.state.onHistory && (
            <Image source={Images.my_report} style={styles.selectedIcon} />
          )}
          {!this.state.onHistory && (
            <Image
              source={Images.my_report_black}
              style={styles.unselectedIcon}
            />
          )}
          <Text
            style={[
              styles.itemText,
              {
                fontWeight: this.state.onHistory ? "500" : "normal",
                marginLeft: "5.31%",
                color: this.state.onHistory ? "#2EBAAB" : "#274541"
              }
            ]}
          >
            My requests
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.onZones();
            this.props.navigation.navigate("Zonelist", {
              user: this.state.user
            });
          }}
          style={[
            styles.itemContainer,
            {
              backgroundColor: this.state.onZones ? "#F0F2F2" : "#F8F9F9"
            }
          ]}
        >
          {this.state.onZones && <View style={styles.selectedItem} />}
          {this.state.onZones && (
            <Image source={Images.zone_drawer} style={styles.selectedIcon} />
          )}
          {!this.state.onZones && (
            <Image
              source={Images.zone_drawer_black}
              style={styles.unselectedIcon}
            />
          )}
          <Text
            style={[
              styles.itemText,
              {
                fontWeight: this.state.onZones ? "500" : "normal",
                marginLeft: "5.31%",
                color: this.state.onZones ? "#2EBAAB" : "#274541"
              }
            ]}
          >
            Zones
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.onAssets();
            this.props.navigation.navigate("AssetList", {
              user: this.state.user
            });
          }}
          style={[
            styles.itemContainer,
            {
              backgroundColor: this.state.onAssets ? "#F0F2F2" : "#F8F9F9"
            }
          ]}
        >
          {this.state.onAssets && <View style={styles.selectedItem} />}
          {this.state.onAssets && (
            <Image source={Images.asset_drawer} style={styles.selectedIcon} />
          )}
          {!this.state.onAssets && (
            <Image
              source={Images.asset_drawer_black}
              style={styles.unselectedIcon}
            />
          )}
          <Text
            style={[
              styles.itemText,
              {
                fontWeight: this.state.onAssets ? "500" : "normal",
                marginLeft: "5.31%",
                color: this.state.onAssets ? "#2EBAAB" : "#274541"
              }
            ]}
          >
            Assets
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.onLogout();
          }}
          style={[
            styles.itemContainer,
            {
              backgroundColor: "#F8F9F9"
            }
          ]}
        >
          <Image source={Images.logout_black} style={styles.unselectedIcon} />
          <Text
            style={[
              styles.itemText,
              {
                fontWeight: "normal",
                marginLeft: "5.31%",
                color: "#274541"
              }
            ]}
          >
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: (13.49 * Metrics.screenHeight) / 100,
    backgroundColor: "#F8F9F9"
  },
  itemContainer: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    height: "8.4%"
  },
  username: {
    color: "#274541",
    fontFamily: "Roboto-Medium",
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 21,
    textAlign: "center"
  },
  userInfo: {
    color: "#274541",
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    lineHeight: 16
  },
  userContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: (3.15 * Metrics.screenHeight) / 100
  },
  selectedItem: {
    backgroundColor: "#2EBAAB",
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
    width: "1.04%",
    height: "100%",
    marginRight: "6%"
  },
  itemText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19
  },
  selectedIcon: {
    width: (6.4 * Metrics.screenWidth) / 100,
    height: (6.4 * Metrics.screenWidth) / 100
  },
  unselectedIcon: {
    width: (6.4 * Metrics.screenWidth) / 100,
    height: (6.4 * Metrics.screenWidth) / 100,
    marginLeft: (5.31 * Metrics.screenWidth) / 100
  }
});
