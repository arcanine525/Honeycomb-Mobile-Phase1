import { AppRegistry } from 'react-native';
import App from './App/App';
import { YellowBox } from 'react-native';
//  Them dong nay de tam thoi khong hien warning isMounted
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
AppRegistry.registerComponent('Honeycomb2_0', () => App);
