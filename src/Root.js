import React, { Component } from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import Giris from '../Giris/Giris';
import MessageScreen from '../MessageScreen/MessageScreen'

class Root extends Component {
    render() {
        return (
            <Router>
                <Scene>
                    <Scene
                        key='Giris'
                        component={Giris}
                        hideNavBar
                    />
                    <Scene
                        key='MessageScreen'
                        component={MessageScreen}
                        hideNavBar
                    />
                </Scene>
            </Router>
        )
    }
}

export default Root;