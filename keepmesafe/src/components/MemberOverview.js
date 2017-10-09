// @flow
import React, {Component} from "react";
import {StyleSheet, View, Text} from "react-native";
import {H1} from "native-base";

import Styles from "./Styles";

import variables from "../../native-base-theme/variables/commonColor";

export default class MemberOverview extends Component {

    props: {
        completed: number
    }

    render(): React$Element<*> {
        const {completed} = this.props;
        return <View style={{ flexDirection: "row" }}>
            <View style={[style.count, Styles.center, { backgroundColor: variables.brandSecondary }]}>
                <Text style={Styles.whiteText}>MIEMBROS</Text>
                <H1 style={StyleSheet.flatten(style.heading)}>{`${completed}`}</H1>
            </View>
        </View>;
    }
}

const padding = variables.contentPadding * 2;
const style = StyleSheet.create({
    count: {
        flex: .5,
        padding
    },
    heading: {
        color: "white",
        paddingTop: padding
    }
});