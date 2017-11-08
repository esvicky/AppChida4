// @flow
import * as _ from "lodash";
import autobind from "autobind-decorator";
import React, {Component} from "react";
import {StyleSheet, Image, View, Text, Alert} from "react-native";
import {H1, H3, Button, Icon} from "native-base";
import {observable, action} from "mobx";
import {observer} from "mobx-react/native";
import {Member as IMember} from "../Model";

import MemberStore from "./MemberStore";

import {BaseContainer, Styles, Images} from "../components";

import variables from "../../native-base-theme/variables/commonColor";

@observer
export default class Members extends Component {

    store = new MemberStore();

    render(): React$Element<*> {
        const {members, loading} = this.store;
        return <BaseContainer title="Miembros" navigation={this.props.navigation} scrollable>
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
                        (member, key) => <Member {...{key, member}} />
                    )
                }
            </View>
        }
        </BaseContainer>;
    }
}

@observer
class Member extends Component {

    delete(){
        alert('Delete member');
    }

    props: {
        member: IMember
    }

    render(): React$Element<*>  {
        const {member} = this.props;
        const {name, email, phone, done} = member;
        return <View style={Styles.listItem}>
            <Button transparent onPress={this.delete}>
                <Icon name="ios-close-outline" style={StyleSheet.flatten(style.closeIcon)} />
            </Button>
            <Button transparent
                onPress={this.toggle}
                style={StyleSheet.flatten(Styles.stretch)}>
                <View style={[Styles.center, style.title]}>
                    <Text style={{ color: variables.gray }}>{name.split('/').join(' ')}</Text>
                </View>
            </Button>
        </View>;
    }
}


const style = StyleSheet.create({
    button: {
        height: 75, width: 75, borderRadius: 0
    },
    title: {
        paddingLeft: variables.contentPadding
    },closeIcon: {
        fontSize: 20,
        color: "rgba(255, 0, 0, .9)"
    },
});