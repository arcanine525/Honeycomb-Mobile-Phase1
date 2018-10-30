import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  blurContainer:{
    bottom: 0,
    position: "absolute",
    height: Metrics.screenHeight * 0.13,
    width: "100%",
    alignItems: 'flex-end',
  },
  maintenanceCheck:{
    width: '100%',
    backgroundColor: '#2EBAAB',
    height: Metrics.screenHeight * 0.072,
    alignItems:'center',
    justifyContent:'center',
  },
});