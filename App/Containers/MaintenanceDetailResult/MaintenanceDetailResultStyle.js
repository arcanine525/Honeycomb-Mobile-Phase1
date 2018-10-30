import { StyleSheet } from "react-native";
import { Font, Metrics } from "../../Themes/";

const _width = Metrics.screenWidth;
const _height = Metrics.screenHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  horizontalLine: {
    borderBottomColor: "#F9F8F8",
    borderBottomWidth: 1
  },
  titleText: {
    color: "#CCCFCE",
    fontWeight: "bold",
    fontSize: 13,
    lineHeight: 15,
    letterSpacing: 1.08,
    marginTop: _height * 0.03,
    marginBottom: _height * 0.012
  },
  totalCheckText: {
    color: "#8C9B99",
    fontWeight: "bold",
    fontSize: 13,
    lineHeight: 15,
    letterSpacing: 1.08,
    marginLeft: _width * 0.01,
    marginTop: _height * 0.03,
    marginBottom: _height * 0.012
  },
  otherContainer: {
    height: _height * 0.0645,
    backgroundColor: "#FFFFFF",
    flexDirection: "row"
  },
  image: {
    width: _width * 0.1227,
    height: _height * 0.069,
    marginVertical: _height * 0.024,
    borderRadius: 3,
    marginLeft: _width * 0.0533
  },
  assetNameText: {
    color: "#274541",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0
  },
  assetIdText: {
    color: "#A5ADAD",
    fontWeight: "500",
    fontSize: 13,
    lineHeight: 15,
    letterSpacing: 0.46
  },
  assetPastText: {
    position: "absolute",
    color: "#8C9B99",
    fontWeight: "normal",
    fontSize: 14,
    lineHeight: 16,
    left: _width * 0.648
  },
  assetCurrentText: {
    position: "absolute",
    color: "#274541",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 16,
    left: _width * 0.8387
  }
});

export default styles;
