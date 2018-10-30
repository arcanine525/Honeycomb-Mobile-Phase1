import { StyleSheet, Platform } from "react-native";
import { ApplicationStyles, Metrics } from "../../Themes/";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  cardStyle: {
    borderRadius: 3, 
    marginLeft: Metrics.screenWidth * 0.0533, 
    marginRight: Metrics.screenWidth * 0.0533, 
    marginTop: Metrics.screenHeight * 0.0194,
    marginBottom: Metrics.screenHeight * 0.001,
    backgroundColor: 'white',
    shadowOffset:{
      width: 0,
      height: 5,
    },
    shadowRadius: 5,
    elevation: Platform.OS == 'android' ? 3 : 0,
  },
  smallAvatarStyle: {
    width: Metrics.screenWidth * 0.064,
    height: Metrics.screenHeight * 0.036,
  },
  senderStyle: {
    marginLeft: Metrics.screenWidth * 0.0213,
    color: '#A5ADAD',
    fontSize: 14
  },
  priorityStyle: {
    fontSize: 14,
    fontWeight: "500",
  },
  noteTypeStyle: {
    fontSize: 16,
    fontWeight: "500",
    color: '#274541',
    lineHeight: 24
  },
  noteTextStyle: {
    color: '#A5ADAD',
    fontSize: 14,
    marginTop: Metrics.screenHeight * 0.012,
    lineHeight: 16
  },
  sendDateStyle: {
    color: '#CCCFCE',
    fontSize: 14,
  },
  statusStyle: {
    fontSize: 14,
    fontWeight: "500",
    color: 'white'
  },
  btnSubmitTextStyle: {
    fontSize: 16,
    lineHeight: 24, 
    color: 'white', 
    fontWeight: 'bold'
  },
  wrapPriorityStyle: {
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    borderWidth: 1, 
    borderRadius: 9, 
    backgroundColor: '#F0F2F2',
  },
  wrapStatusStyle: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    borderWidth: 1, 
    borderRadius: 13, 
  },
  wrapTopStyle: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginTop: Metrics.screenHeight * 0.015,
    marginLeft: Metrics.screenWidth * 0.0427,
    marginRight: Metrics.screenWidth * 0.0427,
    marginBottom: Metrics.screenHeight * 0.015
  },
  wrapMiddleStyle: {
    marginTop: Metrics.screenHeight * 0.024,
    marginLeft: Metrics.screenWidth * 0.0427,
    marginRight: Metrics.screenWidth * 0.0427,
    marginBottom: Metrics.screenHeight * 0.024,
  },
  wrapBottomStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Metrics.screenHeight * 0.015,
    marginLeft: Metrics.screenWidth * 0.0427,
    marginRight: Metrics.screenWidth * 0.0427,
    marginBottom: Metrics.screenHeight * 0.015
  },

  priorityMustStyle: {
    position: 'absolute', 
    right: 0, 
    width: 49, 
    height: 18, 
    resizeMode: "stretch"
  },

  priorityShouldStyle: {
    position: 'absolute', 
    right: 0, 
    width: 63, 
    height: 18, 
    resizeMode: "stretch"
  },
  
  statusNewStyle: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    width: 42,
    height: 18,
    resizeMode: "stretch"
  },

  statusInProgressStyle: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    width: 93,
    height: 18,
    resizeMode: "stretch" 
  },

  statusResolvedStyle: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    width: 60,
    height: 18,
    resizeMode: "stretch"
  }
});
