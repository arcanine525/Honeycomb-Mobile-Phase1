import React, {Component} from 'react'
import {
    Image,
    View,
} from 'react-native'
import Images from '../../Themes/Images'

class LoadingComponent extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View
                style={{ flex: 1, width: '100%', height: '100%', backgroundColor: 'white', justifyContent: "center", alignItems: "center" }}
            >
                <Image source = {Images.loading} style = {{width: 50, height: 45}}/>
            </View>
        );
    }
}

export default LoadingComponent;