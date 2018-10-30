
import { StyleSheet, Dimensions } from "react-native";
import { ApplicationStyles, Metrics, Fonts } from "../../Themes/";

export default StyleSheet.create({
  container: {
    flex: 1
  },

  title: {
    ...Fonts.style.h1,
    textAlign: "center"
  },

  description: {
    ...Fonts.style.h5,
    marginLeft: Metrics.baseMargin
  },

  item: {
    //marginLeft: Metrics.baseMargin
  },

  avatar: {
    borderRadius: Metrics.doubleBaseMargin,
    height: Metrics.images.medium,
    width: Metrics.images.medium,
    resizeMode: "contain"
  },

  headerContainer: {
    flexDirection: "row"
  },

  headerText: {
    marginLeft: Metrics.baseMargin
  },
  status: {
    position: "absolute",
    right: 0,
    backgroundColor: 'blue'
  },

  flatlist: {
    margin: Metrics.baseMargin
  }
});
