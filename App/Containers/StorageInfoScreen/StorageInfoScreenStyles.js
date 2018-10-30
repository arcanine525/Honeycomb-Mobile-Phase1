import { StyleSheet } from "react-native";
import { ApplicationStyles, Colors, Fonts, Metrics } from "../../Themes/";

export default StyleSheet.create({
  reportButtonContainer: {
    position: "absolute",
    marginTop: Metrics.doubleBaseMargin,
    width: "100%",
    height: "7%",
    bottom: 0
  },

  reportButton: {
    flex: 1,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center"
  },
  reportButtonText: {
    fontSize: Fonts.size.h3,
    color: "white"
  },

  itemContainer: {
    flex: 1,
    flexDirection: "row"
  },

  itemText: {
    fontSize: Fonts.size.h5,
    color: "black"
  },
  itemLabel: {
    fontSize: Fonts.size.label,
    color: "black"
  },
  textBold: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black"
  },
  titleStyle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#CCCFCE',
    lineHeight: 15
  },
  firstViewStyle: {
    marginLeft: Metrics.screenWidth * 0.0533,
    marginTop: Metrics.screenHeight * 0.024,
  },
  secondViewStyle: {
    marginTop: Metrics.screenHeight * 0.024,
    marginLeft: Metrics.screenWidth * 0.0533,
    marginBottom: Metrics.screenHeight * 0.0795,
  },
  viewStyle: {
    marginTop: Metrics.screenHeight * 0.03,
  },
  imageStyle: {
    position: 'absolute',
    width: Metrics.screenWidth * 0.3733,
    height: Metrics.screenHeight * 0.2399,
    top: Metrics.screenHeight * 0.006,
    right: Metrics.screenWidth * 0.0533,
    borderRadius: 3,
  },
  zoneStyle: {
    fontSize: 16,
    color: '#2EBAAB', 
    fontWeight: "500",
    lineHeight: 18
  },
  assetStyle: {
    fontSize: 16,
    fontWeight: "500",
    color: '#274541',
    lineHeight: 18
  },
  statusStyle: {
  
  },
  categoryStyle: {
    fontSize: 16,
    color: '#274541',
    lineHeight: 18
  },
  priceStyle: {
    fontSize: 16,
    color: '#274541',
    lineHeight: 18
  },
  storageStyle: {
    fontSize: 16,
    color: '#2EBAAB', 
    fontWeight: "500",
    lineHeight: 18
  },
  descriptionStyle: {
    fontSize: 16,
    color: '#274541',
    lineHeight: 18
  },
  marginStyle: {
    marginTop: Metrics.screenHeight * 0.012
  },
  btnSubmitTextStyle: {
    fontSize: 16,
    lineHeight: 24, 
    color: 'white', 
    fontWeight: 'bold'
  },

  
});
