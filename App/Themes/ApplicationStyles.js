import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const bottomHeight = Metrics.screenHeight - (Metrics.screenHeight * 0.1154 + Metrics.screenWidth * 0.7334);

const ApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.transparent
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    container: {
      flex: 1,
      paddingTop: Metrics.baseMargin,
      backgroundColor: Colors.transparent
    },
    section: {
      margin: Metrics.section,
      padding: Metrics.baseMargin
    },
    sectionText: {
      ...Fonts.style.normal,
      paddingVertical: Metrics.doubleBaseMargin,
      color: Colors.snow,
      marginVertical: Metrics.smallMargin,
      textAlign: 'center'
    },
    subtitle: {
      color: Colors.snow,
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin
    },
    titleText: {
      ...Fonts.style.h2,
      fontSize: 14,
      color: Colors.text
    },
    textFont: {
      fontSize: 20,
      color: 'black',
    },
    //--------------------------------------
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'transparent'
    },

    preview: {
      flex: 1,
      //justifyContent: 'flex-end',
      //alignItems: 'center',
      backgroundColor: 'transparent'
    },

    leftOutter: {
      position: 'absolute', 
      left: 0, 
      width: Metrics.screenWidth * 0.1333, 
      height: Metrics.screenHeight, 
      backgroundColor: 'rgba(1,1,1,0.6)'
    },

    rightOutter: {
      position: 'absolute', 
      right: 0, 
      width: Metrics.screenWidth * 0.1333, 
      height: Metrics.screenHeight, 
      backgroundColor: 'rgba(1,1,1,0.6)'
    },

    bottomOutter: {
      //position: 'absolute',
      //alignSelf: 'center',
      //bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: bottomHeight, 
      backgroundColor: 'rgba(1,1,1,0.6)'
    },

    guideArea: {
      position: 'absolute',
      marginBottom: Metrics.screenHeight * 0.06,
      top: Metrics.screenHeight * 0.06,
      fontSize: 18,
      lineHeight: 27, 
      color: 'white', 
      textAlign: 'center',
      backgroundColor: 'transparent',
      alignSelf: 'center',
      width: '69%',
      marginLeft: Metrics.screenWidth * 0.1547,
      marginRight: Metrics.screenWidth * 0.1547
    },

    btnInputCode: {
      borderWidth: 1,
      backgroundColor: 'transparent',
      position: 'absolute',
      marginBottom: Metrics.screenHeight * 0.09,
      height: Metrics.screenHeight * 0.072,
      width: Metrics.screenWidth * 0.7333,
      borderColor: 'white',
      justifyContent: 'center',
      alignItems: 'center'
    },

    btnTransparent: {
      borderWidth: 1,
      backgroundColor: 'transparent',
      position: 'absolute',
      marginBottom: Metrics.screenHeight * 0.09,
      height: Metrics.screenHeight * 0.072,
      width: Metrics.screenWidth * 0.7333,
      borderColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center'
    },

    leftTop: {
      position: 'absolute', 
      top: 0, 
      left: 0, 
      width: 37, 
      height: 34 ,
      backgroundColor: 'transparent'
    },

    rightTop: {
      position: 'absolute', 
      top: 0,
      right: 0, 
      width: 37, 
      height: 34 ,
      backgroundColor: 'transparent'
    },

    leftBottom: {
      position: 'absolute', 
      bottom: 0, 
      left: 0, 
      width: 37, 
      height: 34 ,
      backgroundColor: 'transparent'
    },

    rightBottom: {
      position: 'absolute', 
      bottom: 0, 
      right: 0, 
      width: 37, 
      height: 34 ,
      backgroundColor: 'transparent'
    },

    transparentLine: {
      position: 'absolute',
      backgroundColor: 'transparent',
      top: Metrics.screenHeight * 0.2354 - 2.7,
      right: 0,
      width: 3,
      height: 34
    },

    verticalLeftLine: {
      position: 'absolute',
      backgroundColor: '#2EBAAB',
      top: 0,
      left: 0,
      width: 3,
      height: 34
    },

    topLine: {
      position: 'absolute',
      backgroundColor: '#2EBAAB',
      top: 0,
      width: 37,
      height: 3 
    },

    verticalRightLine: {
      position: 'absolute',
      backgroundColor: '#2EBAAB',
      top: 0,
      right: 0,
      width: 3,
      height: 34
    },

    bottomLine: {
      position: 'absolute',
      backgroundColor: '#2EBAAB',
      bottom: -0.05,
      width: 37,
      height: 3 
    },
  },
  darkLabelContainer: {
    padding: Metrics.smallMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    marginBottom: Metrics.baseMargin
  },
  darkLabel: {
    fontFamily: Fonts.type.bold,
    color: Colors.snow
  },
  groupContainer: {
    margin: Metrics.smallMargin,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  sectionTitle: {
    ...Fonts.style.h4,
    color: Colors.coal,
    backgroundColor: Colors.ricePaper,
    padding: Metrics.smallMargin,
    marginTop: Metrics.smallMargin,
    marginHorizontal: Metrics.baseMargin,
    borderWidth: 1,
    borderColor: Colors.ember,
    alignItems: 'center',
    textAlign: 'center'
  },
}

export default ApplicationStyles
