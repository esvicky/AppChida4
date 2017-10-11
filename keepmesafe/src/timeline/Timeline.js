// @flow
import moment from "moment";
import * as _ from "lodash";
import {observer, inject} from "mobx-react/native";
import React, {Component} from "react";
import {StyleSheet, Image, View, Text} from "react-native";
import {H3} from "native-base";

import {BaseContainer, Styles, Images, Avatar, Member, Task} from "../components";

import variables from "../../native-base-theme/variables/commonColor";

@inject("store") @observer
export default class Timeline extends Component {

    render(): React$Element<*> {
        const {store} = this.props;
        return <BaseContainer title="Timeline" navigation={this.props.navigation} scrollable>
        {
            store.user && <View>
                <Image source={Images.timeline} style={Styles.header}>
                    <View style={[Styles.imgMask, Styles.center, Styles.flexGrow]}>
                        <H3 style={StyleSheet.flatten(style.heading)}>{"\n\n"}COMUNIDAD</H3>
                        <Text style={Styles.whiteText}>{store.memberCount} MEMBERS</Text>
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
    }   
});