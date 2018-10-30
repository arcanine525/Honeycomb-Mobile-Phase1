import { StyleSheet } from "react-native";
import { ApplicationStyles, Colors, Fonts, Metrics } from "../../Themes/";

export default StyleSheet.create({
    modalStyle: {
        backgroundColor: 'transparent',
        marginLeft: Metrics.screenWidth * 0.16, 
        marginRight: Metrics.screenWidth * 0.16, 
        marginTop: Metrics.screenHeight * 0.40, 
        marginBottom: Metrics.screenHeight * 0.40
    },

    announceWrapperStyle: {
        flex: 1, 
        backgroundColor: 'rgba(0,0,0,0.63)', 
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },

    announceTextStyle: {
        color: 'white', 
        textAlign: 'center', 
        textAlignVertical: 'top', 
        backgroundColor: 'transparent', 
        fontSize: 16, 
        lineHeight: 24,
        marginTop: Metrics.screenHeight * 0.015,
        marginLeft: Metrics.screenWidth * 0.0533,
        marginRight: Metrics.screenWidth * 0.0533
    }
})