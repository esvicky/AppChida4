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
                        (member, key) => <Member 
                            key={key}
                            id={key}
                            member={member}
                            onDelete={done =>this.store.deleteMember(key,done)} 
                            navigation= {this.props.navigation}
                            />
                    )
                }
            </View>
        }
        </BaseContainer>;
    }
}

@observer
class Member extends Component {

    @observable done: boolean;

    @autobind @action
    delete(){
        const {onDelete} = this.props;
        this.done = true;
        onDelete(this.done);
    }

    @autobind
    edit(member, id){
        //console.log(JSON.stringify(this.props.navigation));
        this.props.navigation.navigate("Create", {member, id});
    }

    render(): React$Element<*>  {
        const {member, id} = this.props;
        const {name, email, phone, done} = member;
        return <View style={StyleSheet.flatten(Styles.listItem)}>
            <Button transparent onPress={this.delete}>
                <Icon name="ios-close-outline" style={StyleSheet.flatten([Styles.center, style.closeIcon])} />
            </Button>
            <Button transparent
                onPress={e => this.edit(member,id)}>
                <View style={StyleSheet.flatten([Styles.center, style.title])}>
                    <Text style={{ color: variables.black }}>{name.split('/').join(' ').toUpperCase()}</Text>
                </View>
            </Button>
        </View>;
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