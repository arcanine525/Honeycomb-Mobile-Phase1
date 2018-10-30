import React, { Component } from "react";
import {
  View,
  AsyncStorage
} from 'react-native'
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createDrawerNavigator,
  StackActions,
  NavigationActions
} from "react-navigation";
import { Icon } from "react-native-elements";
import { TouchableOpacity, Image } from "react-native";

import QRScreen from "../Containers/QRScreen/QRScreen"
import AssetInfoScreen from "../Containers/AssetInfoScreen/AssetInfoScreen"
import AssetScreen from "..//Containers/AssetScreen/AssetScreen"
import UserHomeScreen from "../Containers/UserHomeScreen/UserHomeScreen";
import AddZoneReportScreen from "../Containers/AddZoneReportScreen/AddZoneReportScreen";
import AddAssetReportScreen from "../Containers/AddAssetReportScreen/AddAssetReportScreen";
import ZoneReportScreen from "../Containers/ZoneReportScreen/ZoneReportScreen";
import AssetsReportScreen from "../Containers/AssetReportScreen/AssetReportScreen"
import ZoneHistoryScreen from '../Containers/ZoneHistoryScreen/ZoneHistoryScreen'
import AssetHistoryScreen from '../Containers/AssetHistoryScreen/AssetHistoryScreen'
import UserReportDetailScreen from '../Containers/UserReportDetailScreen/UserReportDetailScreen'
import ZoneReportListScreen from '../Containers/ZoneReportListScreen/ZoneReportListScreen'
import AssetReportListScreen from '../Containers/AssetReportListScreen/AssetReportListScreen'
import ZoneList from '../Containers/ZoneListScreen/ZoneListScreen';
import StorageDetailScreen from "../Containers/StorageDetailScreen/StorageDetailScreen"
import StorageInfoScreen from "../Containers/StorageInfoScreen/StorageInfoScreen"
import Drawer from '../Components/Drawer/Drawer'
import { Colors, Images, Metrics } from '../Themes/'

class DrawerButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity
        style={{ marginLeft: (5.07 * Metrics.screenWidth) / 100 }}
        onPress={() => {
          this.props.navigation.openDrawer();
        }}
      >
        <Icon name="menu" size={30} color="white" />
      </TouchableOpacity>
    );
  }
}

const HistoryNav = createMaterialTopTabNavigator(
  {
    Assets: {
      screen: AssetHistoryScreen
    },
    Zone: {
      screen: ZoneHistoryScreen
    }
  },
  {
    initialRouteName: "Assets",
    tabBarOptions: {
      style: { backgroundColor: "white" },
      inactiveTintColor: "#A5ADAD",
      indicatorStyle: { backgroundColor: "#2EBAAB" },
      activeTintColor: "#2EBAAB",
      labelStyle: {
        height: (1.93 * Metrics.screenHeight) / 100,
        width: (14.4 * Metrics.screenWidth) / 100,
        fontSize: 13,
        fontWeight: "500",
        letterSpacing: 1,
        lineHeight: 16,
        textAlign: "center"
      }
    }
  }
);

const TopTabAssetInfo = createMaterialTopTabNavigator(
  {
    AssetInfo: {
      screen: AssetsReportScreen
    },
    RequestOfAssetInfo: {
      screen: AssetReportListScreen
    }
  },
  {
    initialRouteName: "AssetInfo",
    tabBarOptions: {
      style: {
        backgroundColor: "#F8F9F9",
        // shadowOpacity: 1,
        // shadowOffset:{
        //   width: 0,
        //   height: 0,
        // },
        // shadowRadius: 10,
        // elevation: 3,
      },
      labelStyle: {
        fontSize: 13,
        lineHeight: 16,
        letterSpacing: 1,
        fontWeight: "500"
      },
      indicatorStyle: {
        backgroundColor: "#2EBAAB"
      },
      activeTintColor: "#2EBAAB",
      inactiveTintColor: "#A5ADAD"
    }
  }
);

const UserStack = createStackNavigator(
  {
    QRScreen: {
      screen: QRScreen
    },
    HomeScreen: {
      screen: UserHomeScreen
    },
    HistoryNav: {
      screen: HistoryNav,
      navigationOptions: ({ navigation }) => ({
        title: "My report",
        headerStyle: {
          backgroundColor: "#50C3B8",
          height: Metrics.screenHeight * 0.0899,
          elevation: 0,
          shadowOpacity: 0
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          flex: 1,
          textAlign: "center"
        },
        headerLeft: (
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}
            style={{ marginLeft: 19 }}
          >
            <Icon name="menu" size={30} color="white" />
          </TouchableOpacity>
        ),
        headerRight: (
          <View
            style={{
              width: Metrics.screenWidth * 0.064,
              height: Metrics.screenHeight * 0.0319,
              marginRight: Metrics.screenWidth * 0.0427,
            }}
          />
        )
      })
    },
    UserReportDetailScreen: {
      screen: UserReportDetailScreen
    },
    ZoneReportScreen: {
      screen: ZoneReportScreen,
    },
    AssetList: {
      screen: AssetScreen
    },
    AssetReportScreen: {
      screen: TopTabAssetInfo,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.data ? navigation.state.params.data.name : '--',
        headerStyle: {
          backgroundColor: "#50C3B8",
          height: Metrics.screenHeight * 0.0899,
          shadowOpacity: 0,
          shadowOffset: {
            height: 0
          },
          shadowRadius: 0,
          elevation: 0
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          flex: 1,
          textAlign: 'center',
          fontSize: 16,
          lineHeight: 24,
          fontWeight: "500"
        },
        headerLeft: (
          <TouchableOpacity
            onPress={() => {
              if (navigation.state.params.screenNavigate == "UserHomeScreen") {
                navigation.state.params.UserHomeScreen._unlockScanQR();
                navigation.state.params.UserHomeScreen._turnOnCamera();
              }
              navigation.goBack();
            }}
            style={{ marginLeft: 14, width: 28, height: 28 }}
          >
            <Icon name="keyboard-backspace" color="white" />
          </TouchableOpacity>
        ),
        headerRight: (
          <TouchableOpacity
            onPress={async() => {
              if (navigation.state.params.screenNavigate == "UserHomeScreen") {
                navigation.state.params.UserHomeScreen._unlockScanQR();
              }
              let user =
              {
                  role: await AsyncStorage.getItem('role'),
                  username: await AsyncStorage.getItem('username'),
              }
              if(user.role == 'client'){
                //navigation.pop()
                if(navigation.state.params.screenNavigate == 'UserHomeScreen'
                  || navigation.state.params.screenNavigate == 'AssetScreen'
                  || navigation.state.params.screenNavigate == 'ZoneReportScreen'){
                  navigation.state.params.UserHomeScreen._unlockScanQR()
                  navigation.state.params.UserHomeScreen._turnOnCamera()
                  //navigation.state.params.UserHomeScreen.state.drawer.onScan()
                }

                // navigation.dispatch(
                //   StackActions.push({
                //     routeName: 'QRSreen',
                //     params: {flag: false}
                //   })
                // )
                navigation.navigate("QRScreen", {flag: false});
                // navigation.dispatch(
                //   StackActions.reset({
                //     index: 0,
                //     actions: [
                //       NavigationActions.navigate(
                //         { 
                //           routeName: 'QRScreen',
                //           params: {flag: true} 
                //         }
                //       )
                //     ],
                // }));
                // navigation.dispatch({
                //   type: 'ReplaceCurrentScreen',
                //   routeName: 'HomeScreen',
                //   params: { 
                //     flag: false 
                //   },
                // });
              }
              else{
                //navigation.pop()
                if(navigation.state.params.screenNavigate == 'UserHomeScreen'){
                  navigation.state.params.UserHomeScreen._unlockScanQR()
                  navigation.state.params.UserHomeScreen._turnOnCamera()
                }
                navigation.navigate("ManagerQR", {flag: false})
                // navigation.dispatch(
                //   StackActions.reset({
                //     index: 0,
                //     actions: [
                //       NavigationActions.navigate(
                //         { 
                //           routeName: 'ManagerQR',
                //           params: {flag: true} 
                //         }
                //       )
                //     ],
                // }));
              }
            }}
            style={{ width: Metrics.screenWidth * 0.1013 }}
          >
            <Image source={Images.qr} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        )
      })
    },
    AddZoneReportScreen: {
      screen: AddZoneReportScreen
    },

    AddAssetReportScreen: {
      screen: AddAssetReportScreen
    },
    ZoneReportListScreen: {
      screen: ZoneReportListScreen
    },
    Zonelist: {
      screen: ZoneList
    },   
    "StorageDetailScreen": {
      screen: StorageDetailScreen
    },
    "StorageInfoScreen": {
      screen: StorageInfoScreen
    }
  },
  {
    initialRouteName: "HomeScreen",
    mode: "card",
    navigationOptions:
    {
      gesturesEnabled: false,
    }
  }
);

const prevGetStateForActionUserStack = UserStack.router.getStateForAction;
UserStack.router.getStateForAction = (action, state) => {
    if (state && action.type === 'ReplaceCurrentScreen') {
      const routes = state.routes.slice(0, state.routes.length - 1);
      routes.push(action);
      return {
        ...state,
        routes,
        index: routes.length - 1,
      };
    }
  return prevGetStateForActionUserStack(action, state);
}

const DrawerNav = createDrawerNavigator(
  {
    ScanQR: {
      screen: UserStack,
      navigationOptions: {
        title: "Scan QR",
        drawerLockMode: 'locked-closed',
      }
    },
    HistoryNav: {
      screen: HistoryNav,
      navigationOptions: {
        title: "My Report"
      }
    }
  },
  {
    contentComponent: Drawer,
  }
);



export default DrawerNav;
