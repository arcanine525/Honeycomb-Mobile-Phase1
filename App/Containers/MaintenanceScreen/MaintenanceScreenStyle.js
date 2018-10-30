import { StyleSheet } from "react-native";
import { ApplicationStyles, Colors, Fonts, Metrics } from "../../Themes/";

const _width = Metrics.screenWidth;
const _height = Metrics.screenHeight;

export default StyleSheet.create({
  container: { backgroundColor: "#F8F9F9", flex: 1 },
  itemContainer: {
    marginHorizontal: _width * 0.0533,
    backgroundColor: "white",
    marginTop: _height * 0.024,
    marginBottom: _height*0.001,
    borderRadius: 3,
    shadowColor: "rgba(204,207,207,0.12)",
    shadowOffset: { width: 0, height: 0 },
    elevation: 2
  },
  otherContainer1: {
    marginLeft: _width * 0.0427,
    marginVertical: _height * 0.024
  },
  titleText: {
    fontWeight: "500",
    fontSize: 13,
    lineHeight: 18,
    color: "#CCCFCE"
  },
  dataText: {
    marginTop: _height*0.003,
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 22,
    color: "#274541"
  },
  horizontalLine: {
    borderBottomColor: "#F9F8F8",
    borderBottomWidth: 1,
  },
  dateText:{
    fontWeight: "normal",
    fontSize: 13,
    lineHeight: 16,
    color: "#CCCFCE",
    marginLeft:_width*0.0427,
    marginVertical: _height*0.015 
  },
  goodText:{
    fontWeight: "normal",
    fontSize: 13,
    lineHeight: 16,
    color: "#16C72E",
    marginLeft:_width*0.0123
  },
  badText:{
    fontWeight: "normal",
    fontSize: 13,
    lineHeight: 16,
    color: "#FF1616",
    marginLeft:_width*0.0123
  },
  checkText:{
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 24,
    color: "#FFFFFF",
  },
  blurContainer:{
    bottom: 0,
    position: "absolute",
    height: _height * 0.1634,
    width: "100%",
    alignItems: 'flex-end',
  },
  maintenanceCheck:{
    width: '100%',
    backgroundColor: '#2EBAAB',
    height:_height*0.072,
    alignItems:'center',
    justifyContent:'center',
  },
  otherContainer2:{
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    right: _width * 0.0427,
    marginVertical: _height * 0.015,
  }
});
