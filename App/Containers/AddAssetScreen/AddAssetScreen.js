import React, { Component } from "react";
import {
  ScrollView,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  Alert
} from "react-native";
import {
  FormLabel,
  FormInput,
  Header,
  Icon,
  Button
} from "react-native-elements";

import { Dropdown } from "react-native-material-dropdown";
import DatePicker from "react-native-datepicker";
import axios from "axios";
import { _addNewAssetApi } from "../../Services/MockModules";
import { Colors, Fonts } from "../../Themes/";
import mockingDropdown from "../../../fakeDataDropdown";
// Styles
import styles from "./AddAssetScreenStyles";

class AddAssetScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      zone: "",
      id: "",
      supplier: "",
      price: "",
      owner: "",
      buydate: "",
      expiredate: "",
      status: "",

      // exprieDate: "",
      list: []
    };
  }

  static navigationOptions = {
    //header: null
    title: "Add New Asset"
  };

  _getImportDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    today = dd + "-" + mm + "-" + yyyy;

    this.setState({
      buydate: today
    });
  }

  _addNewAsset() {
    let newAsset = {
      type: this.state.type,
      zone: this.state.zone,
      id: this.state.id,
      supplier: this.state.Supplier,
      price: this.state.price,
      owner: this.state.owner,
      buydate: this.state.buydate,
      expiredate: this.state.expiredate,
      status: this.state.status
    };

    _addNewAssetApi(newAsset);

    Alert.alert(
      "",
      "New Asset Added",
      [
        {
          text: "OK",
          onPress: () => this.props.navigation.navigate("AssetScreen")
        }
      ],
      { cancelable: false }
    );
  }

  componentWillMount() {
    this._getImportDate();
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("AssetScreen");
              }}
            >
              <Icon name="arrow-back" color="white" />
            </TouchableOpacity>
          }
          centerComponent={{
            text: "Create New Asset",
            style: { color: "white", fontSize: Fonts.size.h5 }
          }}
          backgroundColor={Colors.headerBackground}
        />
        <ScrollView>
          <KeyboardAvoidingView behavior="padding" enabled>
            <Text>Today: {this.state.buydate}</Text>

            <FormLabel labelStyle={styles.label}>Asset Type</FormLabel>
            <View style={{ marginLeft: 20 }}>
              <Dropdown
                data={mockingDropdown[0]}
                fontSize={19}
                onChangeText={type => this.setState({ type })}
                value={this.state.type}
              />
            </View>

            <FormLabel labelStyle={styles.label}>Asset Supplier</FormLabel>
            <FormInput
              inputStyle={styles.input}
              onChangeText={supplier => this.setState({ supplier })}
              value={this.state.supplier}
            />

            <FormLabel labelStyle={styles.label}>Asset Price</FormLabel>
            <FormInput
              inputStyle={styles.input}
              onChangeText={price => this.setState({ price })}
              value={this.state.price}
              keyboardType="numeric"
            />

            <FormLabel labelStyle={styles.label}>Asset Zone</FormLabel>
            <View style={{ marginLeft: 20 }}>
              <Dropdown
                data={mockingDropdown[1]}
                fontSize={19}
                onChangeText={zone => this.setState({ zone })}
                value={this.state.zone}
              />
            </View>

            <FormLabel labelStyle={styles.label}>Asset Owner</FormLabel>
            <FormInput
              inputStyle={styles.input}
              onChangeText={owner => this.setState({ owner })}
              value={this.state.owner}
            />

            <View style={styles.datePicker}>
              <View>
                <FormLabel labelStyle={styles.label}>Bought Date</FormLabel>
                <DatePicker
                  date={this.state.buydate}
                  disabled
                  mode="date"
                  placeholder="Select date"
                  format="DD-MM-YYYY"
                />
              </View>

              <View>
                <FormLabel labelStyle={styles.label}>Expire Date</FormLabel>
                <DatePicker
                  date={this.state.expiredate}
                  mode="date"
                  placeholder="select date"
                  format="DD-MM-YYYY"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  onDateChange={expiredate => {
                    this.setState({ expiredate: expiredate });
                  }}
                />
              </View>
            </View>

            {/* <Button
              onPress={() => {
                this.props.navigation.navigate("AssetManagementScreen");
              }}
              title="Add New Asset"
            /> */}

            <Button
              onPress={() => {
                this._addNewAsset();
              }}
              title="ADD"
              buttonStyle={styles.addButton}
              textStyle={{ fontSize: 20, color: "black" }}
            />

            {/* <Button title="Add New Asset" /> */}
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

export default AddAssetScreen;
