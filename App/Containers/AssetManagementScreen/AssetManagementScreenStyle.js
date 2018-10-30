import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  titleText: {
    fontSize: Fonts.size.h3,
    color: Colors.facebook,
    marginLeft: Metrics.baseMargin
  },

})
