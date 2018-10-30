import { StyleSheet } from "react-native";
import { ApplicationStyles, Colors, Fonts, Metrics } from "../../Themes/";
const styles = StyleSheet.create({
    ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },

  label: {
    fontSize: Fonts.size.label
  },

  input: {
    fontSize: Fonts.size.input
  }
});

export default styles;
