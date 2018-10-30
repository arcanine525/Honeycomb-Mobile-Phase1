import { StyleSheet } from "react-native";
import { Metrics } from "../../Themes/";

const _width = Metrics.screenWidth;
const _height = Metrics.screenHeight;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  zoneNameText: {
    marginTop: _height * 0.024,
    marginLeft: _width * 0.0533,
    color: "#274541",
    fontSize: 16,
    lineHeight: 18,
    fontWeight: "500"
  },
  zoneIdText: {
    marginTop: _height * 0.012,
    marginLeft: _width * 0.0533,
    color: "#A5ADAD",
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "500"
  },
  horizontalLine: {
    borderBottomColor: "#F9F8F8",
    borderBottomWidth: 1,
    marginTop: _height * 0.024
  },
  otherContainer1: {
    flexDirection: "row",
    marginTop: Metrics.screenHeight * 0.024,
    marginLeft: Metrics.screenWidth * 0.0533
  },
  titleText: {
    color: "#CCCFCE",
    fontWeight: "bold",
    fontSize: 13,
    lineHeight: 15,
    letterSpacing: 1.08
  },
  dataText: {
    marginTop: _height * 0.012,
    color: "#274541",
    fontWeight: "normal",
    fontSize: 16,
    lineHeight: 18
  },
  otherContainer2: {
    marginLeft: _width * 0.1707
  },
  otherContainer3: {
    flexDirection: "row",
    marginTop: Metrics.screenHeight * 0.045,
    marginLeft: Metrics.screenWidth * 0.0533
  },
  otherContainer4: {
    marginTop: Metrics.screenHeight * 0.045,
    marginLeft: Metrics.screenWidth * 0.0533
  },
  image: {
    width: _width * 0.192,
    height: _height * 0.1079,
    borderRadius: 3
  }
});
