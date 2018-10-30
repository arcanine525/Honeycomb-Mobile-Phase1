import { StyleSheet, Platform, NativeModules } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/'

const bottomHeight = Metrics.screenHeight - (Metrics.screenHeight * 0.1154 + Metrics.screenWidth * 0.7334);

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  topOutter: {
    //position: 'absolute', 
    //top: 0, 
    width: '100%', 
    height: Metrics.screenHeight * 0.1154, 
    backgroundColor: 'rgba(1,1,1,0.6)'
  },
})