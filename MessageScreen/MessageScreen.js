import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
    Dimensions,
    Alert,
    AsyncStorage,
    Image,
    ScrollView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import Timestamp from 'react-timestamp';

const { width, height } = Dimensions.get('window');


class MessageScreen extends Component {
    constructor(props) {
        super(props)
        this.state = { nickName: '', data: [], inputText: '', clickSend: false, submittedData: [] }
    }
    componentWillMount() {
        AsyncStorage.getItem('name').then((name) => {
            this.setState({ nickName: name })
        });
        axios.get('https://jsonblob.com/api/jsonBlob/867414ff-1124-11e9-91d8-a16c416c8ce7')
            .then(response => this.setState({ data: response.data.messages }));
    }

    renderData() {
        return this.state.data.map(responseData =>
            <View style={{ flexDirection: 'row' }}
                key={responseData.id}
            >
                <Image
                    source={{ uri: responseData.user.avatarUrl }}
                    style={styles.comingImageDataStyle}
                />
                <View>
                    <Text style={styles.comingNickNameDataStyle}>{responseData.user.nickname}</Text>
                    <View style={{
                        backgroundColor: '#b6c8ef',
                        width: width*0.78,
                        height: ((responseData.text.length) / 2) + 25,
                        borderRadius: 10,
                        marginLeft: 10
                    }}>
                        <Text style={styles.comingTextStyle}>{responseData.text}</Text>
                    </View>
                    <Timestamp time={responseData.timestamp} format='full' component={Text} style={{ textAlign: 'right' }} />
                </View>
            </View>
        );
    }
    renderMyMessage(send) {
        if (send == true) {
            return this.state.submittedData.map(responseView =>
                <View style={styles.myMessageViewStyle} key={responseView.id}>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ textAlign: 'right' }}>Me</Text>
                        <View style={{
                            backgroundColor: '#b6c8ef',
                            width:width*0.80,
                            height: ((responseView.text.length) / 2) + 30,
                            borderRadius: 10
                        }}>
                            <Text style={styles.myMessageTextStyle}>{responseView.text}</Text>
                        </View>
                        <Timestamp time={new Date()} format='full' component={Text} style={{ textAlign: 'left' }} />
                    </View>
                    <Image
                        source={require('../src/img/userAvatar.png')}
                        style={styles.myMessageAvatarStyle}
                    />
                </View>
            )
        }
    }
    _handleAddButton() {
        let newly_added_data = { text: this.state.inputText, id: 0 };

        this.setState({
            submittedData: [...this.state.submittedData, newly_added_data],
            clickSend: true,
            inputText: ''
        });
    }
    render() {

        return (
            <View style={{ flex: 1 }}>
                <View style={styles.nickNameViewStyle}
                >
                    <TouchableOpacity
                        onPress={() => Actions.Giris()}
                        style={{ flexDirection: 'row' }}>
                        <Image
                            style={styles.imageStyle}
                            source={require('../src/img/back.png')}
                        />
                        <Text style={{ marginTop: 10, fontWeight: 'bold' }}>Home</Text>
                    </TouchableOpacity>
                    <Text style={styles.textStyle}> {this.state.nickName}</Text>
                </View>
                <ScrollView style={{ width, height: height * 0.76, marginBottom: 2 }}>
                    {this.renderData()}
                    {this.renderMyMessage(this.state.clickSend)}
                </ScrollView>
                <View
                    style={styles.bottomViewStyle}
                >
                    <TextInput
                        style={{ alignSelf: 'stretch', width: 315 }}
                        maxLength={120}
                        multiline={true}
                        placeholder='Enter Text'
                        value={this.state.inputText}
                        onChangeText={(inputText) => this.setState({ inputText })}
                    />
                    <TouchableOpacity
                        onPress={() => this._handleAddButton()}
                    >
                        <Image
                            style={styles.sendImageStyle}
                            source={require('../src/img/send.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View >
        )
    }
}

const styles = {
    textStyle: {
        textAlign: 'center',
        fontSize: height * 0.03,
        fontWeight: 'bold',
        height: height * 0.05,
        textAlignVertical: 'center',
        marginLeft: 67
    },
    imageStyle: {
        width: width * 0.05,
        height: height * 0.028,
        marginLeft: 10,
        marginTop: 10
    },
    nickNameViewStyle: {
        backgroundColor: '#4ca2ff',
        height: height * 0.057,
        flexDirection: 'row'
    },
    bottomViewStyle: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#b6c8ef',
        borderRadius: 15,
        marginBottom: 2
    },
    sendImageStyle: {
        width: width * 0.125,
        height: height * 0.065,
        marginTop: 2
    },
    comingImageDataStyle: {
        width: width * 0.138,
        height: height * 0.072,
        marginTop: 15,
        borderRadius: 5,
        marginLeft: 5
    },
    comingNickNameDataStyle: {
        width: width * 0.138,
        height: height * 0.028,
        marginTop: 15,
        borderRadius: 5,
        marginLeft: 5
    },
    comingTextStyle: {
        marginLeft: 5,
        marginTop: 2
    },
    myMessageViewStyle: {
        flexDirection: 'row',
        marginTop: 10
    },
    myMessageAvatarStyle: {
        width: width * 0.138,
        height: height * 0.072,
        marginTop: 6,
        marginLeft: 5
    },
    myMessageTextStyle: {
        marginTop: 2,
        marginLeft: 3
    }


}

export default MessageScreen;