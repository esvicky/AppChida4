// @flow
import moment from "moment";
import * as _ from "lodash";
import React, {Component} from "react";
import {View, Text, StyleSheet} from "react-native";
import {H3} from "native-base";

import {Avatar, Styles, Circle} from "../components";
import {Police as IPolice} from "../Model";

import variables from "../../native-base-theme/variables/commonColor";

export default class Task extends Component {

    props: {
        police: IPolice,
        timeline?: boolean
    }

    static defaultProps = {
        collaborators: []
    }

    render(): React$Element<*> {
        const {police, timeline} = this.props;
        const {name, phone, email, done} = police;
        const completed = done;
        return <View style={[Styles.listItem, { height }]}>
            {
                timeline && <TaskStatus {...{ timeline, completed, height }} />
            }
            <View style={style.time}>
                <H3>{date.format("HH:mm")}</H3>
                <Text style={style.gray}>{"\xa0" + date.format("A")}</Text>
            </View>
            <View style={style.title}>
                <H3>{title}</H3>
                <Text style={style.gray}>{project}</Text>
            </View>
            {
                !timeline && <TaskStatus {...{ completed, height }} />
            }
        </View>;
    }
}

class TaskStatus extends Component {

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
    title: {
        justifyContent: "center",
        flex: 1,
        padding: variables.contentPadding
    }
});