import React, { Component } from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    ActivityIndicator,
} from 'react-native'
import {
    Header,
    Icon,
    Card,
    Button,
    CheckBox,
} from 'react-native-elements'
import { Colors, Fonts } from '../../Themes/'
import axios from 'axios'

export default class ReportDetailScreen extends Component {
    constructor() {
        super()
        this.state = {
            zone: {},
            must: true,
            should: true,
            priority: 'Should',
            isLoading: true,
        }
    }

    getZone = async () => {
        let res = await axios.get(`http://api.honeycomb2.geekup.vn/api/zones/${this.props.navigation.state.params.item.zone_id}`)
        this.setState({ zone: res.data, isLoading: false })
    }
    componentDidMount() {
        this.getZone()
    }

    onPressButton = async () =>
    {
        const { navigation } = this.props
        const item = navigation.state.params.item
        if (item.status == "New") {
            let res = await axios.put(`http://api.honeycomb2.geekup.vn/api/report/${item.id}`,
                {
                    priority: this.state.priority,
                    status: 'In-Progress'
                }
            )
        }
        else if (item.status == "In-Progress") {
            let today = new Date();
            let dd = today.getDate();
            let mm = today.getMonth() + 1; //January is 0!
            let yyyy = today.getFullYear();

            if (dd < 10) {
                dd = "0" + dd;
            }

            if (mm < 10) {
                mm = "0" + mm;
            }

            today = dd + "-" + mm + "-" + yyyy;
            let res = await axios.put(`http://api.honeycomb2.geekup.vn/api/report/${item.id}`,
                {
                    priority: this.state.priority,
                    status: 'Solved',
                    done_date: today,
                }
            )
        }
        navigation.state.params.ZoneRequest._getData(item.zone_id)
        navigation.navigate('Request')
    }

    render() {
        const { navigation } = this.props
        const item = navigation.state.params.item
        if (this.state.isLoading) {
            return (
                <View
                    style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}
                >
                    <ActivityIndicator 
                        size = 'large' color = 'grey'
                    />
                </View>
            )
        }
        else {
            return (
                <View style={{ flex: 1 }}>
                    <View>
                        <Card>
                            <View>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={{ fontSize: 20 }}>Type: </Text>
                                    <Text style={{ fontSize: 20 }}>{item.type}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={{ fontSize: 20 }}>Priority: </Text>
                                    <Text style={{ fontSize: 20 }}>{item.priority}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={{ fontSize: 20 }}>Location: </Text>
                                    <Text style={{ fontSize: 20 }}>{this.state.zone.name}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={{ fontSize: 20 }}>Status: </Text>
                                    <Text style={{ fontSize: 20 }}>{item.status}</Text>
                                </View>
                            </View>
                        </Card>
                    </View>
                    {item.status == 'New' &&
                        <View>
                            <CheckBox
                                title='Must'
                                onPress={() => {
                                    if (!this.state.must) {
                                    } else {
                                        this.setState({ must: false })
                                        this.setState({ should: true })
                                        this.setState({ priority: 'Must' })
                                    }
                                }}
                                containerStyle={{
                                    backgroundColor: 'transparent',
                                    borderWidth: 0
                                }}
                                textStyle={{
                                    fontSize: 20
                                }}
                                iconType='MaterialIcons'
                                uncheckedIcon='check-box'
                                checkedIcon='check-box-outline-blank'
                                uncheckedColor='green'
                                checkedColor='green'
                                size={30}
                                checked={this.state.must}
                            />
                            <CheckBox
                                title='Should'
                                onPress={() => {
                                    if (!this.state.should) {
                                    } else {
                                        this.setState({ should: false })
                                        this.setState({ must: true })
                                        this.setState({ priority: 'Should' })
                                    }
                                }}
                                containerStyle={{
                                    backgroundColor: 'transparent',
                                    borderWidth: 0
                                }}
                                textStyle={{
                                    fontSize: 20
                                }}
                                iconType='MaterialIcons'
                                uncheckedIcon='check-box'
                                checkedIcon='check-box-outline-blank'
                                uncheckedColor='green'
                                checkedColor='green'
                                size={30}
                                checked={this.state.should}
                            />

                        </View>}
                    {item.status != 'Solve' &&
                        <Button
                            title={item.status == 'New' ? 'ACCEPT' : 'DONE'}
                            buttonStyle={{ width: '100%', backgroundColor: '#ff9c46' }}
                            containerViewStyle={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                bottom: 0,
                            }}
                            onPress={() => {this.onPressButton()}}
                        />}
                </View>
            )
        }
    }
}