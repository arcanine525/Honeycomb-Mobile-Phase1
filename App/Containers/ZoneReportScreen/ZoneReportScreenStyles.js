import { StyleSheet } from "react-native";
import { Fonts, ApplicationStyles, Metrics } from "../../Themes/";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: "#F8F9F9"
  },

  submitContainer: {
    // width: Metrics.screenWidth * 0.8933,
    height: Metrics.screenHeight * 0.072,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2EBAAB"
  },
  submitText: {
    color: "white",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "bold"
  },
  asset_pic: {
    height: 72,
    width: 72,
    borderRadius: 3,
    resizeMode: "stretch"
  },

  zone_pic: {
    height: 0.2476 * Metrics.screenHeight,
    width: Metrics.screenWidth,
    resizeMode: "cover"
  },

  imageContainer: {
    marginTop: Metrics.baseMargin,
    marginBottom: Metrics.doubleBaseMargin
  },

  image: {
    height: 0.2476 * Metrics.screenHeight,
    width: Metrics.screenWidth,
    //flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  flatlist: {
    marginBottom: 0.03 * Metrics.screenHeight,
    alignSelf: "center"
  },

  reportImageStyle: {
    width: 16,
    height: 19
  },

  cardStyle: {
    marginTop: 0.023 * Metrics.screenHeight,
    marginBottom: 0.001 * Metrics.screenHeight,
    marginLeft: 0.0533 * Metrics.screenWidth,
    marginRight: 0.0533 * Metrics.screenWidth,
    backgroundColor: "white",
    borderRadius: 3,
    // shadowOffset: {
    //   width: 0,
    //   height: 5
    // },
    // shadowRadius: 5,
    // elevation: 2
  },

  totalAssetStyle: {
    fontSize: 13,
    letterSpacing: 1,
    fontWeight: "bold",
    color: "#CCCFCE",
    marginLeft: Metrics.screenWidth * 0.0533
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
  },

  searchAndFilterWrapper: {
    height: 0.06 * Metrics.screenHeight,
    flexDirection: "row",
    marginTop: 0.03 * Metrics.screenHeight,
    marginBottom: 0.03 * Metrics.screenHeight,
    marginHorizontal: 0.0533 * Metrics.screenWidth
  },

  searchWrapper: {
    flex: 5.5,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 3,
    borderColor: "#F0F2F2",
    paddingLeft: 0.0329 * Metrics.screenWidth,
    backgroundColor: "white",
    // shadowOffset: {
    //   width: 0,
    //   height: 0
    // },
    // shadowRadius: 5,
    // elevation: 1
  },

  filterWrapper: {
    flex: 3.5,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 3,
    borderColor: "#F0F2F2",
    paddingRight: 0.0387 * Metrics.screenWidth,
    backgroundColor: "white",
    // shadowOffset: {
    //   width: 0,
    //   height: 0
    // },
    // shadowRadius: 5,
    // elevation: 1
  },

  searchCategoryStyle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#274542",
    letterSpacing: 1,
    fontFamily: "Roboto-Regular",
    marginTop: Metrics.screenHeight * 0.03,
    marginLeft: 0.0533 * Metrics.screenWidth
  },

  closeModalStyle: {
    width: 16.3,
    height: 16.3,
    marginTop: Metrics.screenHeight * 0.03,
    marginRight: Metrics.screenWidth * 0.0636
  },

  linearStyle: {
    flex: 2
  },

  cancelStyle: {
    fontSize: 14,
    //lineHeight: 16,
    fontWeight: "bold",
    fontFamily: "Roboto-Regular",
    color: "#2EBAAB"
  },

  applyStyle: {
    fontSize: 16,
    //lineHeight: 24,
    fontWeight: "bold",
    fontFamily: "Roboto-Regular",
    color: "white"
  },

  priorityMustStyle: {
    position: "absolute",
    alignSelf: "center",
    right: 0,
    width: 49,
    height: 18,
    marginRight: 0.0427 * Metrics.screenWidth,
    resizeMode: "stretch"
  },

  priorityShouldStyle: {
    position: "absolute",
    alignSelf: "center",
    right: 0,
    width: 63,
    height: 18,
    marginRight: 0.0427 * Metrics.screenWidth,
    resizeMode: "stretch"
  },
  statusInProgressStyle: {
    position: "absolute",
    alignSelf: "center",
    right: 0,
    width: 93,
    height: 18,
    marginRight: 0.0427 * Metrics.screenWidth,
    resizeMode: "stretch"
  },
  statusNewStyle: {
    position: "absolute",
    alignSelf: "center",
    right: 0,
    width: 42,
    height: 18,
    marginRight: 0.0427 * Metrics.screenWidth,
    resizeMode: "stretch"
  }
});
