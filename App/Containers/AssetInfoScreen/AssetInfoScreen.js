import React, { Component } from "react";

import styles from "./AssetInfoScreenStyle";

class AssetInfoScreen extends Component {
    constructor(props){
        super(props)

        this.state = {
            user: this.props.navigation.state.params.user,
            screenNavigate: "",
        }
    }

    render(){
        return(
            <View style = {{flex: 1}}>

            </View>
        );
    }
}

export default AssetInfoScreen;