// @ts-nocheck
import React, { Component } from "react";
import {
  View,
  Image,
  ImageBackground,
  Text,
  TextInput,
  Keyboard,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import {
  StackActions,
  NavigationActions
} from 'react-navigation'
import { FormLabel } from "react-native-elements";
import axios from "axios";
import { Header, Button } from "react-native-elements";
import { Colors, Fonts, Metrics } from "./Themes/";
import LoadingComponent from "./Components/LoadingComponent/LoadingComponent";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      role: "",
      username: "",
      phone: "",
      onPressEmail: false,
      onPressPass: false,
      onInput: true,
      loading: false,
    };
  }

  onLoadUser = async () =>
  {
    let user = {
      role: await AsyncStorage.getItem('role'),
      email: await AsyncStorage.getItem('email'),
      password: await AsyncStorage.getItem('password'),
    }
    //console.warn(user)
    const data = {
      email: user.email,
      password: user.password
    }
    if(data.email != null)
    {
      this.setState({loading: true})
      let res = await axios.post(
        "http://guinternship.127001.space/api/users/login",
        
          data
        
      );
      if(res.status == 200 && res.data.role == 'client')
      {
        const resetAction = StackActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate({routeName: "UserNav"})]
        });
        this.setState({loading: false})
        this.props.navigation.dispatch(resetAction);
      }
      if(res.status == 200 && res.data.role == 'staff')
      {
        const resetAction = StackActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate({routeName: "ManagerNav"})]
        });
        this.setState({loading: false})
        this.props.navigation.dispatch(resetAction);
      }
      else
      {
        this.setState({loading: false})
      }
    }
  }

  componentWillMount(){
    
  }

  componentDidMount = async () => {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
    this.onLoadUser()
  };

  _keyboardDidHide = () => {
    this.setState({ onInput: true });
    this.setState({ onPressEmail: false, onPressPass: false });
  };

  // _keyboardDidHide = () => {
  //   this.setState({ onInput: true });
  // };

  _keyboardDidShow = () => {
    this.setState({ onInput: false });
  };

  onLogin = async () => {
    let data = {
      email: this.state.email,
      password: this.state.password
    };
    //login = JSON.stringify(data);
    //console.warn(login);
    try
    {
      let res = await axios.post(
        "http://guinternship.127001.space/api/users/login",
        
          data
        
      );
      this.setState({role: res.data.role})
      let name = `${res.data.firstName}_${res.data.lastName}`
      this.setState({username: name, phone: res.data.phone})
      //console.warn(res.data)
      if(res.status == 200 && res.data.role == 'client')
      {
        this.onUser()
        return({})
      }
      if(res.status == 200 && res.data.role == 'staff')
      {
        this.onManager()
        return({})
      }
    } catch (e)
    {
      if(e.response.status == 400)
      {
        alert(e.response.data)
      }
      if(e.response.status == 422)
      {
        alert("Wrong email or password")
      }
    }
    //400: khong dung mat khau vs password
    // const username = this.state.username
    // const password = this.state.password
    
    // else
    // {
    //   alert("Please enter username and password correctly")
    // }
  };

  onManager = async () => {
      try{
        await AsyncStorage.setItem('role', this.state.role);
        await AsyncStorage.setItem('username', this.state.username);
        await AsyncStorage.setItem('email', this.state.email);
        await AsyncStorage.setItem('password', this.state.password);
        await AsyncStorage.setItem('phone', this.state.phone);
      } catch(e)
      {
        console.warn(e)
      }
    
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({routeName: "ManagerNav"})]
    });
    this.props.navigation.dispatch(resetAction);
  }

  onUser = async () => {
      try{
        await AsyncStorage.setItem('role', this.state.role);
        await AsyncStorage.setItem('username', this.state.username);
        await AsyncStorage.setItem('email', this.state.email);
        await AsyncStorage.setItem('password', this.state.password);
        await AsyncStorage.setItem('phone', this.state.phone);

      } catch(e)
      {
        console.warn(e)
      }
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({routeName: "UserNav"})]
    });
    this.props.navigation.dispatch(resetAction);
  }

  onEmail(){
    this.setState({ onPressEmail: true, onPressPass: false });
  }

  onPass() {
    this.setState({ onPressEmail: false, onPressPass: true });
  }
  onDefault() {
    this.setState({ onPressEmail: false, onPressPass: false });
    Keyboard.dismiss();
  }

  render() {
    if(this.state.loading)
    {
      return(
        <LoadingComponent/>
      )
    }
    else{
      return (
        <ImageBackground
          style={{ width: "100%", height: "100%" }}
          source={require("../Assets/Images/Sign_in.png")}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={() => {
              this.onDefault();
            }}
          >
            {this.state.onInput && (
              <Image
                style={{
                  alignSelf: "center",
                  height: "12.59%",
                  width: "24.27%",
                  marginTop: 120,
                  marginBottom: "6%"
                }}
                source={require("../Assets/Images/logo_Signin.png")}
              />
            )}
            {this.state.onInput && (
              <Text
                style={{
                  height: "4.95%",
                  color: "#274541",
                  fontFamily: 'Roboto-Medium',
                  fontSize: 22,
                  fontWeight: "bold",
                  lineHeight: 33,
                  alignSelf: "center",
                  marginBottom: "6%",
                }}
              >
                SIGN IN
              </Text>
            )}
            {!this.state.onInput && (
              <View
                style={{
                  width: "100%",
                  //backgroundColor: 'red',
                  height: "25%"
                }}
              />
            )}
            <Text
              style={{
                height: "2.1%",
                marginLeft: "5.33%",
                marginBottom: "1.2%",
                fontSize: 12,
                color: "#CCCFCE",
                fontWeight: "500",
                lineHeight: 14,
                letterSpacing: 1,
                fontFamily: 'Roboto-Medium'
              }}
            >
              EMAIL
            </Text>
            <TextInput
              style={{
                alignSelf: "center",
                height: "7.2%",
                width: "89.33%",
                marginBottom: "3.6%",
                backgroundColor: "white",
                borderWidth: 1,
                paddingLeft: "4.27%",
                fontSize: 14,
                borderRadius: 3,
                borderColor: this.state.onPressEmail ? "#2EBAAB" : "#F0F2F2"
              }}
              underlineColorAndroid="transparent"
              autoCorrect={false}
              onFocus={() => this.onEmail()}
              onChangeText={text => {
                this.setState({ email: text });
              }}
            />
            <Text
              style={{
                height: "2.1%",
                marginLeft: "5.33%",
                marginBottom: "1.2%",
                fontSize: 12,
                color: "#CCCFCE",
                fontWeight: "500",
                lineHeight: 14,
                letterSpacing: 1,
                fontFamily: 'Roboto-Medium'
              }}
            >
              PASSWORD
            </Text>
            <TextInput
              style={{
                alignSelf: "center",
                height: "7.2%",
                width: "89.33%",
                marginBottom: 30,
                backgroundColor: "white",
                borderWidth: 1,
                paddingLeft: "4.27%",
                fontSize: 14,
                borderRadius: 3,
                borderColor: this.state.onPressPass ? "#2EBAAB" : "#F0F2F2"
              }}
              underlineColorAndroid="transparent"
              autoCorrect={false}
              onFocus={() => this.onPass()}
              secureTextEntry={true}
              onChangeText={text => {
                this.setState({ password: text });
              }}
            />
            <TouchableOpacity
              style={{
                height: "7.2%",
                width: "89.33%",
                borderRadius: 3,
                backgroundColor: "#2EBAAB",
                marginLeft: "5.33%",
                marginRight: "5.33%",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 3
              }}
              onPress={() => {
                this.onLogin();
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: 'Roboto-Medium',
                  fontSize: 16,
                  fontWeight: "bold",
                  lineHeight: 24
                }}
              >
                Sign in
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "2.4%",
                width: 0.4*Metrics.screenWidth,
                height: "5%"
              }}
              onPress = {async()=>{
                let user = {
                  role: await AsyncStorage.getItem('role'),
                  username: await AsyncStorage.getItem('username')
                }
                //console.warn(user)
                alert("", "Coming soon!")
              }}
            >
              <Text
                style={{
                  color: "#2EBAAB",
                  fontFamily: 'Roboto-Medium',
                  fontSize: 14,
                  fontWeight: "500",
                  lineHeight: 21
                }}
              >
                Forgot password?
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </ImageBackground>
      );
    }
  }
}
