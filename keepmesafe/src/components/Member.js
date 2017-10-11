// @flow
import moment from "moment";
import * as _ from "lodash";
import React, {Component} from "react";
import {View, Text, StyleSheet} from "react-native";
import {H3} from "native-base";

import {Avatar, Styles, Circle} from "../components";
import {Member as IMember} from "../Model";

import variables from "../../native-base-theme/variables/commonColor";

export default class Member extends Component {

    props: {
        member: IMember,
        timeline?: boolean
    }

    render(): React$Element<*> {
        const {member, timeline} = this.props;
        const {name, email, phone, done} = member;
        const completed = done;
        const height = Object.keys(member ? member : {}).length > 1 ? 150 : 100;
        return <View style={[Styles.listItem, { height }]}>
            {
                timeline && <MemberStatus {...{ timeline, completed, height }} />
            }
            <View style={style.name}>
                <H3>Nombre: {name.split('/').join(' ')}</H3>
                <Text style={style.gray}>Correo: {email}</Text>
                <Text style={style.gray}>Celular: {phone}</Text>
            </View>
            {
                !timeline && <MemberStatus {...{ completed, height }} />
            }
        </View>;
    }
}

class MemberStatus extends Component {

    props: {
        timeline?: boolean,
        completed?: boolean,
        height: number
    }

    render(): React$Element<*> {
        const {timeline, completed, height} = this.props;
        return <View style={[style.doublePadding, Styles.center]}>
            {
                timeline && <View style={[{ height }, style.verticalLine]}></View>
            }
            <Circle size={10} color={completed ? variables.brandInfo : variables.brandSecondary}/>
        </View>;
    }
}

const style = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    doublePadding: {
        padding: variables.contentPadding * 2
    },
    gray: {
        color: variables.gray
    },
    avatar: {
        marginTop: variables.contentPadding,
        marginRight: variables.contentPadding
    },
    verticalLine: {
        borderLeftWidth: variables.borderWidth,
        borderColor: variables.listBorderColor,
        position: "absolute"
    },
    time: {
        alignItems: "center",
        flexDirection: "row",
        padding: variables.contentPadding
    },
    name: {
        justifyContent: "center",
        flex: 1,
        padding: variables.contentPadding
    }
});