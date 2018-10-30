import React, { Component } from "react";
import { View, AsyncStorage } from "react-native";
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createDrawerNavigator
} from "react-navigation";
import { Icon } from "react-native-elements";
import { TouchableOpacity, Image } from "react-native";
import { Colors, Metrics, Images } from "../Themes/";

import AssetScreen from "../Containers/AssetScreen/AssetScreen";
import AssetReportListScreen from "../Containers/AssetReportListScreen/AssetReportListScreen";
import AssetReportScreen from "../Containers/AssetReportScreen/AssetReportScreen";
import EditAssetScreen from "../Containers/EditAssetScreen/EditAssetScreen";
import QRScreen from "../Containers/QRScreen/QRScreen";
import ReportScreen from "../Containers/ReportScreen/ReportScreen";
import ReportDetailScreen from "..//Containers/ReportDetailScreen/ReportDetailScreen";
import MonthlyCheckingScreen from "../Containers/MonthlyCheckingScreen/MonthlyCheckingScreen";
import MaintainanceCheckScreen from "../Containers/MaintainanceCheckScreen/MaintainanceCheckScreen";
import ZoneListScreen from "../Containers/ZoneListScreen/ZoneListScreen";
import ReportResultDetailScreen from "../Containers/ReportResultDetailScreen/ReportResultDetailScreen";
import MaintenanceScreen from "../Containers/MaintenanceScreen/MaintenanceScreen";
import ManagerDrawer from "../Components/ManagerDrawer/ManagerDrawer";
import ZoneInformationScreen from "../Containers/ZoneInfomationScreen/ZoneInfomationScreen";
import ZoneRequestScreen from "../Containers/ZoneRequestScreen/ZoneRequestScreen";
import UserReportDetailScreen from "../Containers/UserReportDetailScreen/UserReportDetailScreen";
import AddAssetReportScreen from "../Containers/AddAssetReportScreen/AddAssetReportScreen";
import AddZoneReportScreen from "../Containers/AddZoneReportScreen/AddZoneReportScreen";
import AssetHistoryScreen from "../Containers/AssetHistoryScreen/AssetHistoryScreen";
import ZoneHistoryScreen from "../Containers/ZoneHistoryScreen/ZoneHistoryScreen";
import UserHomeScreen from '../Containers/UserHomeScreen/UserHomeScreen'
import StorageListScreen from "../Containers/StorageListScreen/StorageListScreen";
import StorageInfoScreen from "../Containers/StorageInfoScreen/StorageInfoScreen";
import StorageAssetListScreen from "../Containers/StorageAssetListScreen/StorageAssetListScreen";
import MaintenanceGeneralResultScreen from "../Containers/MaintenanceGeneralResult/MaintenanceGeneralResult";
import MaintenanceDetailResult from "../Containers/MaintenanceDetailResult/MaintenanceDetailResult";
const _width = Metrics.screenWidth;
const _height = Metrics.screenHeight;

// const MonthlyCheckingStack = createStackNavigator({
//     "Maintainance":
//     {
//         screen: MaintenanceScreen,
//         navigationOptions:
//         {
//             title: 'Maintainance'
//         }
//     },
//     'MaintainanceCheck': {
//         screen: MaintainanceCheckScreen,
//     },
//     'MonthlyChecking': {
//         screen: MonthlyCheckingScreen
//     }
// },{
//     initialRouteName: 'Maintainance',
//     mode: 'card',
// })

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

const ZoneTab = createMaterialTopTabNavigator(
  {
    Request: {
      screen: ZoneRequestScreen,
      navigationOptions: {
        title: "Requests"
      }
    },
    Maintainance: {
      screen: MaintenanceScreen,
      navigationOptions: {
        title: "Maintenance"
      }
    },
    Asset: {
      screen: AssetScreen,
      navigationOptions: {
        title: "Assets"
      }
    },
    Storage: {
      screen: StorageListScreen,
      navigationOptions: {
        title: "Storages"
      }
    },
    General: {
      screen: ZoneInformationScreen,
      navigationOptions: {
        title: "General"
      }
    }
  },
  {
    initialRouteName: "Request",
    navigationOptions: {
      swipeEnabled: true
    },
    tabBarOptions: {
      scrollEnabled: true,
      style: {
        backgroundColor: "#F8F9F9"
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

const TopTabStorageInfo = createMaterialTopTabNavigator(
  {
    StorageAssetList: {
      screen: StorageAssetListScreen,
      title: "Assets"
    },
    StorageInfo: {
      screen: StorageInfoScreen,
      title: "General Info"
    }
  },
  {
    initialRouteName: "StorageAssetList",
    tabBarOptions: {
      style: {
        backgroundColor: "#F8F9F9"
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
const TopTabAssetReportInfo = createMaterialTopTabNavigator(
  {
    AssetInfo: {
      screen: AssetReportScreen
    },
    RequestOfAssetInfo: {
      screen: AssetReportListScreen
    }
  },
  {
    initialRouteName: "AssetInfo",
    tabBarOptions: {
      style: {
        backgroundColor: "#F8F9F9"
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
const MaintenanceResult = createMaterialTopTabNavigator(
  {
    GeneralReport: {
      screen: MaintenanceGeneralResultScreen
    },
    ReportDetail: {
      screen: MaintenanceDetailResult
    }
  },
  {
    initialRouteName: "GeneralReport",
    navigationOptions: {
      swipeEnabled: true
    },
    tabBarOptions: {
      style: {
        height: _height * 0.072,
        backgroundColor: "#F8F9F9",
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 0
        },
        shadowRadius: 10,
        elevation: 3
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

const RequestNav = createMaterialTopTabNavigator(
  {
    Assets: {
      screen: AssetHistoryScreen
    },
    Zones: {
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

const ManagerStack = createStackNavigator(
  {
    ManagerQR:
    {
      screen: QRScreen
    },
    ZoneList: {
      screen: ZoneListScreen
    },
    MaintenanceResult: {
      screen: MaintenanceResult,
      navigationOptions: ({ navigation }) => ({
        title: "Maintenance check " + navigation.state.params.date,
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
          fontSize: 16,
          lineHeight: 24
        },
        headerLeft: (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ZoneTab");
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
      })
    },
    RequestNav: {
      screen: RequestNav,
      navigationOptions: ({ navigation }) => ({
        title: "Requests",
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
              marginRight: Metrics.screenWidth * 0.0427
            }}
          />
        )
      })
    },
    MaintainanceCheck: {
      screen: MaintainanceCheckScreen
    },
    MonthlyChecking: {
      screen: MonthlyCheckingScreen
    },
    ZoneTab: {
      screen: ZoneTab,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params ? navigation.state.params.item.name : '--',
        headerStyle: {
          backgroundColor: "#50C3B8",
          height: Metrics.screenHeight * 0.0899,
          elevation: 0,
          shadowOpacity: 0
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          flex: 1,
          textAlign: "center",
          fontSize: 16,
          lineHeight: 24,
          fontWeight: "500"
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
          <TouchableOpacity
            onPress={() => {
              let data = {zone_info: navigation.state.params.item,
              submit: navigation.state.params.item.submit}
              let key = navigation.state.key
              navigation.navigate('AddZoneReportScreen', {
                screen: "ZoneTab",
                component: data,
                key: key
              })
            }}
            style={{
              width: Metrics.screenWidth * 0.064,
              height: _height * 0.0319,
              marginRight: 16
            }}
          >
            <Image
              source={Images.white_flag}
              style={{
                width: null,
                height: null,
                flex: 1,
                resizeMode: "stretch"
              }}
            />
          </TouchableOpacity>
        )
      })
    },
    ReportDetailManager: {
      screen: ReportDetailScreen,
      navigationOptions: {
        title: "Report Detail"
      }
    },
    AssetDetail: {
      screen: AssetReportScreen,
      navigationOptions: {
        title: "Asset Info"
      }
    },
    ManagerReportDetailScreen: {
      screen: UserReportDetailScreen,
      navigationOptions: {
        headerStyle: {
          backgroundColor: Colors.headerBackground,
          height: (9 * Metrics.screenHeight) / 100
        }
      }
    },
    AddAssetReportScreen: {
      screen: AddAssetReportScreen
    },
    AddZoneReportScreen: {
      screen: AddZoneReportScreen
    },

    AssetList: {
      screen: AssetScreen
    },
    StorageTab: {
      screen: TopTabStorageInfo,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params ? navigation.state.params.storage_info.name : '--',
        headerStyle: {
          backgroundColor: "#50C3B8",
          height: Metrics.screenHeight * 0.0899,
          elevation: 0,
          shadowOpacity: 0
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          flex: 1,
          textAlign: "center",
          fontSize: 16,
          lineHeight: 24,
          fontWeight: "500"
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
            // onPress={() => {
            //   if (navigation.state.params.screenNavigate == "UserHomeScreen") {
            //     navigation.state.params.UserHomeScreen._unlockScanQR();
            //   }
            //   navigation.navigate("HomeScreen");
            // }}
            style={{ width: Metrics.screenWidth * 0.1013 }}
          >
            <View style={{ width: 24, height: 24 }} />
          </View>
        )
      })
    },
    AssetReportScreen: {
      screen: TopTabAssetReportInfo,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params ? navigation.state.params.data.name : '--',
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
          textAlign: "center",
          fontSize: 16,
          lineHeight: 24,
          fontWeight: "500"
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
          <TouchableOpacity
            onPress={async () => {
              if (navigation.state.params.screenNavigate == "UserHomeScreen") {
                navigation.state.params.UserHomeScreen._unlockScanQR();
              }
              let user =
              {
                  role: await AsyncStorage.getItem('role'),
                  username: await AsyncStorage.getItem('username'),
              }
              if(user.role == 'client')
              navigation.navigate("HomeScreen", {flag: false});
              else
                navigation.navigate("ManagerQR", {flag: false})
            }}
            style={{ width: Metrics.screenWidth * 0.1013 }}
          >
            <Image source={Images.qr} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        )
      })
    }
  },
  {
    initialRouteName: "RequestNav",
    navigationOptions:
    {
      gesturesEnabled: false,
    },
    initialRouteParams: {
      //role: props.role,
    }
  }
);

const DrawerNav = createDrawerNavigator(
  {
    ManagerStack: {
      screen: ManagerStack,
      navigationOptions: 
      {
        
        drawerLockMode: 'locked-closed'
      }
    }
  },
  {
    contentComponent: ManagerDrawer,
    initialRouteName: "ManagerStack"
  }
);

export default DrawerNav;
