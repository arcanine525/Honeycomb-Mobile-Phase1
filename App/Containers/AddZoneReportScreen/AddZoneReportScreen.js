import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
  AsyncStorage,
  Alert
} from "react-native";
import { StackActions, NavigationActions, withNavigation } from 'react-navigation';
import { Card, CheckBox, Icon } from "react-native-elements";
import { Images, Metrics } from "../../Themes";
import styles from "./AddZoneReportScreenStyle";
import Modal from "react-native-modalbox";
import LinearGradient from "react-native-linear-gradient";
import axios from "axios";
import RNFetchBlob from "rn-fetch-blob";

var ImagePicker = require("react-native-image-picker");

var options = {
  title: "Import your image",
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};

const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : -40;

const _width = Metrics.screenWidth;
const _height = Metrics.screenHeight;

class AddZoneReportScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      S3_Link: "",
      upload_key: null,
      upload_pic: null, ////FOR UPLOAD TESTING
      data: {},

      imageIssue1: null,
      imageUpload1: null,
      img1: false,
      imageIssue2: null,
      imageUpload2: null,
      img2: false,
      imageIssue3: null,
      imageUpload3: null,
      img3: false,
      imageIssue4: null,
      imageUpload4: null,
      img4: false,

      img_url: [],

      kindOfIssueViewHeight: Metrics.screenHeight * 0.1739,
      addExcessAssetNoteMarginTop: Metrics.screenHeight * 0.083,
      closeExcessAssetNoteMarginTop: Metrics.screenHeight * 0.1355,
      excessAssetNoteMarginTop: Metrics.screenHeight * 0.012,
      hightlightMarginTop: Metrics.screenHeight * 0.2759,
      missAssetChecked: false,
      excessAssetChecked: false,
      newRequestChecked: false,
      should: true,
      must: false,
      addMissAssetNote: false,
      addExcessAssetNote: false,
      missAssetNote: "",
      excessAssetNote: "",
      newRequestNote: "",
      componentState: null,
      submitFromZoneTab: null,
      user: {}
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let name;
    if (navigation.state.params.screen != "ZoneTab") {
      name =
        navigation.state.params.component.state.zone_info.name + " request";
    } else {
      name = navigation.state.params.component.zone_info.name + " request";
    }
    return {
      title: name,
      headerStyle: {
        height: Metrics.screenHeight * 0.09,
        backgroundColor: "#50C3B8",
        elevation: 0,
        shadowOpacity: 0
      },
      headerTitleStyle: {
        marginLeft: 50,
        color: "white",
        textAlign: "center",
        flex: 1
      },
      headerLeft: null,
      headerRight: (
        <TouchableOpacity
          style={{ marginHorizontal: Metrics.screenWidth * 0.056 }}
          onPress={() => params.exit()}
        >
          <Image
            source={Images.close_new_report_3x}
            style={{
              width: Metrics.screenWidth * 0.0373,
              height: Metrics.screenHeight * 0.0209
            }}
          />
        </TouchableOpacity>
      )
    };
  };

  _postDataToServer = async () => {
    try {
      let work = true;
      let types = [];
      let notes = [];
      let priority;
      let status = "NEW";
      let sender = this.state.user.username;
      let asset_id = "";
      let zone_id = this.state.componentState.zone_info.id;
      let send_date;
      let img_url = [];
      let today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!
      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }

      if (mm < 10) {
        mm = "0" + mm;
      }
      send_date = dd + "-" + mm + "-" + yyyy;
      await this.uploadAllImage();
      if (this.state.missAssetChecked) {
        types.push("Lost asset");
        let tmp = {
          note_type: "Lost asset",
          note_text: this.state.missAssetNote
        };
        notes.push(tmp);
      }
      if (this.state.excessAssetChecked) {
        types.push("Found asset");
        let tmp = {
          note_type: "Found asset",
          note_text: this.state.excessAssetNote
        };
        notes.push(tmp);
      }
      if (this.state.newRequestChecked) {
        types.push("Other request");
        if (this.state.newRequestNote.length != 0) {
          if (this.state.newRequestNote.length != 0) {
            let tmp = {
              note_type: "Other request",
              note_text: this.state.newRequestNote
            };
            notes.push(tmp);
          }
        } else {
          alert("Please add your other request");
          work = false;
        }
      }
      // if (this.props.navigation.state.params.screen = "ZoneTab") {
      //   alert("Chức năng này chưa chạy được");
      //   work = false;
      // }
      if (work == true) {
        if (this.state.should == true) {
          priority = "SHOULD";
        } else {
          priority = "MUST";
        }
        if (types.length == 0) {
          alert("Please check at least 1 issue");
        } else {
          axios.post("http://api.honeycomb2.geekup.vn/api/report", {
            status: status,
            type: types,
            priority: priority,
            sender: sender,
            note: notes,
            asset_id: "",
            zone_id: zone_id,
            send_date: send_date,
            img_url: this.state.img_url
          });
          if (this.props.navigation.state.params.screen != "ZoneTab") {
            this.props.navigation.state.params.component.setState({
              submitSuccess: true
            });
          }
          else{
            Alert.alert("","Your request has been sent successfully")
            const resetAction = StackActions.replace({
              key: this.props.navigation.state.params.key,
              newKey: this.props.navigation.state.params.key,
              //routeName
            });
            //this.props.navigation.dispatch(resetAction);    
            //console.warn(withNavigation(this))
          }
          this.props.navigation.goBack();
        }
      }
      // if(type.length == 0){
      //   alert("Please choose at least 1 issue problem")
      // }
      console.log("New zone report added!");
    } catch (error) {
      alert("Something went worng " + error);
    }
  };

  componentDidMount = async () => {
    this.props.navigation.setParams({ exit: this.exitDialog });
    let user = {
      role: "",
      username: ""
    };
    user.role = await AsyncStorage.getItem("role");
    user.username = await AsyncStorage.getItem("username");
    this.setState({ user: user });
  };

  componentWillMount() {
    const { params } = this.props.navigation.state;
    if (params.screen != "ZoneTab")
      this.setState({ componentState: params.component.state });
    else {
      this.setState({ componentState: params.component });
    }
  }

  openCamera() {
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response.uri);
      //console.warn("URI: " + response.uri);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let source = { uri: response.uri };
        if (this.state.imageIssue1 == null) {
          this.setState({ imageIssue1: source });
          this.setState({ img1: true });
          this.setState({ imageUpload1: response.data });
        } else if (this.state.imageIssue2 == null) {
          this.setState({ imageIssue2: source });
          this.setState({ img2: true });
          this.setState({ imageUpload2: response.data });
        } else if (this.state.imageIssue3 == null) {
          this.setState({ imageIssue3: source });
          this.setState({ img3: true });
          this.setState({ imageUpload3: response.data });
        } else if (this.state.imageIssue4 == null) {
          this.setState({ imageIssue4: source });
          this.setState({ img4: true });
          this.setState({ imageUpload4: response.data });
        }
      }
    });
  }

  exitDialog = () => {
    this.exitPopup.open();
  };

  addjustMarginTopWhenPressNewRequestCheckBox = () => {
    if (this.state.newRequestChecked) {
      this.setState({ newRequestChecked: false });

      if (this.state.addMissAssetNote && this.state.addExcessAssetNote) {
        this.setState({
          hightlightMarginTop: Metrics.screenHeight * 0.4439
        });
      }
      if (
        (this.state.addMissAssetNote && !this.state.addExcessAssetNote) ||
        (!this.state.addMissAssetNote && this.state.addExcessAssetNote)
      ) {
        this.setState({
          hightlightMarginTop: Metrics.screenHeight * 0.3599
        });
      }
      if (!this.state.addMissAssetNote && !this.state.addExcessAssetNote) {
        this.setState({
          hightlightMarginTop: Metrics.screenHeight * 0.2759
        });
      }
    } else {
      // When check new request
      this.setState({ newRequestChecked: true });
      if (this.state.addMissAssetNote && this.state.addExcessAssetNote) {
        this.setState({
          hightlightMarginTop: Metrics.screenHeight * 0.5279
        });
      }
      if (
        (this.state.addMissAssetNote && !this.state.addExcessAssetNote) ||
        (!this.state.addMissAssetNote && this.state.addExcessAssetNote)
      ) {
        this.setState({
          hightlightMarginTop: Metrics.screenHeight * 0.4439
        });
      }
      if (!this.state.addMissAssetNote && !this.state.addExcessAssetNote) {
        this.setState({
          hightlightMarginTop: Metrics.screenHeight * 0.3599
        });
      }
    }
  };

  addjustMarginTopWhenPressMissAssetCheckBox = () => {
    this.setState({ missAssetNote: "" });
    if (this.state.missAssetChecked) {
      // when you uncheck miss asset
      this.setState({ missAssetChecked: false });
      this.setState({ addMissAssetNote: false });
      this.setState({
        closeExcessAssetNoteMarginTop: Metrics.screenHeight * 0.1355
      });
      this.setState({
        addExcessAssetNoteMarginTop: Metrics.screenHeight * 0.083
      });
      if (this.state.addExcessAssetNote) {
        this.setState({
          kindOfIssueViewHeight: Metrics.screenHeight * 0.2579
        });
        if (this.state.newRequestChecked) {
          this.setState({
            hightlightMarginTop: Metrics.screenHeight * 0.4439
          });
        } else {
          this.setState({
            hightlightMarginTop: Metrics.screenHeight * 0.3599
          });
        }
      } else {
        this.setState({
          kindOfIssueViewHeight: Metrics.screenHeight * 0.1739
        });
        if (this.state.newRequestChecked) {
          this.setState({
            hightlightMarginTop: Metrics.screenHeight * 0.3599
          });
        } else {
          this.setState({
            hightlightMarginTop: Metrics.screenHeight * 0.2759
          });
        }
      }
    } else {
      // when you check miss assset
      this.setState({ missAssetChecked: true });
    }
  };

  addjustMarginTopWhenPressExcessAssetCheckBox = () => {
    this.setState({ excessAssetNote: "" });
    if (this.state.excessAssetChecked) {
      // when you uncheck check excess asset
      if (this.state.addMissAssetNote) {
        // when text input for miss asset is activate
        this.setState({
          kindOfIssueViewHeight: Metrics.screenHeight * 0.2579
        });
        if (this.state.newRequestChecked) {
          this.setState({
            hightlightMarginTop: Metrics.screenHeight * 0.4439
          });
        } else {
          this.setState({
            hightlightMarginTop: Metrics.screenHeight * 0.3599
          });
        }
      } else {
        // when text input for miss asset is not activate
        this.setState({
          kindOfIssueViewHeight: Metrics.screenHeight * 0.1739
        });
        if (this.state.newRequestChecked) {
          this.setState({
            hightlightMarginTop: Metrics.screenHeight * 0.3599
          });
        } else {
          this.setState({
            hightlightMarginTop: Metrics.screenHeight * 0.2759
          });
        }
      }
      this.setState({ excessAssetChecked: false });
      this.setState({ addExcessAssetNote: false });
    } else {
      // when you check excess asset
      this.setState({ excessAssetChecked: true });
    }
  };

  addjustMarginTopWhenActivatedTextInputForMissAssetNote = () => {
    this.setState({ missAssetNote: "" });
    this.setState({ addMissAssetNote: true });
    this.setState({
      addExcessAssetNoteMarginTop: Metrics.screenHeight * 0.167
    });
    if (this.state.addExcessAssetNote) {
      // when excess asset is checked
      this.setState({
        kindOfIssueViewHeight: Metrics.screenHeight * 0.3419
      });
      this.setState({
        closeExcessAssetNoteMarginTop: Metrics.screenHeight * 0.2194
      });
      if (this.state.newRequestChecked) {
        this.setState({
          hightlightMarginTop: Metrics.screenHeight * 0.5279
        });
      } else {
        this.setState({
          hightlightMarginTop: Metrics.screenHeight * 0.4439
        });
      }
    } else {
      this.setState({
        kindOfIssueViewHeight: Metrics.screenHeight * 0.2579
      });
      if (this.state.newRequestChecked) {
        this.setState({
          hightlightMarginTop: Metrics.screenHeight * 0.4439
        });
      } else {
        this.setState({
          hightlightMarginTop: Metrics.screenHeight * 0.3599
        });
      }
    }
  };

  addjustMarginTopWhenActivatedTextInputForExcessAssetNote = () => {
    this.setState({ excessAssetNote: "" });
    this.setState({ addExcessAssetNote: true });
    if (this.state.addMissAssetNote) {
      this.setState({
        kindOfIssueViewHeight: Metrics.screenHeight * 0.3419
      });
      this.setState({
        closeExcessAssetNoteMarginTop: Metrics.screenHeight * 0.2194
      });
      if (this.state.newRequestChecked) {
        this.setState({
          hightlightMarginTop: Metrics.screenHeight * 0.5279
        });
      } else {
        this.setState({
          hightlightMarginTop: Metrics.screenHeight * 0.4439
        });
      }
    } else {
      this.setState({
        kindOfIssueViewHeight: Metrics.screenHeight * 0.2579
      });
      if (this.state.newRequestChecked) {
        this.setState({
          hightlightMarginTop: Metrics.screenHeight * 0.4439
        });
      } else {
        this.setState({
          hightlightMarginTop: Metrics.screenHeight * 0.3599
        });
      }
    }
  };

  addjustMarginTopWhenCloseTextInputForMissAssetNote = () => {
    this.setState({ missAssetNote: "" });
    if (this.state.addExcessAssetNote) {
      // When text input of excess asset is activate
      this.setState({
        kindOfIssueViewHeight: Metrics.screenHeight * 0.2579
      });
      if (this.state.newRequestChecked) {
        this.setState({
          hightlightMarginTop: Metrics.screenHeight * 0.4439
        });
      } else {
        this.setState({
          hightlightMarginTop: Metrics.screenHeight * 0.3599
        });
      }
    } else {
      // When text input of excess asset is not activate
      this.setState({
        kindOfIssueViewHeight: Metrics.screenHeight * 0.1739
      });
      if (this.state.newRequestChecked) {
        this.setState({
          hightlightMarginTop: Metrics.screenHeight * 0.3599
        });
      } else {
        this.setState({
          hightlightMarginTop: Metrics.screenHeight * 0.2759
        });
      }
    }
    this.setState({
      addExcessAssetNoteMarginTop: Metrics.screenHeight * 0.083
    });
    this.setState({
      closeExcessAssetNoteMarginTop: Metrics.screenHeight * 0.1353
    });
    this.setState({ addMissAssetNote: false });
  };

  addjustMarginTopWhenCloseTextInputForExcessAssetNote = () => {
    this.setState({ excessAssetNote: "" });
    this.setState({ addExcessAssetNote: false });
    if (this.state.addMissAssetNote) {
      // When text input of miss asset is activate
      this.setState({
        addExcessAssetNoteMarginTop: Metrics.screenHeight * 0.167
      });
      this.setState({
        kindOfIssueViewHeight: Metrics.screenHeight * 0.2579
      });
      if (this.state.newRequestChecked) {
        this.setState({
          hightlightMarginTop: Metrics.screenHeight * 0.4439
        });
      } else {
        this.setState({
          hightlightMarginTop: Metrics.screenHeight * 0.3599
        });
      }
    } else {
      // When text input of miss asset is not activate
      this.setState({
        addExcessAssetNoteMarginTop: Metrics.screenHeight * 0.083
      });
      this.setState({
        kindOfIssueViewHeight: Metrics.screenHeight * 0.1739
      });
      if (this.state.newRequestChecked) {
        this.setState({
          hightlightMarginTop: Metrics.screenHeight * 0.3599
        });
      } else {
        this.setState({
          hightlightMarginTop: Metrics.screenHeight * 0.2759
        });
      }
    }
  };

  deleteImage1 = () => {
    if (!this.state.img2) {
      this.setState({ img1: false });
    }
    if (!this.state.img3) {
      this.setState({ img2: false });
    }
    if (!this.state.img4) {
      this.setState({ img3: false });
    }
    this.setState({ img4: false });
    this.setState({ imageIssue1: this.state.imageIssue2 });
    this.setState({ imageIssue2: this.state.imageIssue3 });
    this.setState({ imageIssue3: this.state.imageIssue4 });
    this.setState({ imageIssue4: null });
  };

  deleteImage2 = () => {
    if (!this.state.img3) {
      this.setState({ img2: false });
    }
    if (!this.state.img4) {
      this.setState({ img3: false });
    }
    this.setState({ img4: false });
    this.setState({ imageIssue2: this.state.imageIssue3 });
    this.setState({ imageIssue3: this.state.imageIssue4 });
    this.setState({ imageIssue4: null });
  };

  deleteImage3 = () => {
    if (!this.state.img4) {
      this.setState({ img3: false });
    }
    this.setState({ img4: false });
    this.setState({ imageIssue3: this.state.imageIssue4 });
    this.setState({ imageIssue4: null });
  };

  deleteImage4 = () => {
    this.setState({ img4: false });

    this.setState({ imageIssue4: null });
  };

  //UPLOAD 1 IMG TO S3
  uploadImage = async imageUpload => {
    let signUpload = await axios.get(
      "http://api.honeycomb2.geekup.vn/api/report/signupload"
    );

    let S3_Link = signUpload.data.sign;
    let key = signUpload.data.key;
    // this.setState({ img_url.push() });
    this.state.img_url.push(key);

    RNFetchBlob.fetch(
      "PUT",
      S3_Link,
      {
        "Content-Type": "application/octet-stream"
        // here's the body you're going to send, should be a BASE64 encoded string
        // (you can use "base64"(refer to the library 'mathiasbynens/base64') APIs to make one).
        // The data will be converted to "byte array"(say, blob) before request sent.
      },
      imageUpload
    )
      .then(res => {
        console.log("S3 key: " + key);
        //console.log(res.text());
      })
      .catch(err => {
        console.log("Error upload image: " + err);
        // error handling ..
      });
  };

  uploadAllImage = async () => {
    if (this.state.imageIssue1 != null) {
      await this.uploadImage(this.state.imageUpload1);
    }
    if (this.state.imageIssue2 != null) {
      await this.uploadImage(this.state.imageUpload2);
    }
    if (this.state.imageIssue3 != null) {
      await this.uploadImage(this.state.imageUpload3);
    }
    if (this.state.imageIssue4 != null) {
      await this.uploadImage(this.state.imageUpload4);
    }

    //alert("All image uploaded with keys: " + this.state.img_url.join(" , "));
  };
  render() {
    //console.warn(withNavigation(this).state)
    let haveImage = false;
    if (this.state.componentState.zone_info.image_url.length != 0) {
      haveImage = true;
    }
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior="padding"
          enabled
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          <ScrollView style={styles.container}>
            {/*Make status bar change color*/}
            <StatusBar backgroundColor="#50C3B8" />
            {/*View for show some infomation about this zone*/}
            <View style={styles.generalInfoContainer}>
              {haveImage && (
                <Image
                  style={styles.image}
                  source={{
                    uri: this.state.componentState.zone_info.image_url[0]
                  }}
                />
              )}
              {!haveImage && (
                <Image style={styles.image} source={Images.unknown} />
              )}
              <View
                style={{
                  marginLeft: Metrics.screenWidth * 0.0427,
                  justifyContent: "center"
                }}
              >
                <Text style={styles.nameOfIt}>
                  {this.state.componentState.zone_info.name}
                </Text>
                <Text style={styles.itDescription}>
                  {this.state.componentState.zone_info.totalasset} asset(s)
                </Text>
              </View>
            </View>
            {/*View for create report*/}
            <View style={styles.scrollView}>
              {/*View for checkbox*/}
              <View
                style={{
                  width: Metrics.screenWidth * 0.8933,
                  height: this.state.kindOfIssueViewHeight,
                  marginLeft: Metrics.screenWidth * 0.0533,
                  marginTop: Metrics.screenHeight * 0.03
                }}
              >
                <Text style={styles.text2}>KIND OF ISSUE</Text>
                <TouchableOpacity
                  style={styles.otherContainer1}
                  onPress={this.addjustMarginTopWhenPressMissAssetCheckBox}
                >
                  <Image
                    source={
                      this.state.missAssetChecked
                        ? Images.checked_box_3x
                        : Images.unchecked_box_3x
                    }
                    style={styles.check_box}
                  />
                  <Text style={styles.check_box_text}>Lost asset</Text>
                </TouchableOpacity>
                {this.state.missAssetChecked &&
                  this.state.addMissAssetNote && (
                    <View>
                      <TextInput
                        style={styles.inputOfOptionNote}
                        placeholder="Please add your note for this issue here"
                        underlineColorAndroid="transparent"
                        multiline={true}
                        onChangeText={data => {
                          this.setState({ missAssetNote: data });
                        }}
                      />
                    </View>
                  )}
                <TouchableOpacity
                  style={styles.otherContainer1}
                  onPress={this.addjustMarginTopWhenPressExcessAssetCheckBox}
                >
                  <Image
                    source={
                      this.state.excessAssetChecked
                        ? Images.checked_box_3x
                        : Images.unchecked_box_3x
                    }
                    style={styles.check_box}
                  />
                  <Text style={styles.check_box_text}>Found asset</Text>
                </TouchableOpacity>
                {this.state.excessAssetChecked &&
                  this.state.addExcessAssetNote && (
                    <View>
                      <TextInput
                        style={styles.inputOfOptionNote}
                        placeholder="Please add your note for this issue here"
                        underlineColorAndroid="transparent"
                        multiline={true}
                        onChangeText={data => {
                          this.setState({ excessAssetNote: data });
                        }}
                      />
                    </View>
                  )}
                <TouchableOpacity
                  style={styles.otherContainer1}
                  onPress={this.addjustMarginTopWhenPressNewRequestCheckBox}
                >
                  <Image
                    source={
                      this.state.newRequestChecked
                        ? Images.checked_box_3x
                        : Images.unchecked_box_3x
                    }
                    style={styles.check_box}
                  />
                  <Text style={styles.check_box_text}>Other request</Text>
                </TouchableOpacity>

                {/*View for add more note*/}
                {!this.state.addMissAssetNote &&
                  this.state.missAssetChecked && (
                    <TouchableOpacity
                      style={styles.addNoteTouchableOpacity}
                      onPress={
                        this
                          .addjustMarginTopWhenActivatedTextInputForMissAssetNote
                      }
                    >
                      <Image
                        source={Images.add_note_3x}
                        style={styles.addNoteImage}
                      />
                      <Text style={styles.addNoteText}>Add note</Text>
                    </TouchableOpacity>
                  )}

                {!this.state.addExcessAssetNote &&
                  this.state.excessAssetChecked && (
                    <TouchableOpacity
                      style={{
                        position: "absolute",
                        marginLeft: Metrics.screenWidth * 0.704,
                        marginTop: this.state.addExcessAssetNoteMarginTop,
                        height: Metrics.screenHeight * 0.027,
                        width: Metrics.screenWidth * 0.1894,
                        alignItems: "center",
                        flexDirection: "row"
                      }}
                      onPress={
                        this
                          .addjustMarginTopWhenActivatedTextInputForExcessAssetNote
                      }
                    >
                      <Image
                        source={Images.add_note_3x}
                        style={styles.addNoteImage}
                      />
                      <Text style={styles.addNoteText}>Add note</Text>
                    </TouchableOpacity>
                  )}
              </View>

              {/* View for note of new request */}
              {this.state.newRequestChecked && (
                <TextInput
                  style={styles.inputOfNewRequestNote}
                  placeholder="Please add your note for this issue here"
                  underlineColorAndroid="transparent"
                  multiline={true}
                  onChangeText={data => {
                    this.setState({ newRequestNote: data });
                  }}
                />
              )}
              {/*View for priority*/}
              <View style={styles.priorityContainer}>
                <Text style={styles.text2}>PRIORITY</Text>
                <View style={styles.shouldAndMustContainer}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      if (!this.state.should) {
                        this.setState({ should: true });
                        this.setState({ must: false });
                      }
                    }}
                  >
                    <View style={styles.otherContainer2}>
                      <Text
                        style={{
                          fontWeight: "500",
                          fontSize: 14,
                          lineHeight: 16,
                          color: this.state.should ? "#DBD404" : "#A5ADAD"
                        }}
                      >
                        SHOULD
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      if (!this.state.must) {
                        this.setState({ must: true });
                        this.setState({ should: false });
                      }
                    }}
                  >
                    <View style={styles.otherContainer2}>
                      <Text
                        style={{
                          fontWeight: "500",
                          fontSize: 14,
                          lineHeight: 16,
                          color: this.state.must ? "#FF1616" : "#A5ADAD"
                        }}
                      >
                        MUST
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
              {/*View for Image*/}
              <View style={styles.imageContainer}>
                <Text style={styles.text2}>IMAGES</Text>
                <View style={styles.otherContainer3}>
                  {this.state.img1 && (
                    <Image
                      source={this.state.imageIssue1}
                      style={styles.issueImage}
                    />
                  )}

                  {this.state.img2 && (
                    <Image
                      source={this.state.imageIssue2}
                      style={styles.issueImageContainer}
                    />
                  )}

                  {this.state.img3 && (
                    <Image
                      source={this.state.imageIssue3}
                      style={styles.issueImageContainer}
                    />
                  )}

                  {this.state.img4 && (
                    <Image
                      source={this.state.imageIssue4}
                      style={styles.issueImageContainer}
                    />
                  )}

                  {!this.state.img4 && (
                    <TouchableOpacity
                      onPress={this.openCamera.bind(this)}
                      style={
                        !this.state.img1
                          ? styles.issueImage
                          : styles.issueImageContainer
                      }
                    >
                      <Image source={Images.addImage} style={styles.addImage} />
                    </TouchableOpacity>
                  )}
                </View>
                {this.state.img1 && (
                  <TouchableWithoutFeedback onPress={this.deleteImage1}>
                    <View style={styles.closeIssueImageContainer1}>
                      <Image
                        source={Images.close_image_3x}
                        style={styles.closeIssueImage}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                )}
                {this.state.img2 && (
                  <TouchableWithoutFeedback onPress={this.deleteImage2}>
                    <View style={styles.closeIssueImageContainer2}>
                      <Image
                        source={Images.close_image_3x}
                        style={styles.closeIssueImage}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                )}

                {this.state.img3 && (
                  <TouchableWithoutFeedback onPress={this.deleteImage3}>
                    <View style={styles.closeIssueImageContainer3}>
                      <Image
                        source={Images.close_image_3x}
                        style={styles.closeIssueImage}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                )}

                {this.state.img4 && (
                  <TouchableWithoutFeedback onPress={this.deleteImage4}>
                    <View style={styles.closeIssueImageContainer4}>
                      <Image
                        source={Images.close_image_3x}
                        style={styles.closeIssueImage}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                )}
              </View>

              {/*Show close button for note*/}
              {this.state.addMissAssetNote && (
                <TouchableWithoutFeedback
                  onPress={
                    this.addjustMarginTopWhenCloseTextInputForMissAssetNote
                  }
                >
                  <View style={styles.closeNoteContainer1}>
                    <Image
                      source={Images.close_note_3x}
                      style={styles.closeNote}
                    />
                  </View>
                </TouchableWithoutFeedback>
              )}

              {this.state.addExcessAssetNote && (
                <TouchableWithoutFeedback
                  onPress={
                    this.addjustMarginTopWhenCloseTextInputForExcessAssetNote
                  }
                >
                  <View
                    style={{
                      position: "absolute",
                      marginTop: this.state.closeExcessAssetNoteMarginTop,
                      marginLeft: Metrics.screenWidth * 0.8507,
                      width: Metrics.screenWidth * 0.064,
                      height: Metrics.screenHeight * 0.036
                    }}
                  >
                    <Image
                      source={Images.close_note_3x}
                      style={styles.closeNote}
                    />
                  </View>
                </TouchableWithoutFeedback>
              )}

              {/*Show highlight for should and must priority*/}
              {this.state.should && (
                <View
                  style={{
                    position: "absolute",
                    backgroundColor: "transparent",
                    borderWidth: 1,
                    borderColor: "#DBD404",
                    borderRadius: 20,
                    width: Metrics.screenWidth * 0.4453,
                    height: Metrics.screenHeight * 0.06,
                    marginTop: this.state.hightlightMarginTop,
                    marginLeft: Metrics.screenWidth * 0.0533
                  }}
                />
              )}

              {this.state.must && (
                <View
                  style={{
                    position: "absolute",
                    backgroundColor: "transparent",
                    borderWidth: 1,
                    borderColor: "#FF1616",
                    borderRadius: 20,
                    width: Metrics.screenWidth * 0.4453,
                    height: Metrics.screenHeight * 0.06,
                    marginTop: this.state.hightlightMarginTop,
                    marginLeft: Metrics.screenWidth * 0.5013
                  }}
                />
              )}
            </View>

            <Modal
              animationDuration={0}
              coverScreen={true}
              position="flex-start"
              animationType={"fade"}
              style={styles.exitModalContainer}
              ref={exitPopup => {
                this.exitPopup = exitPopup;
              }}
            >
              <View style={styles.otherContainer5}>
                <Text style={styles.confirmCancelText}>Confirm cancel</Text>

                <Text style={styles.areYouSureText}>
                  Are you sure you want to cancel?
                </Text>
              </View>
              <View style={styles.yesNoContainer}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.exitPopup.close();
                  }}
                >
                  <View style={styles.noContainer}>
                    <Text style={styles.noText}>No</Text>
                  </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback
                  onPress={() => {
                    this.exitPopup.close();
                    this.props.navigation.goBack();
                  }}
                >
                  <View style={styles.yesContainer}>
                    <Text style={styles.yesText}>Yes</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </Modal>
          </ScrollView>
        </KeyboardAvoidingView>
        <LinearGradient
          colors={[
            "rgba(248,248,248,0) 0%",
            "rgba(250,250,250,0.75)",
            "rgba(250,250,250,0.82)",
            "#FFFFFF"
          ]}
          start={{ x: 0.5, y: 0.02 }}
          end={{ x: 0.5, y: 1.0 }}
          locations={[0, 0.1613879, 0.19907887, 1]}
          type="linear"
          style={styles.otherContainer4}
        >
          <TouchableOpacity
            style={styles.submitContainer}
            onPress={() => this._postDataToServer()}
            //onPress={() => this.uploadImage()}
            //onPress={() => this.uploadAllImage()}
          >
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }
}

export default AddZoneReportScreen;
