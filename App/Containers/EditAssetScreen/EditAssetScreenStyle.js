import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  mainView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  assetStyles: {
    flexDirection: 'column',
    height: 150,
    alignItems: 'center'
  },
  assetsList: {
    flex: 1,
    flexDirection: 'column',
  },
  twoCardInLine: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  elementStyle: {
    fontSize: 20,
  }
})