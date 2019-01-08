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
    AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';

const { width, height } = Dimensions.get('window');

class Giris extends Component {
    constructor(props) {
        super(props)
        this.state = { name: '' }
    }

    componentWillMount() {
        AsyncStorage.getItem('name').then((name) => {
            this.setState({ name: name })
        })
    }
    CheckLength(nickNameLength) {
        if (nickNameLength <= 2) {
            alert('The username must contain at least three characters.');
        }
        else {
            let name = this.state.name
            AsyncStorage.setItem('name', name);
            this.setState({ name: name })
            Actions.MessageScreen();
        }
    }
    render() {
        return (
            <View
                style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
            >
                <TextInput
                    style={{ alignSelf: 'stretch' , textAlign : 'center' }}
                    autoFocus={true}
                    value={this.state.name}
                    onChangeText={(name) => this.setState({ name })}
                />
                <TouchableOpacity
                    style={styles.buttonStyle}
                >
                    <Button
                        onPress={() => this.CheckLength(this.state.name.length)}
                        title="GİRİŞ"
                    />
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = {
    buttonStyle: {
        alignSelf: 'stretch',
        backgroundColor: '#007aff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5,
    }
}

export default Giris;
