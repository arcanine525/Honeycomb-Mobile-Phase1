import { StyleSheet, Dimensions } from "react-native";
import { ApplicationStyles, Metrics, Fonts } from "../../Themes/";

const _width = Metrics.screenWidth;
const _height = Metrics.screenHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9F9"
  },
  otherContainer1: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: _height * 0.045,
    marginHorizontal: _width * 0.0533
  },
  totalRequestText: {
    color: "#CCCFCE",
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 1,
    lineHeight: 15
  },
  fitlerByText: {
    color: "#8C9B99",
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 16,
    marginRight: _width*0.02,
  },
  dropDownStyle: {
    color: "#274542",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 16,
  },
  filterText: {
    color: "#274542",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 16
  },
  itemContainer: {
    backgroundColor: "white",
    marginHorizontal: _width * 0.0533,
    marginTop: _height * 0.024,
    marginBottom: _height*0.001,
    shadowColor: "rgba(204,207,207,0.12)",
    shadowOffset: { width: 0, height: 0 },
    elevation: 2,
    borderRadius: 3
  },
  otherContainer2: {
    flexDirection: "row",
    marginHorizontal: _width * 0.0427,
    marginVertical: _height * 0.015,
    alignItems: "center"
  },
  senderText: {
    fontSize: 14,
    lineHeight: 16,
    color: "#A5ADAD",
    marginLeft: _width * 0.0213
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderColor: "#F8F8F8"
  },
  typeText: {
    color: "#274541",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500"
  },
  noteText: {
    marginTop: _height * 0.012,
    color: "#A5ADAD",
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "normal"
  },
  dateText: {
    fontSize: 14,
    lineHeight: 16,
    color: "#CCCFCE"
  },
  otherContainer3: {
    flexDirection: "row",
    marginHorizontal: _width * 0.0427,
    marginVertical: _height * 0.0165
  },
  shouldImage: {
    position: "absolute",
    right: 0,
    width: _width * 0.168,
    height: _height * 0.027
  },
  mustImage: {
    position: "absolute",
    right: 0,
    width: _width * 0.1307,
    height: _height * 0.027
  }
});

export default styles;
