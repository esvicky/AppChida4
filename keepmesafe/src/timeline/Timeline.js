// @flow
import moment from "moment";
import * as _ from "lodash";
import {observer, inject} from "mobx-react/native";
import React, {Component} from "react";
import {StyleSheet, Image, View, Text} from "react-native";
import {H3} from "native-base";

import {BaseContainer, Styles, Images, Avatar, Member} from "../components";

import variables from "../../native-base-theme/variables/commonColor";

@inject("store") @observer
export default class Timeline extends Component {

    render(): React$Element<*> {
        const {store} = this.props;
        return <BaseContainer title="Comunidad" navigation={this.props.navigation} scrollable>
        {
            store.user && <View>
                <Image source={Images.timeline} style={Styles.header}>
                    <View style={[Styles.imgMask, Styles.center, Styles.flexGrow]}>
                        <Text style={StyleSheet.flatten([Styles.whiteText, style.tittle])}>{'\n\n\n\n'}AGENDA</Text>
                    </View>
                </Image>
                {
                    _.map(store.user.members, (member, key) => <Member {...{key, member}} timeline />)
                }
            </View>
        }
        </BaseContainer>;
    }
}

const style = StyleSheet.create({
    heading: {
        marginTop: variables.contentPadding * 2,
        color: "white"
    },
    tittle: {
        fontSize: 30
    }
});