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
    async demo(): Promise<void> {
        try {
            await this.store.demo();
        } catch (e) {
            alert(e.message);
        }
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
        if (this.state.errorMessage) {
            text = this.state.errorMessage;
        } else if (this.state.location) {
            text = JSON.stringify(this.state.location);
        }

        return <BaseContainer title="Trigger" navigation={this.props.navigation} scrollable>
        {
            <View style={styles.container}>
                <TouchableHighlight style={styles.button} onPress={alert(text)}>
                    <Text>PRESS ME!</Text>
                </TouchableHighlight>

                <Button style={styles.button} onPress={this.demo}></Button>
            </View>
        }
        </BaseContainer>;
    }
}
const size: number = 200;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    width: size,
    height: size,
    borderRadius: size / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(255,0,0, .2)"
  }
});