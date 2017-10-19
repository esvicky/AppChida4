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


const {width} = WindowDimensions;
const style = StyleSheet.create({
    h1: {
        color: "white"
    },
    text: {
        color: "gray",
        padding: variables.contentPadding
    }
});
