import { StyleSheet } from "react-native";
import { ApplicationStyles, Colors, Fonts, Metrics } from "../../Themes/";

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  container: {
    flex: 1,
    backgroundColor: Colors.white
  },

  titleText: {
    fontSize: Fonts.size.h3,
    color: Colors.facebook,
    marginLeft: Metrics.baseMargin
  },

  datePicker: {
    width: Metrics.screenWidth,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: Metrics.doubleBaseMargin
  },

  label: {
    fontSize: Fonts.size.label
  },

  input: {
    fontSize: Fonts.size.input
  },
  
  addButton: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 15,
    width: "80%",
    backgroundColor: "#ff9c46"
  }
});
