import React, { Component } from 'react';
import { 
	StatusBar, 
	Alert, 
	View, 
	TouchableOpacity, 
	Text, 
	TextInput, 
	Keyboard, 
	BackHandler,
	AsyncStorage,
} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import PopupDialog from 'react-native-popup-dialog';
import { RNCamera } from 'react-native-camera';
import { Metrics } from '../../Themes';
import LoadingComponent from '../../Components/LoadingComponent/LoadingComponent'
import Modal from 'react-native-modal';
import axios from 'axios';
import {NavigationActions} from 'react-navigation'

import styles from './QRScreenStyle';
export default class QRScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isReporting: true,
			inputCode: '',
			marginInputPosition: '12%',
			visibleModal: false,
			hideContent: false,
			flag: false,
			cameraOn: false,
			drawer: null,
		};
	}

	static navigationOptions = ({ navigation }) => ({
		title: 'Honeycomb',
		headerStyle: {
			backgroundColor: '#50C3B8',
			height: Metrics.screenHeight * 0.0899,
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			flex: 1,
			textAlign: 'center',
		},
		headerLeft: (
			<TouchableOpacity
				onPress={async () => {
					if(navigation.state.params && !navigation.state.params.flag)
					{
						navigation.goBack()
					}
					if(!navigation.state.params || navigation.state.params.flag)
					{
						navigation.openDrawer();
					}
				}}
				style = {{marginLeft: Metrics.screenWidth * 0.0507}}
			>
					{(!navigation.state.params || navigation.state.params.flag) && <Icon name="menu" size={30} color="white" />}
					{navigation.state.params && !navigation.state.params.flag && <Icon name="keyboard-backspace" size={30} color="white" />}
						{/* {
						}
						{this.Role == 'staff' &&
							<Icon name="keyboard-backspace" size={30} color="white" />
						} */}
			</TouchableOpacity>
		),
		headerRight: (
			<TouchableOpacity
				onPress = {() => {

				}}
				style = {{alignItems: 'flex-start', width: Metrics.screenWidth * 0.1013}}
			>
				<Icon name = "help" size={30} color = "white"/>
			</TouchableOpacity>
		)
	});

	getUser = async () =>
	{
		
		this.setState({user: user})
		console.warn(user)
	}

	componentWillMount = async () =>{
		//await AsyncStorage.setItem('cameraOn', 'on')
		//let temp = await AsyncStorage.getItem('cameraOn')
		// if(this.props.navigation.state.params.Drawer){
		// 	this.setState({drawer: this.props.navigation.state.params.Drawer})
		// }
		this.setState({cameraOn: true})
	}

	componentDidMount() {
		
		this.setState({statusBarHeight: StatusBar.currentHeight})
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
		BackHandler.addEventListener('hardwareBackPress', this._unlockScanQR);
	}

	componentWillUnmount() {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
		BackHandler.removeEventListener('hardwareBackPress', this._unlockScanQR);
	}

	_keyboardDidShow = () => {
		this.setState({ marginInputPosition: '20.5%' });
	};

	_keyboardDidHide = () => {
		this.setState({ marginInputPosition: '12%' });
	};

	_unlockScanQR = () => {
		this.setState({ isReporting: true });
	}
	  
	_turnOnCamera = () => {
		this.setState({cameraOn: true})
	}
  
  _alertIncorrectQRCode(){
    Alert.alert(
      "Invalid",
      "Please enter the ID of asset or zone",
      [{text: 'OK', onPress: () => {
				this._unlockScanQR()
				this.loadingPopUp.dismiss()
			}}],
      {cancelable: false}
    )
  }

	_navigateToZoneReport = async (zone_id) => {
	  let res = await axios.get('http://api.honeycomb2.geekup.vn/api/zones/' + zone_id);
	  if (res.data.id) {
		this.setState(
			//{cameraOn: false},
			function(){
				this.props.navigation.navigate('ZoneReportScreen', {
					UserHomeScreen: this,
					screenNavigate: 'UserHomeScreen',
					zone_info : res.data
				});
			}
		)
	    
			this.loadingPopUp.dismiss()
	  } else {
	    this._alertIncorrectQRCode();
	  }
	}
  
  _navigateToAssetReport = async (asset_id) => {
    let res = await axios.get(
      "http://api.honeycomb2.geekup.vn/api/assets/" + asset_id
    );
    if (res.data.id) {
		this.setState(
			//{cameraOn: false},
			async function(){
				this.props.navigation.navigate('AssetReportScreen', {
					UserHomeScreen: this,
					screenNavigate: 'UserHomeScreen',
					data: res.data
				})
			}
		)
    	
    	this.loadingPopUp.dismiss()
    } else {
      this._alertIncorrectQRCode();
    }
  }

	_switchReportScreen = async (data) => {
		if (this.state.isReporting == true) {
			this.setState({ isReporting: false });
			if (data.charAt(0) == 'A' || data.charAt(0) == 'a'){
				this.loadingPopUp.show();
				this._navigateToAssetReport(data)
      		}
			else if(data.charAt(0) == 'Z' || data.charAt(0) == 'z'){
				this._navigateToZoneReport(data);
      		}
			else{
				this._alertIncorrectQRCode()
			}
			this.setState({inputCode: ''})
		}
	};

	render() {
		return (
			// <View style={styles.container}>
			// 	<StatusBar
			// 		backgroundColor="#50C3B8"
			// 		barStyle="light-content">
			// 	</StatusBar>
			// 	{this.state.cameraOn && <RNCamera
			// 		ref={(ref) => {
			// 			this.camera = ref;
			// 		}}
			// 		style={styles.preview}
			// 		type={RNCamera.Constants.Type.back}
			// 		flashMode={RNCamera.Constants.FlashMode.on}
			// 		permissionDialogTitle={'Permission to use camera'}
			// 		permissionDialogMessage={'We need your permission to use your camera phone'}
			// 		onBarCodeRead={(data) => {
			// 			this._switchReportScreen(data.data);
			// 		}}
			// 		barCodeTypes={[ RNCamera.Constants.BarCodeType.qr ]}
			// 	>
			// 		<View style={styles.topOutter}></View>
			// 		<View style = {{
			// 				width: '100%',
			// 				height: Metrics.screenWidth * 0.7334 + 1, 
			// 				backgroundColor: 'transparent',
			// 				flexDirection: 'row',
			// 				marginTop: -0.06
			// 			}}
			// 		>
			// 			<View style={this.state.hideContent == false ? styles.leftOutter : {flex: 1, backgroundColor: 'rgba(1,1,1,0.6)'}}></View>
			// 			<View style={this.state.hideContent == false ? styles.rightOutter : null}></View>
			// 		</View>
			// 		<View style={styles.bottomOutter}>
			// 			<Text style={styles.guideArea}>
			// 				{this.state.hideContent == false ? 'Move the QR code inside the area to scan' : ''}
			// 			</Text>
			// 			<TouchableOpacity
			// 				style={this.state.hideContent == false ? styles.btnInputCode : styles.btnTransparent}
			// 				onPress={() => {
			// 					this.setState({ isReporting: false })
			// 					this.setState({visibleModal: true})
			// 					this.setState({hideContent: true})
			// 				}}
			// 			>
			// 				<Text style={{ fontSize: 16, lineHeight: 24, fontWeight: 'bold', color: 'white', backgroundColor: 'transparent', fontFamily: "Roboto-Regular", }}>
			// 					{this.state.hideContent == false ? "I can't scan QR code" : ''}
			// 				</Text>
			// 			</TouchableOpacity>
			// 		</View>
			// 	</RNCamera>}
			// 	<View
			// 		style = {{
			// 			position: 'absolute',
			// 			alignSelf: 'center',
			// 			backgroundColor: 'transparent',
			// 			marginTop: Metrics.screenHeight * 0.1154 - 3,
			// 			width: Metrics.screenWidth * 0.7334 + 6,
			// 			height: Metrics.screenWidth * 0.7334 + 7,
			// 		}} 
			// 	>
			// 		<View style = {this.state.hideContent == false ? styles.leftTop : styles.transparentLine}>
			// 			<View style = {styles.verticalLeftLine}></View>
			// 			<View style = {styles.topLine}></View>
			// 		</View>
			// 		<View style = {this.state.hideContent == false ? styles.rightTop : styles.transparentLine}>
			// 			<View style = {styles.verticalRightLine}></View>
			// 			<View style = {styles.topLine}></View>
			// 		</View>
			// 		<View style = {this.state.hideContent == false ? styles.leftBottom : styles.transparentLine}>
			// 			<View style = {styles.verticalLeftLine}></View>
			// 			<View style = {styles.bottomLine}></View>
			// 		</View>
			// 		<View style = {this.state.hideContent == false ? styles.rightBottom : styles.transparentLine}>
			// 			<View style = {styles.verticalRightLine}></View>
			// 			<View style = {styles.bottomLine}></View>
			// 		</View>
			// 	</View>
			// 	<Modal
			// 		avoidKeyboard = {true}
			// 		animationIn = 'fadeIn'
            // 		animationOut = 'fadeOut'
			// 		isVisible = {this.state.visibleModal}
			// 		onBackdropPress = {() => {
			// 			this.setState({ isReporting: true })
			// 			this.setState({visibleModal: false})
			// 			this.setState({hideContent: false})
			// 			Keyboard.dismiss();
			// 		}}
			// 		onBackButtonPress = {() => {
			// 			this.setState({ isReporting: true })
			// 			this.setState({visibleModal: false})
			// 			this.setState({hideContent: false})
			// 			Keyboard.dismiss();
			// 		}}
			// 		>
			// 		<View style={{
			// 			flex: 0,
			// 			position: 'absolute',
			// 			alignSelf: 'center',
			// 			top: '34.18%',
			// 			bottom: Metrics.screenHeight * 0.3343,
			// 			height: Metrics.screenHeight * 0.2939,
			// 			width: Metrics.screenWidth * 0.84,
			// 			borderRadius: 3,
			// 			backgroundColor: 'white'
			// 		}}>
			// 			<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
			// 				<Text
			// 					style={{
			// 						marginTop: Metrics.screenHeight * 0.03,
			// 						fontSize: 24,
			// 						fontWeight: "500",
			// 						alignItems: 'center',
			// 						color: '#274542'
			// 					}}
			// 				>	
			// 					Input code
			// 				</Text>
			// 			</View>
			// 			<TextInput
			// 				autoFocus = {true}
			// 				clearTextOnFocus={true}
			// 				underlineColorAndroid='transparent'
			// 				placeholder = 'Input code to access the asset or zone'
			// 				maxLength={20}
			// 				onChangeText={(value) => {
			// 					this.setState({ inputCode: value });
			// 				}}
			// 				style={{
			// 					fontSize: 16,
			// 					paddingLeft: Metrics.screenWidth * 0.0427,
			// 					alignSelf: 'center',
			// 					height: Metrics.screenHeight * 0.072,
			// 					width: Metrics.screenWidth * 0.7333,
			// 					marginBottom: Metrics.screenHeight * 0.03,
			// 					borderRadius: 3,
			// 					borderWidth: 1,
			// 					borderColor: '#F0F2F2'
			// 				}}
			// 			/>
			// 			<TouchableOpacity
			// 				onPress = {() => {
			// 					Keyboard.dismiss();
			// 					this.setState({hideContent: false})
			// 					this.setState({ isReporting: true }, function() {
			// 						this._switchReportScreen(this.state.inputCode);
			// 					});
			// 					this.setState({visibleModal: false})
			// 				}}
			// 				style = {{
			// 					height: Metrics.screenHeight * 0.072,
			// 					width: Metrics.screenWidth * 0.7333,
			// 					alignSelf: 'center',
			// 					alignItems: 'center',
			// 					justifyContent: 'center',
			// 					backgroundColor: '#2EBAAB',
			// 					borderRadius: 3,
			// 					marginBottom: Metrics.screenHeight * 0.03,
			// 				}}>
			// 					<Text style = {{fontSize: 16, lineHeight: 24, fontWeight: 'bold', fontFamily: "Roboto-Regular", color: 'white'}}>
			// 						Submit
			// 					</Text>
			// 			</TouchableOpacity>
			// 		</View>
			// 	</Modal>
			// 	<PopupDialog
			// 		ref={(loadingPopUp) => {
			// 			this.loadingPopUp = loadingPopUp;
			// 		}}
			// 		dismissOnTouchOutside={false}
			// 		dialogStyle={{
			// 			//bottom: this.state.marginInputPosition,
			// 			height: '100%',
			// 			width: '100%',
			// 			backgroundColor: 'transparent'
			// 		}}
			// 	>
			// 		<LoadingComponent/>
			// 	</PopupDialog>
            // </View>
            <View
                style = {{
                    flex: 1,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text
                    style = {{color: 'black'}}
                >Coming Soon</Text>
            </View>
		);
	}
}
