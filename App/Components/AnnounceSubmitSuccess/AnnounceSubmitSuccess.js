import React, { Component } from "react";

import {View, Image, Text} from 'react-native'
import Modal from 'react-native-modal'

import Images from '../../Themes/Images'

import styles from './AnnounceSumbitSuccessStyle'

class AnnounceSubmitSuccess extends Component{
    constructor(props){
        super(props)

        this.state = {
            submit: this.props.submitSuccess,
        }
    }

    _modalSleep(milliseconds){
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > milliseconds){
            break;
          }
        }
        this.setState({submit: false})
        this.props.changeStatusSubmit();
    }
    
    render(){
        return(
            <Modal
                animationIn = 'fadeIn'
                animationOut = 'fadeOut'
                isVisible = {this.state.submit}
                backdropOpacity = {0}
                onModalShow = {() => {this._modalSleep(3000)}}
                onBackdropPress = {() => {
                    this.setState({submit: false})
                }}
                onBackButtonPress = {() => {
                    this.setState({submit: false})
                }}
                style = {styles.modalStyle}
                >
                <View style = {styles.announceWrapperStyle}>
                    <Image source = {Images.submit_success} style = {{width: 32, height: 32, alignSelf: 'center'}}/>
                    <Text style = {styles.announceTextStyle}>Your request has been sent successfully!</Text>
                </View>
            </Modal>
        );
    }
}

export default AnnounceSubmitSuccess;
