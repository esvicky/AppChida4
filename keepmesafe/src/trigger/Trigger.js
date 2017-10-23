// @flow
import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

import {BaseContainer, Styles, Images} from "../components";

import variables from "../../native-base-theme/variables/commonColor";

export default class Trigger extends Component {
    state = {
        location: null,
        errorMessage: null,
    };

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
            </View>
        }
        </BaseContainer>;
    }
}
const size: number = 200;
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: "rgba(255,99,71, .5)"
  }
});