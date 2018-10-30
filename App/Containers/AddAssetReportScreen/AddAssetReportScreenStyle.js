import { StyleSheet } from "react-native";
import { Font, Metrics } from "../../Themes/";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F8F8",
  },
  image: {
    width: Metrics.screenWidth*0.192,
    height: Metrics.screenHeight*0.1079,
  },
  generalInfoContainer: {
    marginTop: Metrics.screenHeight * 0.03,
    marginBottom: Metrics.screenHeight * 0.03,
    marginLeft: Metrics.screenWidth * 0.0533,
    marginRight: Metrics.screenWidth * 0.0533,
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 3
  },
  scrollView: {
    backgroundColor: "white",
    flex: 1
  },
  text2: {
    color: "#CCCFCE",
    fontSize: 13,
    letterSpacing: 1.08,
    fontWeight: "bold",
    lineHeight: 15,
    height: Metrics.screenHeight * 0.0225
  },
  check_box_text: {
    color: "#274541",
    fontWeight: "normal",
    fontSize: 16,
    lineHeight: 18,
    marginLeft: Metrics.screenWidth * 0.0213
  },
  nameOfIt: {
    fontWeight: "500",
    color: "#274541",
    fontSize: 16,
    lineHeight: 18
  },
  itDescription: {
    color: "#A5ADAD",
    fontWeight: "normal",
    fontSize: 14,
    lineHeight: 16
  },
  otherContainer1: {
    marginTop: Metrics.screenHeight * 0.018,
    flexDirection: "row",
    alignItems: "center"
  },
  check_box: {
    width: 19,
    height: 19
  },
  inputOfOptionNote: {
    marginTop: Metrics.screenHeight * 0.012,
    marginLeft: Metrics.screenWidth * 0.072,
    height: Metrics.screenHeight * 0.072,
    borderColor: "#F0F2F2",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 3,
    shadowColor: "rgba(227,230,230,0.12)",
    color: "#274541",
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "normal",
    paddingLeft: Metrics.screenWidth * 0.032,
    paddingRight: Metrics.screenWidth * 0.0533,
    paddingVertical: Metrics.screenHeight * 0.024
  },
  inputOfNewRequestNote: {
    marginTop: Metrics.screenHeight * 0.012,
    marginLeft: Metrics.screenWidth * 0.1253,
    width: Metrics.screenWidth * 0.8213,
    height: Metrics.screenHeight * 0.072,
    borderColor: "#F0F2F2",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 3,
    shadowColor: "rgba(227,230,230,0.12)",
    color: "#274541",
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "normal",
    paddingLeft: Metrics.screenWidth * 0.032,
    paddingRight: Metrics.screenWidth * 0.0533,
    paddingVertical: Metrics.screenHeight * 0.024
  },
  addNoteTouchableOpacity: {
    position: "absolute",
    marginLeft: Metrics.screenWidth * 0.704,
    marginTop: Metrics.screenHeight * 0.0405,
    height: Metrics.screenHeight * 0.027,
    width: Metrics.screenWidth * 0.1894,
    alignItems: "center",
    flexDirection: "row"
  },
  addNoteImage: {
    width: Metrics.screenWidth * 0.0267,
    height: Metrics.screenHeight * 0.015
  },
  addNoteText: {
    marginLeft: Metrics.screenWidth * 0.0107,
    color: "#50C3B8",
    fontSize: 14,
    lineHeight: 18
  },
  priorityContainer: {
    marginTop: Metrics.screenHeight * 0.0375,
    marginLeft: Metrics.screenWidth * 0.0533,
    marginRight: Metrics.screenWidth * 0.0533
  },
  shouldAndMustContainer: {
    height: Metrics.screenHeight * 0.06,
    marginTop: Metrics.screenHeight * 0.012,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderColor: "#CCCFCE",
    borderWidth: 1,
    borderStyle: "solid",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    shadowColor: "rgba(227,230,230,0.12)"
  },
  otherContainer2: {
    flex: 1,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  imageContainer: {
    marginTop: Metrics.screenHeight * 0.0375,
    marginBottom: Metrics.screenHeight * 0.1964,
    height: Metrics.screenHeight * 0.1424,
    marginLeft: Metrics.screenWidth * 0.0533,
    width: Metrics.screenWidth * 0.8934
  },
  otherContainer3: {
    flexDirection: "row",
    height: Metrics.screenHeight * 0.1199,
    alignItems: "flex-end"
  },
  issueImage: {
    width: Metrics.screenWidth * 0.192,
    height: Metrics.screenHeight * 0.1079,
    borderRadius: 3
  },
  issueImageContainer: {
    marginLeft: Metrics.screenWidth * 0.0427,
    width: Metrics.screenWidth * 0.192,
    height: Metrics.screenHeight * 0.1079,
    borderRadius: 3
  },
  addImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "stretch"
  },
  closeIssueImageContainer1: {
    position: "absolute",
    width: Metrics.screenWidth * 0.0693,
    height: Metrics.screenHeight * 0.039,
    marginLeft: Metrics.screenWidth * 0.1467,
    marginTop: Metrics.screenHeight * 0.0195
  },
  closeIssueImageContainer2: {
    position: "absolute",
    width: Metrics.screenWidth * 0.0693,
    height: Metrics.screenHeight * 0.039,
    marginLeft: Metrics.screenWidth * 0.3814,
    marginTop: Metrics.screenHeight * 0.0195
  },
  closeIssueImageContainer3: {
    position: "absolute",
    width: Metrics.screenWidth * 0.0693,
    height: Metrics.screenHeight * 0.039,
    marginLeft: Metrics.screenWidth * 0.6161,
    marginTop: Metrics.screenHeight * 0.0195
  },
  closeIssueImageContainer4: {
    position: "absolute",
    width: Metrics.screenWidth * 0.0693,
    height: Metrics.screenHeight * 0.039,
    marginLeft: Metrics.screenWidth * 0.8508,
    marginTop: Metrics.screenHeight * 0.0195
  },
  closeIssueImage: {
    width: Metrics.screenWidth * 0.0693,
    height: Metrics.screenHeight * 0.039
  },
  closeNoteContainer1: {
    position: "absolute",
    marginTop: Metrics.screenHeight * 0.093,
    marginLeft: Metrics.screenWidth * 0.8507,
    width: Metrics.screenWidth * 0.064,
    height: Metrics.screenHeight * 0.036
  },
  closeNote: {
    width: Metrics.screenWidth * 0.064,
    height: Metrics.screenHeight * 0.036
  },
  otherContainer4: {
    position: "absolute",
    bottom: 0,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight * 0.1634,
    alignItems: "center",
    justifyContent: "center"
  },
  submitContainer: {
    width: Metrics.screenWidth * 0.8933,
    height: Metrics.screenHeight * 0.072,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2EBAAB",
    borderRadius: 3
  },
  submitText: {
    color: "white",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "bold"
  },

  //Exit dialog
  exitModalContainer: {
    marginTop: Metrics.screenHeight * 0.3688, //0.2489
    height: Metrics.screenHeight * 0.2119,
    width: Metrics.screenWidth * 0.84,
    borderRadius: 3,
  },
  otherContainer5: {
    height: Metrics.screenHeight * 0.1454,
    alignItems: "center"
  },
  confirmCancelText: {
    //width: Metrics.screenWidth * 0.3627,
    height: Metrics.screenHeight * 0.036,
    marginTop: Metrics.screenHeight * 0.036,
    color: "#274542",
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "500"
  },
  areYouSureText: {
    //width: Metrics.screenWidth * 0.5467,
    height: Metrics.screenHeight * 0.024,
    marginTop: Metrics.screenHeight * 0.012,
    color: "#274542",
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "normal"
  },
  yesNoContainer: {
    flex: 1,
    flexDirection: "row",
    borderTopColor: "rgba(225,225,225,0.5)",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderWidth: 1
  },
  noContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "rgba(225,225,225,0.5)",
    borderBottomColor: "transparent",
    borderWidth: 0.5
  },
  noText: {
    color: "#274542",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "normal"
  },
  yesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderTopColor: "transparent",
    borderLeftColor: "rgba(225,225,225,0.5)",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderWidth: 0.5
  },
  yesText: {
    color: "#2EBAAB",
    fontSize: 16,
    lineHeight: 18,
    fontWeight: "normal"
  }
});

export default styles;
