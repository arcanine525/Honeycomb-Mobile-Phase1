import { StyleSheet } from "react-native";
import { Font, Metrics } from "../../Themes/";

const _width = Metrics.screenWidth;
const _height = Metrics.screenHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  zoneNameText: {
    marginTop: _height * 0.025,
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
    borderBottomWidth: 1
  },
  titleText: {
    color: "#CCCFCE",
    fontWeight: "bold",
    fontSize: 13,
    lineHeight: 15,
    letterSpacing: 1.08,
    marginLeft: _width * 0.0533
  },
  dataText: {
    marginTop: _height * 0.012,
    color: "#274541",
    fontWeight: "normal",
    fontSize: 16,
    lineHeight: 18,
    marginLeft: _width * 0.0533
  },
  imageContainer: {
    marginLeft: _width * 0.0533,
    width: _width * 0.0273,
    height: _height * 0.0153
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "stretch"
  },
  goodText: {
    marginLeft: _width * 0.0203,
    fontSize: 15,
    fontWeight: "normal",
    lineHeight: 16,
    color: "#16C72E"
  },
  badText: {
    marginLeft: _width * 0.0203,
    fontSize: 15,
    fontWeight: "normal",
    lineHeight: 16,
    color: "#FF1616"
  },
  assetAvatar: {
    width: 54,
    height: 54,
    borderRadius: 3,
    marginLeft: _width * 0.0533,
    marginVertical: _height * 0.0199
  },
  otherContainer:{
    marginLeft: _width * 0.0427,
    marginVertical: _height * 0.0198
  },
  assetNameText: {
    color: '#274541',
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0
  },
  assetIdText:{
    color: '#A5ADAD',
    fontWeight: "500",
    fontSize: 13,
    lineHeight: 15  ,
    letterSpacing: 0.46
  },
  assetZoneText:{
    color: '#A5ADAD',
    fontWeight: "normal",
    fontSize: 13,
    lineHeight: 15  ,
    letterSpacing: 0
  }
});

export default styles;
