import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  topOutter: {
    //position: 'absolute', 
    //top: 0, 
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center', 
    height: Metrics.screenHeight * 0.1665, 
    backgroundColor: 'rgba(1,1,1,0.6)'
  },

  btnInputCodeMoveUp: {
    borderWidth: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: Metrics.screenHeight * 0.055,
    //marginBottom: Metrics.screenHeight * 0.09,
    height: Metrics.screenHeight * 0.072,
    width: Metrics.screenWidth * 0.7333,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  }
})