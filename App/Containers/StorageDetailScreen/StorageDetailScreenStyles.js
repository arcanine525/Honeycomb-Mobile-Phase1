import { StyleSheet } from "react-native";
import { Fonts, ApplicationStyles, Metrics } from "../../Themes/";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: "#F8F9F9"
  },
  image: {
    //width: Metrics.screenWidth,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  storage_pic: {
    height: null,
    width: Metrics.screenWidth,
    resizeMode: "cover"
  },
  cardStyle: {
    marginTop: 0.024 * Metrics.screenHeight,
    marginLeft: 0.0533 * Metrics.screenWidth,
    marginRight: 0.0533 * Metrics.screenWidth,
    backgroundColor: "white",
    borderRadius: 3,
    // shadowOpacity: 1,
    // shadowOffset: {
    //   height: 5
    // },
    // shadowRadius: 5,
    // elevation: 1
  },

  totalAssetStyle: {
    fontSize: 16,
    letterSpacing: 1,
    fontWeight: "bold",
    color: "#CCCFCE",
    marginLeft: Metrics.screenWidth * 0.0533
  },

  reportImageStyle: {
    width: 16,
    height: 19
  },

  asset_pic: {
    height: 72,
    width: 72,
    borderRadius: 3,
    resizeMode: "stretch"
  },

  topWrapper: {
    flexDirection: "row",
    marginLeft: 0.0427 * Metrics.screenWidth,
    marginTop: 0.024 * Metrics.screenHeight,
    marginBottom: 0.024 * Metrics.screenHeight,
    alignItems: "center",
    borderRadius: 3
    //justifyContent: 'center'
  },

  bottomWrapper: {
    marginTop: 0.012 * Metrics.screenHeight,
    marginBottom: 0.012 * Metrics.screenHeight,
    marginLeft: 0.0427 * Metrics.screenWidth,
    marginRight: 0.0427 * Metrics.screenWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  categoryStyle: {
    paddingLeft: 0.0213 * Metrics.screenWidth,
    paddingRight: 0.0213 * Metrics.screenWidth,
    paddingTop: 0.006 * Metrics.screenHeight,
    paddingBottom: 0.006 * Metrics.screenHeight,
    backgroundColor: "#F8F9F9",
    color: "#274541",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 16,
    borderRadius: 3
  },

  statusStyle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 16,
    marginTop: "1.8%"
  }
});
