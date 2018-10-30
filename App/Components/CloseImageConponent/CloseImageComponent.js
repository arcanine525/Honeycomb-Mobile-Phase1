import React, { Component } from 'react'
import { View, Image, TouchableOpacity } from "react-native";
import { Images } from '../../Themes';

class CloseImageComponent extends Component {
    constructor(props){
        super(props)
    }

    render(){
        if(this.props.owner == null){
            return null;
        }
        else{
            return(
                <View
                    style = {{width: 80, height: 80}}>
                    {this.props.owner}
                    <TouchableOpacity
                        style = {{position: 'absolute', right: 3}}
                        onPress = {() => {
                            this.props.delete(this.props.index)
                        }}>
                        <Image
                            style = {{width: 25, height: 25}}
                            source = {Images.cancel}>
                        </Image>
                    </TouchableOpacity>
                </View>
            );
        }
    }
}

export default CloseImageComponent;