// @ts-nocheck
import React, { Component } from "react";
import {
    View,
    FlatList,
    TouchableOpacity,
    Text,
    Modal,
    Image,
    StyleSheet,
    AsyncStorage,
    Platform,
    NativeModules,
    Alert,
} from "react-native";
import { Header, Icon, Card } from "react-native-elements";
import axios from "axios";
import { Fonts, Colors, Metrics, Images } from "../../Themes/";
import LoadingComponent from '../../Components/LoadingComponent/LoadingComponent'

export default class ReportHistoryScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            modalVisible: false,
            detailData: {},
            user: {},
            manager: false,
            onPriority: false,
            onStatus: false,
            loading: false,
            refreshing: false,
            status: 'all',
            priority: 'all',
            statusText: 'All status',
            priorityText: 'All priority',
        };
        //this.onLoadData = this.onLoadData.bind(this)
    }

    onloadData = async () =>
    {
        this.setState({loading: true})
        let user = {
            role: '',
            username: '',
        }
        user.role = await AsyncStorage.getItem('role')
        user.username = await AsyncStorage.getItem('username')
        this.setState({ user: user })
        //console.warn(this.state.user)
        if (this.state.user.role == 'client') {
            try{
                let res = await axios
                    .get(
                        `http://api.honeycomb2.geekup.vn/api/report/history/${
                        this.state.user.username
                        }/zone`
                    )
                if (res.status == 200 && !res.data.message)
                    this.setState({ data: res.data, loading: false })
                else
                    this.setState({ data: [], loading: false })
            } catch (e)
            {
                Alert.alert(
                    'Oops...',
                    'There is something wrong, please try again',
                    [
                    {text: 'Try again', onPress: () => {
                        //this.onloadData()
                        }
                    },
                    ],
                    { cancelable: false }
                )
            }
        }
        if(this.state.user.role == 'staff')
        {
            try{          
                let res = await axios.get(`http://api.honeycomb2.geekup.vn/api/report/zone/filter?status=all&priority=all&page=1`)
                if (res.status == 200 && !res.data.message)
                    this.setState({ data: res.data.list_report, loading: false })
                else
                    this.setState({ data: [], loading: false })
            } catch (e)
            {
                Alert.alert(
                    'Oops...',
                    'There is something wrong, please try again',
                    [
                    {text: 'Try again', onPress: () => {
                        //this.onloadData()
                        }
                    },
                    ],
                    { cancelable: false }
                )
                //console.error(e)
            }
        }
    }

    onFilter = async (status, priority) =>
    {
        try{
            //console.warn("ok")
            this.setState({status: status, priority: priority, onStatus: false, onPriority: false})
            this.setState({loading: true})
            console.warn("status: " + this.state.status + " priority: " + this.state.priority)
            let res = await axios.get(`http://api.honeycomb2.geekup.vn/api/report/zone/filter?status=${status}&priority=${priority}&page=1`)
            if (res.status == 200 && !res.data.message)
                this.setState({ data: res.data.list_report, loading: false })
            else
                this.setState({ data: [], loading: false })
        } catch (e)
        {
            Alert.alert(
                'Oops...',
                'There is something wrong, please try again',
                [
                {text: 'Try again', onPress: () => {
                    this.onFilter(status, priority)
                    }
                },
                ],
                { cancelable: false }
            )
        }
    }

    componentDidMount = async () => {
        this.onloadData()
    }

    setModalVisible = visible => {
        this.setState({ modalVisible: visible });
    };

    renderItem = ({ item }) => {
        const report = item;
        const type = item.type;
        const day = report.send_date.substring(8, 10);
        const month = report.send_date.substring(5, 7);
        const year = report.send_date.substring(0, 4);
        const date = `${day}/${month}/${year}`;
        return (
            <TouchableOpacity
                onPress={() => {
                    let param = {
                        report: report,
                        name: item.zone_name,
                        date: date,
                        history: this.state.user.role == "staff" ? false : true,
                    }
                    if (this.state.user.role == "client") {
                        this.props.navigation.navigate("UserReportDetailScreen", { item: param })
                    }
                    else {
                        this.props.navigation.navigate("ManagerReportDetailScreen", {screen: this, item: param })
                    }
                }}
                style={{
                    //height: 20 * Metrics.screenHeight / 100,
                    backgroundColor: '#FFFFFF',
                    marginBottom: 1.93 * Metrics.screenHeight / 100,
                }}
            >
                {this.state.user.role == "staff" && report.priority == "MUST" && (
                    <View
                        style={{
                            position: "absolute",
                            right: (5.33 * Metrics.screenWidth) / 100,
                            top: (2.29 * Metrics.screenHeight) / 100,
                            height: (4 * Metrics.screenHeight) / 100,
                            width: (14 * Metrics.screenWidth) / 100,
                            //backgroundColor: 'green',
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Image
                            resizeMode = 'stretch'
                            source={Images.must}
                            style={{
                                height: (2.7 * Metrics.screenHeight) / 100,
                                width: (13.07 * Metrics.screenWidth) / 100
                            }}
                        />
                    </View>
                )}
                {this.state.user.role == "staff" && report.priority == "SHOULD" && (
                    <View
                        style={{
                            position: "absolute",
                            right: (5.33 * Metrics.screenWidth) / 100,
                            top: (2.29 * Metrics.screenHeight) / 100,
                            height: (4 * Metrics.screenHeight) / 100,
                            width: (18 * Metrics.screenWidth) / 100,
                            //backgroundColor: 'green',
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Image
                            resizeMode = 'stretch'
                            source={Images.should}
                            style={{
                                height: (2.7 * Metrics.screenHeight) / 100,
                                width: (16.8 * Metrics.screenWidth) / 100,
                            }}
                        />
                    </View>
                )}
                <View
                    style={{
                        flexDirection: 'row',
                        width: '100%',
                        height: 19.2 * Metrics.screenWidth / 100,
                        marginTop: 2.41 * Metrics.screenHeight / 100,
                    }}
                >
                    <Image
                        source={
                            report.img_url[0] ? {uri: report.img_url[0]} : require('../../../Assets/Images/zone_test.png')
                        }
                        style={{
                            width: 19.2 * Metrics.screenWidth / 100,
                            height: 8.17 * Metrics.screenHeight / 100,
                            height: '100%',
                            marginLeft: 5.33 * Metrics.screenWidth / 100,
                            borderRadius: 3,
                        }}
                    />
                    <View
                        style={{
                            flexDirection: 'column',
                            height: '100%',
                            width: '80%',
                            marginLeft: 3.73 * Metrics.screenWidth / 100,
                        }}
                    >
                        <Text
                            style={{
                                marginTop: 1.69 * Metrics.screenHeight / 100,
                                color: '#274541',
                                fontSize: 16,
                                fontWeight: '500',
                                lineHeight: 18,
                            }}
                        >{item.zone_name}</Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                height: 3.5 * Metrics.screenHeight / 100,
                                width: '100%',
                                marginTop: 0.96 * Metrics.screenHeight / 100,
                            }}
                        >
                            <Text
                                style={{
                                    color: '#274541',
                                    fontSize: 14,
                                    lineHeight: 18,
                                }}
                            >{type[0]}</Text>
                            {type[1] && <Icon
                                name='lens'
                                size={5}
                                color='#CCCFCE'
                                containerStyle={{
                                    marginHorizontal: 1.6 * Metrics.screenWidth / 100,
                                }}
                            />}
                            {type[1] && <Text
                                style={{
                                    color: '#274541',
                                    fontSize: 14,
                                    lineHeight: 18,
                                }}
                            >{type[1]}</Text>}
                            {type[2] && <Icon
                                name='lens'
                                size={5}
                                color='#CCCFCE'
                                containerStyle={{
                                    marginHorizontal: 1.6 * Metrics.screenWidth / 100,
                                }}
                            />}
                            {type[2] && <Text
                                style={{
                                    color: '#274541',
                                    fontSize: 14,
                                    lineHeight: 18,
                                }}
                            >{type[2]}</Text>}
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        //backgroundColor: 'green',
                        width: '100%',
                        height: 4.31 * Metrics.screenHeight / 100,
                        marginTop: 2 * Metrics.screenHeight / 100,
                        alignItems: 'center',
                        borderTopWidth: 1,
                        borderTopColor: '#F8F8F8',
                    }}
                >
                    <Text
                        style={{
                            marginLeft: 5.33 * Metrics.screenWidth / 100,
                            color: '#CCCFCE',
                            fontSize: 14,
                            lineHeight: 16,
                        }}
                    >{date}</Text>
                    {report.status == "NEW" && <View
                        style={{
                            height: 2.17 * Metrics.screenHeight / 100,
                            width: 11.2 * Metrics.screenWidth / 100,
                            borderRadius: 13,
                            backgroundColor: '#F2A63C',
                            marginLeft: 58.13 * Metrics.screenWidth / 100,
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
                        >{report.status}</Text>
                    </View>}
                    {report.status == "IN-PROGRESS" && <View
                        style={{
                            height: 2.17 * Metrics.screenHeight / 100,
                            width: 24.8 * Metrics.screenWidth / 100,
                            borderRadius: 13,
                            backgroundColor: '#3498DB',
                            marginLeft: 44.53 * Metrics.screenWidth / 100,
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
                        >{report.status}</Text>
                    </View>}
                    {report.status == "SOLVED" && <View
                        style={{
                            height: 2.17 * Metrics.screenHeight / 100,
                            width: 19.73 * Metrics.screenWidth / 100,
                            borderRadius: 13,
                            backgroundColor: '#16C72E',
                            marginLeft: 49.6 * Metrics.screenWidth / 100,
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
                        >{report.status}</Text>
                    </View>}
                </View>
            </TouchableOpacity>
        );
    };
    render() {
        const { data } = this.state;
        const { StatusBarManager } = NativeModules
        const StatusbarHeight = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT
        //console.warn(data.length)
        //alert("status: " + this.state.status + " priority: " + this.state.priority)
        if (this.state.loading) {
            return (
                <LoadingComponent />
            )
        }
        else{
        return (
            <View style={{ flex: 1 }}>
                {this.state.user.role == "staff" &&
                    <View style={styles.sortFilter}>
                        <TouchableOpacity
                            style={styles.priorityButton}
                            onPress={() => {
                                this.setState({ onPriority: true })
                            }}
                        >
                            <Text style={styles.priorityText}>{this.state.priorityText}</Text>
                            <Icon
                                name="keyboard-arrow-down"
                                size={26}
                                iconStyle={{
                                    color: "#CCCFCE"
                                }}
                                containerStyle={{
                                    position: 'absolute',
                                    right: 0,
                                    alignSelf: 'center',
                                }}
                            />
                            <Modal
                                transparent={true}
                                visible={this.state.onPriority}
                                onRequestClose = {()=>{this.setState({onPriority: false})}}
                            >
                                <View
                                    style={{
                                        height: Metrics.screenHeight,
                                        width: Metrics.screenWidth,
                                    }}
                                >
                                    <TouchableOpacity
                                        style={{
                                            height: Metrics.screenHeight,
                                            width: Metrics.screenWidth,
                                        }}
                                        activeOpacity={0}
                                        onPress={() => {
                                            this.setState({ onPriority: false, })
                                        }}
                                    >
                                    </TouchableOpacity>
                                    <View
                                        style={{
                                            position: 'absolute',
                                            //height: (10 * Metrics.screenHeight) / 100,
                                            width: 43.47 * Metrics.screenWidth / 100,
                                            marginTop: Platform.OS === 'ios' ? 25.5 * Metrics.screenHeight / 100 : (25.5 * Metrics.screenHeight / 100) - StatusbarHeight,
                                            left: 4.27 * Metrics.screenWidth / 100,
                                            borderWidth: 1,
                                            borderColor: "#F0F2F2",
                                            borderRadius: 3,
                                            backgroundColor: "#FFFFFF",
                                            shadowRadius: 5,
                                            shadowColor: "rgba(227,230,230,0.12)",
                                            paddingLeft: '14.89%'
                                            //backgroundColor: 'red'
                                        }}
                                    >
                                        <TouchableOpacity
                                            style={{
                                                marginBottom: '14.01%',
                                                marginTop: '17.83%',
                                            }}
                                            onPress = {()=>{
                                                //console.warn('ok')
                                                this.setState({priorityText: 'All priority'})
                                                this.onFilter(this.state.status, "all")
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: '#274542',
                                                    fontFamily: 'Roboto-Regular',
                                                    fontSize: 14,
                                                    //fontWeight: '500',
                                                    lineHeight: 16,
                                                }}
                                            >
                                                All priority
                                        </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{
                                                marginBottom: '14.01%',
                                            }}
                                            onPress = {()=>{
                                                this.setState({priorityText: 'Must'})
                                                this.onFilter(this.state.status, "must")
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: '#274542',
                                                    fontFamily: 'Roboto-Regular',
                                                    fontSize: 14,
                                                    lineHeight: 16,
                                                }}
                                            >
                                                Must
                                        </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{
                                                marginBottom: '17.83%'
                                            }}
                                            onPress = {()=>{
                                                this.setState({priorityText: 'Should'})
                                                this.onFilter(this.state.status, "should")
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: '#274542',
                                                    fontFamily: 'Roboto-Regular',
                                                    fontSize: 14,
                                                    lineHeight: 16,
                                                }}
                                            >
                                                Should
                                        </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.statusButton}
                            onPress={() => {
                                this.setState({ onStatus: true })
                            }}
                        >
                            <Text style={styles.statusText}>{this.state.statusText}</Text>
                            <Icon
                                name="keyboard-arrow-down"
                                size={26}
                                iconStyle={{
                                    color: "#CCCFCE"
                                }}
                                containerStyle={{
                                    position: 'absolute',
                                    right: 0,
                                    alignSelf: 'center',
                                }}
                            />
                            <Modal
                                transparent={true}
                                visible={this.state.onStatus}
                            >
                                <View
                                    style={{
                                        height: Metrics.screenHeight,
                                        width: Metrics.screenWidth,
                                    }}
                                >
                                    <TouchableOpacity
                                        style={{
                                            height: Metrics.screenHeight,
                                            width: Metrics.screenWidth,
                                        }}
                                        activeOpacity={0}
                                        onPress={() => {
                                            this.setState({ onStatus: false, })
                                        }}
                                    >
                                    </TouchableOpacity>
                                    <View
                                        style={{
                                            position: 'absolute',
                                            //height: (10 * Metrics.screenHeight) / 100,
                                            width: 43.47 * Metrics.screenWidth / 100,
                                            marginTop: Platform.OS === 'ios' ? 25.5 * Metrics.screenHeight / 100 : (25.5 * Metrics.screenHeight / 100) - StatusbarHeight,
                                            //marginLeft: 52.27 * Metrics.screenWidth / 100,
                                            right: 4.27 * Metrics.screenWidth / 100,
                                            borderWidth: 1,
                                            borderColor: "#F0F2F2",
                                            borderRadius: 3,
                                            backgroundColor: "#FFFFFF",
                                            shadowRadius: 5,
                                            shadowColor: "rgba(227,230,230,0.12)",
                                            paddingLeft: '14.89%'
                                            //backgroundColor: 'red'
                                        }}
                                    >
                                        <TouchableOpacity
                                            style={{
                                                marginBottom: '11.22%',
                                                marginTop: '14.29%',
                                            }}
                                            onPress = {()=>{
                                                this.setState({statusText: 'All status'})
                                                this.onFilter("all", this.state.priority)
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: '#274542',
                                                    fontFamily: 'Roboto-Regular',
                                                    fontSize: 14,
                                                    //fontWeight: '500',
                                                    lineHeight: 16,
                                                }}
                                            >
                                                All status
                                        </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{
                                                marginBottom: '11.22%',
                                            }}
                                            onPress = {()=>{
                                                this.setState({statusText: 'New'})
                                                this.onFilter("new", this.state.priority)
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: '#274542',
                                                    fontFamily: 'Roboto-Regular',
                                                    fontSize: 14,
                                                    lineHeight: 16,
                                                }}
                                            >
                                                New
                                        </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{
                                                marginBottom: '11.22%',
                                            }}
                                            onPress = {()=>{
                                                this.setState({statusText: 'In - progress'})
                                                this.onFilter("inprogress", this.state.priority)
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: '#274542',
                                                    fontFamily: 'Roboto-Regular',
                                                    fontSize: 14,
                                                    lineHeight: 16,
                                                }}
                                            >
                                                In - progress
                                        </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{
                                                marginBottom: '14.29%'
                                            }}
                                            onPress = {()=>{
                                                this.setState({statusText: 'Solved'})
                                                this.onFilter("solved", this.state.priority)
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: '#274542',
                                                    fontFamily: 'Roboto-Regular',
                                                    fontSize: 14,
                                                    lineHeight: 16,
                                                }}
                                            >
                                                Solved
                                        </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                        </TouchableOpacity>
                    </View>}
                {data.length != 0 && (
                    <View style={{ flex: 1, backgroundColor: '#F7F8F8' }}>
                        <FlatList
                            style={{ marginTop: (2.41 * Metrics.screenHeight) / 100 }}
                            data={data}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => item.id}
                            refreshing = {this.state.refreshing}
                            onRefresh = {this.onloadData}
                        />
                    </View>
                )}
                {data.length == 0 &&
                    <View style={{ flex: 1, backgroundColor: '#F7F8F8', alignItems: 'center', justifyContent: 'center' }}>
                        <Text
                            style = {{
                                fontFamily: 'Roboto-Regular',
                                fontSize: 14,
                                lineHeight: 16,
                            }}
                        >
                            There is no result
                        </Text>
                    </View>
                }
            </View>
        );
    }
    }
}

const styles = StyleSheet.create({
    sortFilter: {
        width: Metrics.screenWidth,
        height: (7.11 * Metrics.screenHeight) / 100,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: '#F7F8F8'
    },
    statusButton: {
        flexDirection: "row",
        marginLeft: (4.53 * Metrics.screenWidth) / 100,
        marginTop: (2.27 * Metrics.screenHeight) / 100,
        marginRight: (4.2 * Metrics.screenWidth) / 100,
        borderWidth: 1,
        borderColor: "#F0F2F2",
        borderRadius: 3,
        backgroundColor: "#FFFFFF",
        shadowRadius: 5,
        shadowColor: "rgba(227,230,230,0.12)",
        alignItems: "center",
        height: (4.54 * Metrics.screenHeight) / 100,
        width: 43.47 * Metrics.screenWidth / 100,
    },
    priorityButton: {
        flexDirection: "row",
        marginLeft: (4.27 * Metrics.screenWidth) / 100,
        marginTop: (2.27 * Metrics.screenHeight) / 100,
        borderWidth: 1,
        borderColor: "#F0F2F2",
        borderRadius: 3,
        backgroundColor: "#FFFFFF",
        shadowRadius: 5,
        shadowColor: "rgba(227,230,230,0.12)",
        alignItems: "center",
        height: (4.54 * Metrics.screenHeight) / 100,
        width: 43.47 * Metrics.screenWidth / 100,
        //justifyContent: 'center',
        //elevation: 5,
    },
    statusText: {
        marginLeft: (3.2 * Metrics.screenWidth) / 100,
        color: "#CCCFCE",
        fontFamily: "Roboto-Regular",
        fontSize: 14,
        lineHeight: 16
    },
    priorityText: {
        marginLeft: (3.2 * Metrics.screenWidth) / 100,
        color: "#CCCFCE",
        fontFamily: "Roboto-Regular",
        fontSize: 14,
        lineHeight: 16
    }
});
