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
                        <H1 style={{ color: "white" }}>EDITA TU COMUNIDAD</H1>
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

    props: {
        member: IMember
    };

    delete(){
        //lamo a la funcion de deleteMember en MemberStore
        alert('Delete member');
    }

    edit(){
        alert(JSON.stringify(this.props));
    }

    render(): React$Element<*>  {
        const {member} = this.props;
        const {name, email, phone, done} = member;
        return <View style={StyleSheet.flatten(Styles.listItem)}>
            <Button transparent onPress={this.delete}>
                <Icon name="ios-close-outline" style={StyleSheet.flatten([Styles.center, style.closeIcon])} />
            </Button>
            <Button transparent
                onPress={this.edit}>
                <View style={StyleSheet.flatten([Styles.center, style.title])}>
                    <Text style={{ color: variables.black }}>{name.split('/').join(' ').toUpperCase()}</Text>
                </View>
            </Button>
        </View>;
    }
}

@observer
class EditMember extends Component {
    props: {
        
    }
}


const style = StyleSheet.create({
    title: {
        padding: variables.contentPadding
    },closeIcon: {
        fontSize: 50,
        color: "rgba(255, 0, 0, .6)",
        padding: variables.contentPadding
    },
});