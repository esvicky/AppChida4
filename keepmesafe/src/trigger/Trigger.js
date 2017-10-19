// @flow
import autobind from "autobind-decorator";
import React, {Component} from "react";
import {observer} from "mobx-react/native";
import {StyleSheet, View, Text, Image} from "react-native";
import {H1, Button, Spinner} from "native-base";

import TriggerStore from "./TriggerStore";

import {BaseContainer, Styles, Images, Field, WindowDimensions} from "../components";

import variables from "../../native-base-theme/variables/commonColor";

@observer
export default class Trigger extends Component {

    store = new TriggerStore();

    render(): React$Element<*> {
        const {members, loading} = this.store;
        return <BaseContainer title="Members" navigation={this.props.navigation} scrollable>
        {
            !loading && <View>
                <Image source={Images.members} style={Styles.header}>
                    <View style={[Styles.center, Styles.flexGrow, Styles.headerMask]}>
                        <H1 style={{ color: "white" }}>EDITA TUS MIEMBROS</H1>
                    </View>
                </Image>
                {
                    !members && <View>
                        <H3>No tienes ningún miembro aún. Añade uno!</H3>
                    </View>
                }
                {
                    _.map(
                        members,
                        (member, key) => <Member
                            key={key}
                            name={member.name}
                            phone={member.phone}
                            email={member.email}
                            onToggle={done => this.store.toggleItem(key, done)}
                        />
                    )
                }
            </View>
        }
        </BaseContainer>;
    }
}

@observer
class GeolocationExample extends Component({
    watchID: (null: ?number), 
    
    getInitialState: function() 
    { 
        return { initialPosition: 'unknown', lastPosition: 'unknown', }; 
    },

    componentDidMount: function() 
    { 
        navigator.geolocation.getCurrentPosition( (position) => 
            { 
                var initialPosition = JSON.stringify(position); 
                this.setState({initialPosition}); 
            }, 
                (error) => alert(error.message), 
                {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000} 
        ); 
        this.watchID = navigator.geolocation.watchPosition((position) => 
        { 
            var lastPosition = JSON.stringify(position); 
            this.setState({lastPosition}); 
        }); 
    },

    componentWillUnmount: function() 
    { 
        navigator.geolocation.clearWatch(this.watchID); 
    },

    render: function() 
    { 
        return ( <View>
            <Text>
                <Text style={styles.title}>Initial position: </Text> 
                {this.state.initialPosition} 
            </Text> 
            <Text> 
                <Text style={styles.title}>Current position: </Text> 
                {this.state.lastPosition} 
            </Text> 
        </View> 
        ); 
    } 
});


const {width} = WindowDimensions;
const style = StyleSheet.create({
    h1: {
        color: "white"
    },
    text: {
        color: "gray",
        padding: variables.contentPadding
    },
    title: { 
        fontWeight: '500' 
    }
});
