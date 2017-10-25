// @flow
import autobind from "autobind-decorator";
import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import {Container, Button, Header, Left, Right, Body, Icon, Title, Spinner} from "native-base";
import { Constants, Location, Permissions } from 'expo';
import TriggerStore from './TriggerStore';

import {BaseContainer, Styles, Images} from "../components";

import variables from "../../native-base-theme/variables/commonColor";

export default class Trigger extends Component {
    store = new TriggerStore();

    state = {
        location: null,
        errorMessage: null,
    };

    @autobind
    async sos(): Promise<void> {
        try {
            await this.store.sos();
        } catch (e) {
            alert(e.message);
        }
    }

    @autobind
    async demo(): Promise<void> {
        try {
            await this.store.demo();
        } catch (e) {
            alert(e.message);
        }
    }

    emergencies() {
        return alert('¡Presionaste el botón de emergencia!');
    }

    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
            this.setState({ location });
    };

    render(): React$Element<*> {


        let text = 'Waiting..';
        let timestamp, longitude, latitude = null;
        if (this.state.errorMessage) {
            text = this.state.errorMessage;
        } else if (this.state.location) {
            text = JSON.stringify(this.state.location);
            timestamp = JSON.stringify(this.state.location.timestamp);
            latitude = JSON.stringify(this.state.location.coords.latitude);
            longitude = JSON.stringify(this.state.location.coords.longitude);
        } 

        console.log(text);
        console.log(timestamp);
        console.log(latitude);
        console.log(longitude);
        

        return <BaseContainer title="Trigger" navigation={this.props.navigation} scrollable>
        {
            <View style={styles.container}>
                <View  style={styles.button}>
                    <TouchableHighlight style={styles.pressbutton} onPress={this.emergencies}>
                        <Text>PRESS ME!</Text>
                    </TouchableHighlight>
                </View>
                
                <View  style={styles.button}>
                    <TouchableHighlight style={styles.pressbutton} onPress={this.demo}>
                        <Text>This Sleeper</Text>
                    </TouchableHighlight>
                </View>

                <View  style={styles.button}>
                    <TouchableHighlight style={styles.pressbutton} onPress={this.sos}>
                        <Text>This Sleeper</Text>
                    </TouchableHighlight>
                </View>
            </View>
        }
        </BaseContainer>;
    }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(255,0,0,.6)"
  },
  pressbutton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    borderRadius: 100
  }

});