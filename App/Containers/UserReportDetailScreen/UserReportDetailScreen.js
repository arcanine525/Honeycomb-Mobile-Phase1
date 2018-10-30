// @ts-nocheck
import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
    AsyncStorage,
    Modal,
    Alert,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {
    Avatar,
    Icon,
} from 'react-native-elements'
import { Colors, Metrics, Images } from '../../Themes';
import ImageViewer from 'react-native-image-zoom-viewer'
//import Modal from 'react-native-modal';
import axios from '../../../node_modules/axios';
import images from '../../Themes/Images';
import LoadingComponent from '../../Components/LoadingComponent/LoadingComponent'

export default class UserReportDetailScreen extends Component {
    constructor() {
        super()
        this.state =
            {
                images: [],
                imageIndex: 0,
                modalVisible: false,
                user: null,
                asset_status: null,
                data: {},
            }
    }

    static navigationOptions = ({ navigation }) =>
        ({
            title: navigation.state.params.item.name ? navigation.state.params.item.name + ' request' : '--',
            headerStyle: {
                backgroundColor: Colors.headerBackground,
                height: 0.09 * Metrics.screenHeight,
            },
            headerTitleStyle: { color: 'white',flex: 1, textAlign: 'center' },
            headerLeft: (
                <TouchableOpacity
                    style={{
                        marginLeft: 0.0373 * Metrics.screenWidth
                    }}
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <Icon
                        name='keyboard-backspace'
                        size={30}
                        color='white'
                    />
                </TouchableOpacity>
            ),
            headerRight: (
                <View
                  style={{
                    width: Metrics.screenWidth * 0.064,
                    height: Metrics.screenHeight * 0.0319,
                    marginRight: Metrics.screenWidth * 0.0427
                  }}
                />
              )
        })

    getUser = async () =>
    {
        let user =
        {
            role: await AsyncStorage.getItem('role'),
            username: await AsyncStorage.getItem('username'),
        }
        user.username = user.username.replace("_", " ")
        this.setState({
            user: user
        })
    }
    getData = async () =>
    {
        const { item } = this.props.navigation.state.params
        const report = item.report
        if(report.asset_status)
        {
            let res = await axios.get(`http://api.honeycomb2.geekup.vn/api/assets/${report.asset_id}`)
            this.setState({data: res.data})
        }
        else
        {
            let res = await axios.get(`http://api.honeycomb2.geekup.vn/api/zones/${report.zone_id}`)
            this.setState({data: res.data})
        }
    }

    componentWillMount()
    {
        this.getUser()
        //this.getData()
    }

    componentDidMount()
    {
        const { item } = this.props.navigation.state.params
        let images = []
        let image = {
             url: ""
        }
        for (let i = 0; i<item.report.img_url.length;i++)
        {
            image.url = item.report.img_url[i]
            images.push(image)
        }
        //console.warn(JSON.stringify(images))
        this.setState({images: images})
        //console.warn(`https://s3-us-west-1.amazonaws.com/honeycomb-2-dev/${item.report.img_url}`)
        this.getData()
    }

    onPressDoing = async () =>{
        const { item } = this.props.navigation.state.params
        let data = 
        {
            status: "IN-PROGRESS",
            //done_date:""
        }
        try{
            let res = await axios.put(`http://api.honeycomb2.geekup.vn/api/report/${item.report.id}`, data)
            console.log(res.data)
            if(res.status == 200)
            {
                this.props.navigation.state.params.screen.onLoadData()
                this.props.navigation.goBack()
            }
        }
        catch (e)
        {
            Alert.alert(
                'Oops...',
                'There is something wrong, please try again',
                [
                {text: 'Try again', onPress: () => {
                    this.onPressDoing()
                    }
                },
                ],
                { cancelable: false }
            )
        }
        
    }

    onPressDone = async () =>{
        const { item } = this.props.navigation.state.params
        let data = 
        {
            status: "SOLVED",
            //done_date:""
        }
        try{
            let res = await axios.put(`http://api.honeycomb2.geekup.vn/api/report/${item.report.id}`, data)
            console.log(res.data)
            if(res.status == 200)
            {
                this.props.navigation.state.params.screen.onLoadData()
                this.props.navigation.goBack()
            }
        }
        catch (e)
        {
            Alert.alert(
                'Oops...',
                'There is something wrong, please try again',
                [
                {text: 'Try again', onPress: () => {
                    this.onPressDone()
                    }
                },
                ],
                { cancelable: false }
            )
        }
    }

    renderItem = ({ item, index }) => {
        //console.warn(item.image_url)
        return (
            <TouchableOpacity
                onPress={() => {
                    this.setState({
                        imageIndex: index,
                        modalVisible: true,
                    })
                }}
                style={{ borderRadius: 3 }}
            >
                <Image
                    source={{ uri: item.url }}
                    resizeMode='cover'
                    style={styles.itemImageContainer}
                />
            </TouchableOpacity>
        )
    }

    onDetail = async () =>
    {
        const { item } = this.props.navigation.state.params
        const report = item.report
        if(report.asset_status)
        {
            //console.warn("asset")
            this.props.navigation.navigate("AssetReportScreen", {
                data: this.state.data,
            })
        }
        else
        {
            //console.warn("zone")
            this.props.navigation.navigate("ZoneTab", {
                item: this.state.data,
            })
        }
    }

    render() {
        //console.warn(this.props.navigation.state.params.item.report.zone_id)
        const { item } = this.props.navigation.state.params
        const report = item.report
        const note = item.report ? item.report.note : ''
        const history = item.history ? item.history : null
        const must = report.priority == "MUST" ? true : false
        //
        report.sender = report.sender.replace("_", " ")
        if(!this.state.data.image_url)
        {
            return(
                <LoadingComponent/>
            )
        }
        else
        {
            return (
                <View
                    style={{ flex: 1, backgroundColor: '#F8F9F9' }}
                >
                    <ScrollView
                        style={styles.container}
                    >
                        {this.state.user.role == "staff" && 
                        <View
                            style={styles.targetInfoContainer}
                        >
                            <TouchableOpacity
                                style={styles.targetInfoButton}
                                onPress = {()=>{
                                    this.onDetail()
                                }}
                            >
                                <Image
                                    source={{uri: this.state.data.image_url[0]}}
                                    style={styles.targetImage}
                                />
                                <View
                                    style={styles.targetInfoTextContainer}
                                >
                                    {report.asset_status && 
                                    <Text
                                        style={styles.assetNameText}
                                    >
                                        {item.name}
                                    </Text>}
                                    {!report.asset_status && 
                                    <Text
                                        style={styles.assetNameText}
                                    >
                                        {report.zone_name}
                                    </Text>}
                                    {report.asset_status && 
                                    <Text
                                        style={styles.zoneNameText}
                                    >
                                        {report.zone_name}
                                    </Text>}
                                </View>
                                {report.asset_status &&
                                    <Text
                                        style={[styles.targetStatusText, {
                                            color: report.asset_status < 50 ? "#FF1616" : '#50C3B8',
                                        }]}
                                    >
                                        {report.asset_status}%
                                    </Text>}
                            </TouchableOpacity>
                        </View>}
                        <View
                            style={styles.issueContainer}
                        >
                            <Text
                                style={styles.kindOfIssue}
                            >
                                KIND OF ISSUE
                            </Text>
                        </View>
                        {note[0] && 
                        <View
                            style={styles.itemContainer}
                        >
                            <View
                                style={styles.typeContainer}
                            >
                                <Text
                                    style={styles.typeText}
                                >
                                    {note[0].note_type}
                                </Text>
                                {note[0].note_text.length != 0 && 
                                <Text
                                    style={styles.noteText}
                                >
                                    "{note[0].note_text}"
                                </Text>}
                            </View>
                        </View>}
                        {note[1] && <View
                            style={styles.itemContainer}
                        >
                            <View
                                style={styles.typeContainer}
                            >
                                <Text
                                    style={styles.typeText}
                                >
                                    {note[1].note_type}
                                </Text>
                                {note[1].note_text.length != 0 && 
                                <Text
                                    style={styles.noteText}
                                >
                                    "{note[1].note_text}"
                                </Text>}
                            </View>
                        </View>}
                        {note[2] && <View
                            style={styles.itemContainer}
                        >
                            <View
                                style={styles.typeContainer}
                            >
                                <Text
                                    style={styles.typeText}
                                >
                                    {note[2].note_type}
                                </Text>
                                {note[2].note_text.length != 0 && 
                                <Text
                                    style={styles.noteText}
                                >
                                    "{note[2].note_text}"
                                </Text>}
                            </View>
                        </View>}

                        <View
                            style={styles.infoContainer}
                        >
                            <View
                                style={styles.priorityStatusContainer}
                            >
                                <View
                                    style={styles.priorityContainer}
                                >
                                    <Text
                                        style={styles.infoTitleText}
                                    >
                                        PRIORITY
                                    </Text>
                                    {must && <Image
                                        source={Images.must}
                                        resizeMode = 'stretch'
                                        style={[styles.priorityInfo, { width: 13.07 * Metrics.screenWidth / 100 }]}
                                    />}
                                    {!must && <Image
                                        source={Images.should}
                                        resizeMode = 'stretch'
                                        style={[styles.priorityInfo, { width: (16.8 * Metrics.screenWidth) / 100 }]}
                                    />}
                                </View>
                                <View
                                    style={styles.statusContainer}
                                >
                                    <Text
                                        style={styles.infoTitleText}
                                    >
                                        STATUS
                                    </Text>
                                    {report.status == "NEW" && <View
                                        style={{
                                            height: 2.17 * Metrics.screenHeight / 100,
                                            width: 11.2 * Metrics.screenWidth / 100,
                                            borderRadius: 13,
                                            backgroundColor: '#F2A63C',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginTop: 1.2 * Metrics.screenHeight / 100,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: '#FFFFFF',
                                                fontSize: 12,
                                                fontWeight: '500',
                                                lineHeight: 14,
                                            }}
                                        >
                                            {report.status}
                                        </Text>
                                    </View>}
                                    {report.status == "IN-PROGRESS" && <View
                                        style={{
                                            height: 2.17 * Metrics.screenHeight / 100,
                                            width: 24.8 * Metrics.screenWidth / 100,
                                            borderRadius: 13,
                                            backgroundColor: '#3498DB',
                                            marginTop: 1.2 * Metrics.screenHeight / 100,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: '#FFFFFF',
                                                fontSize: 12,
                                                fontWeight: '500',
                                                lineHeight: 14,
                                            }}
                                        >
                                            {report.status}
                                        </Text>
                                    </View>}
                                    {report.status == "SOLVED" && <View
                                        style={{
                                            height: 2.17 * Metrics.screenHeight / 100,
                                            width: 19.73 * Metrics.screenWidth / 100,
                                            borderRadius: 13,
                                            backgroundColor: '#16C72E',
                                            marginTop: 1.2 * Metrics.screenHeight / 100,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: '#FFFFFF',
                                                fontSize: 12,
                                                fontWeight: '500',
                                                lineHeight: 14,
                                            }}
                                        >
                                            {report.status}
                                        </Text>
                                    </View>}
                                </View>
                            </View>
                            <View
                                style={styles.userDateContainer}
                            >
                                {!history && <View
                                    style={styles.userContainer}
                                >
                                    <Text
                                        style={styles.infoTitleText}
                                    >
                                        REQUEST BY
                                    </Text>
                                    <View
                                        style={styles.userInfo}
                                    >
                                        <Avatar
                                            small
                                            rounded
                                            title = {item.report.sender.charAt(0)}
                                        />
                                        <Text
                                            style={styles.userText}
                                        >
                                            {item.report.sender}
                                        </Text>
                                    </View>
                                </View>}
                                <View
                                    style={styles.dateContainer}
                                >
                                    <Text
                                        style={styles.infoTitleText}
                                    >
                                        DATE REQUEST
                                    </Text>

                                    <Text
                                        style={styles.dateText}
                                    >
                                        {item.date}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        {this.state.images[0] && <View
                            style={{ backgroundColor: 'white', height: '50%' }}
                        >
                            <Text
                                style={[styles.infoTitleText, {
                                    marginLeft: 5.33 * Metrics.screenWidth / 100,
                                    marginTop: 3.75 * Metrics.screenHeight / 100,
                                }]}
                            >
                                IMAGE
                            </Text>
                            <View
                                style={styles.imageContainer}
                            >
                                <FlatList
                                    data={this.state.images}
                                    renderItem={this.renderItem}
                                    numColumns={4}
                                    scrollEnabled={false}
                                    keyExtractor={item => item.index}
                                />
                            </View>
                        </View>}
                        <Modal
                            visible={this.state.modalVisible}
                            transparent={false}
                        >
                            <View
                                style={{
                                    height: Metrics.screenHeight,
                                    width: Metrics.screenWidth,
                                    alignSelf: 'center',
                                }}
                            >
                                <ImageViewer
                                    renderHeader={() => {
                                        return (
                                            <TouchableOpacity
                                                style={{ width: '10%', marginTop: 20, marginLeft: '85%' }}
                                                onPress={() => this.setState({ modalVisible: false })}
                                            >
                                                <Icon
                                                    name='close'
                                                    size={30}
                                                    color='white'
                                                />
                                            </TouchableOpacity>
                                        )
                                    }}
                                    imageUrls={this.state.images}
                                    index={this.state.imageIndex}
                                    //backgroundColor="white"
                                    enableSwipeDown="true"
                                    onCancel={() => this.setState({ modalVisible: false })}
                                />
                            </View>
                        </Modal>
                    </ScrollView>
                    {this.state.user.role == "staff" && report.status != "SOLVED" && <View
                        style={styles.acceptReportContainer}
                    >
                        <Text
                            style={styles.markReportText}
                        >
                            Mark report as
                        </Text>
                        <View
                            style={{ flexDirection: 'row' }}
                        >
                            {report.status == "NEW" &&
                                <TouchableOpacity
                                    style={styles.doingButtonContainer}
                                    onPress={() => {
                                        this.onPressDoing()
                                    }}
                                >
                                    <Text
                                        style={styles.doingText}
                                    >
                                        In-progress
                                    </Text>
                                </TouchableOpacity>}
                            <TouchableOpacity
                                style={[styles.doneButtonContainer, {
                                    width: this.props.navigation.state.params.item.report.status == "IN-PROGRESS" ? 89.33 * Metrics.screenWidth / 100 : 42.4 * Metrics.screenWidth / 100,
                                    marginLeft: this.props.navigation.state.params.item.report.status == "IN-PROGRESS" && 5.33 * Metrics.screenWidth / 100 || 0,
                                }]}
                                onPress={() => {
                                    this.onPressDone()
                                }}
                            >
                                <Text
                                    style={styles.doneText}
                                >
                                    Solved
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>}
                </View>

            )
        }
    }
}

const styles = StyleSheet.create({
    targetStatusText:
    {
        position: 'absolute',
        right: 4.27 * Metrics.screenWidth / 100,
        top: 4.05 * Metrics.screenHeight / 100,
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 18,
    },
    assetNameText:
    {
        color: '#274541',
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 18,
        marginBottom: 0.6 * Metrics.screenHeight / 100,
    },
    zoneNameText:
    {
        color: '#A5ADAD',
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        lineHeight: 16,
    },
    targetInfoTextContainer:
    {
        flexDirection: 'column',
        marginTop: 2.4 * Metrics.screenHeight / 100,
    },
    targetImage:
    {
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3,
        height: 10.79 * Metrics.screenHeight / 100,
        width: 19.2 * Metrics.screenWidth / 100,
        marginRight: 4.27 * Metrics.screenWidth / 100,
    },
    targetInfoContainer:
    {
        backgroundColor: '#F8F9F9',
        width: Metrics.screenWidth,
        height: 16.79 * Metrics.screenHeight / 100,
    },
    targetInfoButton:
    {
        height: 10.79 * Metrics.screenHeight / 100,
        width: 89.33 * Metrics.screenWidth / 100,
        backgroundColor: '#FFFFFF',
        borderRadius: 3,
        marginVertical: 3 * Metrics.screenHeight / 100,
        marginHorizontal: 5.33 * Metrics.screenWidth / 100,
        flexDirection: 'row'
    },
    doingText:
    {
        color: '#2EBAAB',
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 16,
    },
    doneText:
    {
        color: '#FFFFFF',
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 24,
    },
    doingButtonContainer:
    {
        height: 7.2 * Metrics.screenHeight / 100,
        width: 42.4 * Metrics.screenWidth / 100,
        borderWidth: 1,
        borderColor: '#2EBAAB',
        borderRadius: 3,
        backgroundColor: '#FFFFFF',
        //box-shadow: 0 0 5px 0 rgba(227,230,230,0.12);
        marginLeft: 5.33 * Metrics.screenWidth / 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 4.53 * Metrics.screenWidth / 100,
    },
    doneButtonContainer:
    {
        height: 7.2 * Metrics.screenHeight / 100,
        borderRadius: 3,
        backgroundColor: '#2EBAAB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    markReportText:
    {
        color: '#8C9B99',
        fontFamily: 'Roboto-Medium',
        fontSize: 13,
        fontWeight: '500',
        lineHeight: 15,
        marginLeft: 5.33 * Metrics.screenWidth / 100,
        marginTop: 2.55 * Metrics.screenHeight / 100,
        marginBottom: 1.2 * Metrics.screenHeight / 100,
    },
    acceptReportContainer:
    {
        width: Metrics.screenWidth,
        height: 15.14 * Metrics.screenHeight / 100,
        backgroundColor: 'white'
    },
    container:
    {
        backgroundColor: '#F8F9F9',
    },
    infoContainer:
    {
        width: '100%',
        flexDirection: 'column',
        paddingLeft: 5.33 * Metrics.screenWidth / 100,
        paddingTop: 3.75 * Metrics.screenHeight / 100,
        backgroundColor: 'white',
    },
    priorityStatusContainer:
    {
        flexDirection: 'row',
        marginBottom: 3.75 * Metrics.screenHeight / 100,
    },
    userDateContainer:
    {
        flexDirection: 'row',
    },
    typeText:
    {
        color: '#274541',
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 18,
        marginBottom: 1.2 * Metrics.screenHeight / 100,
    },
    noteText:
    {
        color: '#A5ADAD',
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        lineHeight: 16,
    },
    itemContainer:
    {
        width: '100%',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EFEFEF',
        backgroundColor: 'white',
    },
    typeContainer:
    {
        flexDirection: 'column',
        marginTop: 2.4 * Metrics.screenHeight / 100,
        marginBottom: 2.4 * Metrics.screenHeight / 100,
        marginLeft: 5.33 * Metrics.screenWidth / 100,
    },
    issueContainer:
    {
        width: Metrics.screenWidth,
        borderBottomWidth: 1,
        borderBottomColor: '#EFEFEF',
        backgroundColor: 'white',
    },
    kindOfIssue:
    {
        marginLeft: 5.33 * Metrics.screenWidth / 100,
        marginTop: 3 * Metrics.screenHeight / 100,
        marginBottom: 1.5 * Metrics.screenHeight / 100,
        color: '#CCCFCE',
        fontFamily: 'Roboto-Medium',
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 1.08,
        lineHeight: 15,
    },
    statusContainer:
    {
        //marginBottom: 3.75*Metrics.screenHeight/100,
    },
    imageContainer:
    {
        flexDirection: 'row',
        marginTop: 1.2 * Metrics.screenHeight / 100,
        marginLeft: 5.33 * Metrics.screenWidth / 100,
        marginBottom: 50,
    },
    itemImageContainer:
    {
        width: 19.2 * Metrics.screenWidth / 100,
        height: 19.2 * Metrics.screenWidth / 100,
        marginRight: 4.27 * Metrics.screenWidth / 100,
        borderRadius: 3,
    },
    userContainer:
    {
        marginRight: 14.93 * Metrics.screenWidth / 100,
    },
    priorityContainer:
    {
        marginRight: 21.87 * Metrics.screenWidth / 100,
    },
    dateContainer:
    {

    },
    infoTitleText:
    {
        color: '#D6D8D8',
        fontFamily: 'Roboto-Medium',
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 1.08,
        lineHeight: 15,
    },
    priorityInfo:
    {
        marginTop: 1.2 * Metrics.screenHeight / 100,
        height: 2.7 * Metrics.screenHeight / 100,
    },
    statusInfo:
    {
        height: 2.7 * Metrics.screenHeight / 100,
        width: 24.8 * Metrics.screenWidth / 100,
        borderRadius: 13,
        backgroundColor: '#3498DB',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 1.2 * Metrics.screenHeight / 100,
    },
    statusText:
    {
        color: '#FFFFFF',
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 14,
    },
    userInfo:
    {
        flexDirection: 'row',
        marginTop: 1.2 * Metrics.screenHeight / 100,
        alignItems: 'center',

    },
    userText:
    {
        marginLeft: 2.13 * Metrics.screenWidth / 100,
        color: '#274541',
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        lineHeight: 16,
    },
    dateText:
    {
        color: '#274541',
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        lineHeight: 16,
        marginTop: 2.5 * Metrics.screenHeight / 100,
    },
})