// @flow
import moment from "moment";
import * as _ from "lodash";
import {observer, inject} from "mobx-react/native";
import React, {Component} from "react";
import {StyleSheet, Image, View, Text} from "react-native";
import {H1} from "native-base";

import {BaseContainer, Styles, Images, Avatar, Task} from "../components";

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
                        <Avatar size={50} />
                        <H1 style={StyleSheet.flatten(style.heading)}>{moment().format("MMMM")}</H1>
                        <Text style={Styles.whiteText}>{store.taskCount} TASKS</Text>
                    </View>
                </Image>
                {
                    _.map(store.user.tasks, (task, key) => <Task {...{key, task}} timeline />)
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