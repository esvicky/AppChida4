
// @flow
import autobind from "autobind-decorator";
import React, { Component } from 'react';
import {observable, action, computed} from "mobx";
import {observer} from "mobx-react/native";
import { Platform, Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { Container, Button, Header, Left, Right, Body, Icon, Title, Spinner } from "native-base";
import { LocationHelper } from '../helpers/LocationHelper';
import TriggerStore from './TriggerStore';
import { Constants, Location, Permissions } from 'expo';

import {BaseContainer, Styles, Images} from "../components";

import variables from "../../native-base-theme/variables/commonColor";

@observer
export default class Trigger extends Component {
    

    state = {
        location: null,
        errorMessage: null,
    };


    @autobind
    async sos(): Promise<void> {
        try {
            this.status = !this.status;
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
    @observable _enableEmergency: boolean;
    @computed get enableEmergency(): boolean { return this._enableEmergency; }
    set enableEmergency(enableEmergency: boolean) { this._enableEmergency = enableEmergency; }

    constructor(){
        super();
        this.store = new TriggerStore();
        this.store.builder().then(s=>{
            this.enableEmergency = this.store.enableEmergency;
            if(this.enableEmergency) this.store.monitored();
        });
        
    }

    render(): React$Element<*> {      
        //const {enableEmergency} = this.store;
        console.log(`enableEmergency ${this.enableEmergency}`);
        return (<BaseContainer title="Botón" navigation={this.props.navigation} scrollable>
        {
            <View style={styles.container}>
                <TouchableHighlight 
                    style={ this.enableEmergency ? styles.pressed : styles.unpressed } 
                      onPress={e => {
                        this.sos();
                        this.enableEmergency = !this.enableEmergency;
                    }}>
                    <Text>{this.enableEmergency ? '¡EMERGENCIA ACTIVA!':'EMERGENCIA INACTIVA'}</Text>
                </TouchableHighlight>
            </View>
        }
        </BaseContainer>);
    }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  pressed: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(255,0,0,.6)"
  },
  unpressed: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(0,255,0,.6)"
  }

});