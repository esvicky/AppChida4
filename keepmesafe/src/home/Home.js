// @flow
import moment from "moment";
import React, {Component} from "react";
import {Text, Image, StyleSheet, View} from "react-native";
import {H1} from "native-base";

import {BaseContainer, Circle, Styles, Images, WindowDimensions} from "../components";

import variables from "../../native-base-theme/variables/commonColor";

export default class Home extends Component {

    go(key: string) {
        this.props.navigation.navigate(key);
    }

    render(): React$Element<*> {
        const today = moment();
        const month = today.format("MMMM Y").toUpperCase();
        const dayOfMonth = today.format("D");
        const dayOfWeek = today.format("dddd").toUpperCase();
        const {navigation} = this.props;
        return <BaseContainer title="" {...{ navigation }}>
            <Image source={Images.home} style={[style.img, Styles.center, Styles.flexGrow]}>
                <View style={Styles.center}>
                    <H1>Hola</H1>
                    <Circle color={variables.brandInfo} size={150} style={style.circle}>
                        <Circle color={variables.brandPrimary} size={30} style={style.badge}>
                            <Text style={style.text}>8</Text>
                        </Circle>
                        <Text style={[style.text, { fontSize: 48 }]}>{dayOfMonth}</Text>
                        <Text style={style.text}>{dayOfWeek}</Text>
                    </Circle>
                    <Text>{month}</Text>
                </View>
            </Image>
        </BaseContainer>;
    }
}

const style = StyleSheet.create({
    img: {
        ...WindowDimensions
    },
    circle: {
        marginVertical: variables.contentPadding * 4
    },
    badge: {
        position: "absolute",
        right: 10,
        top: 10
    },
    text: {
        fontFamily: variables.titleFontfamily,
        color: "white"
    }
});