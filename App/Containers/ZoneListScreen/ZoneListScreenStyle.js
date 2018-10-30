import { StyleSheet } from "react-native";
import { Font, Metrics } from "../../Themes/";

const _width = Metrics.screenWidth;
const _height = Metrics.screenHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9F9",
  },
  searchBarContainer: {
    backgroundColor: "white",
    borderRadius: 3,
    shadowColor: "rgba(227,230,230,0.12)",
    marginLeft: _width * 0.0533,
    marginRight: _width * 0.0533,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  searchIconContainer: {
    width: 13.81,
    height: 13.81,
    marginLeft: _width * 0.0329
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "stretch",
  },
  image2:{
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
  },
  searchText: {
    //marginLeft: _width * 0.0263,
    width: _width * 0.817,
    paddingHorizontal: _width * 0.0263,
    paddingVertical: _width * 0.0159,
    color: "#CCCFCE",
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "normal"
  },
  totalZoneText: {
    fontWeight: "bold",
    fontSize: 13,
    lineHeight: 15,
    color: "#CCCFCE",
    letterSpacing: 1
  },
  allZoneContainer: {
    marginLeft: _width * 0.0533,
    marginRight: _width * 0.0533,
    marginTop: _height * 0.0266
  },
  itemContainer: {
    width: _width * 0.4187,
    borderRadius: 3,
    marginRight: _width * 0.056,
    marginBottom: _height * 0.0266,
    backgroundColor: "white",
    shadowColor: "rgba(204,207,207,0.12)",
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  zoneAvatarContainer: {
    width: "100%",
    height: _height * 0.1328,
    borderRadius: 3
  },
  zoneName: {
    marginTop: _height * 0.0186,
    marginLeft: _width * 0.0373,
    marginRight: _width * 0.0373,
    color: "#274541",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 16
  },
  totalAsset: {
    marginTop: _height * 0.0106,
    marginLeft: _width * 0.0373,
    marginBottom: _height * 0.0186,
    fontWeight: "normal",
    fontSize: 14,
    lineHeight: 16,
    color: "#A5ADAD"
  },
  otherContainer1: {
    borderTopWidth: 1,
    borderTopColor: "#F8F8F8",
    marginLeft: _width * 0.0373,
    marginRight: _width * 0.0373,
    marginBottom: _height * 0.0114,
    shadowColor: "rgba(225,225,225,0.5)",
    flexDirection: "row"
  },
  requests_text: {
    fontSize: 12,
    lineHeight: 14,
    color: "#F2A63C",
    fontWeight: "500",
    marginLeft: _width * 0.016,
    marginTop: _height * 0.0094
  },
  non_requests_text: {
    fontSize: 12,
    lineHeight: 14,
    color: "#CCCFCE",
    fontWeight: "500",
    marginLeft: _width * 0.016,
    marginTop: _height * 0.0094
  }
});

export default styles;
