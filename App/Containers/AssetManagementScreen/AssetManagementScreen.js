import React, { Component } from "react";
import {
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Button,
  View,
  TouchableOpacity,
} from "react-native";

// Styles
import styles from "./AssetManagementScreenStyle";

class AssetManagementScreen extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View>
        <Text style={styles.titleText}>AssetManagementScreen</Text>
        <Text>Hello world!~</Text>
        <Button
          onPress={() => {
            this.props.navigation.navigate("AddAssetScreen");
          }}
          title="Add Asset"
        />
      </View>
    );
  }
}

export default AssetManagementScreen;
