
// @flow
import autobind from "autobind-decorator";
import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { Container, Button, Header, Left, Right, Body, Icon, Title, Spinner } from "native-base";
import { LocationHelper } from '../helpers/LocationHelper';
import TriggerStore from './TriggerStore';
import { Constants, Location, Permissions } from 'expo';

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

    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            LocationHelper()
                .then(location => {
                    console.log(JSON.stringify(location))
                })
                .catch(e => {
                    console.log(e)
                });
        }
    }

    render(): React$Element<*> {      

        return <BaseContainer title="Trigger" navigation={this.props.navigation} scrollable>
        {
            <View style={styles.container}>

                <View  style={styles.button}>
                    <TouchableHighlight style={styles.pressbutton} onPress={this.sos}>
                        <Text>PRESS ME!</Text>
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
    flex: 1,
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