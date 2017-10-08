// @flow
import React, {Component} from "react";
import {View, ScrollView} from "react-native";
import {H1, H2, H3, H4, H5, H6} from "native-base";
import {observer} from "mobx-react/native";

import {BaseContainer, Avatar, TaskOverview, Styles} from "../components";

import variables from "../../native-base-theme/variables/commonColor";

import {Firebase} from "../components";



@observer
export default class Police extends Component {
    render(): React$Element<*> {

        const police = Firebase.getPolice(name, email, phone);
        console.log('hello:'+ this.props.name);
        return <BaseContainer title="Police" navigation={this.props.navigation} scrollable>
            {
                <View>
                    <View style={[Styles.header, Styles.whiteBg, Styles.center]}>
                        <Avatar size={100} />
                        <H1 style={{ marginTop: variables.contentPadding * 2 }}>{this.police.name}</H1>
                        <H3 style={{ marginTop: variables.contentPadding }}>{this.police.email}</H3>
                        <H3 style={{ marginTop: variables.contentPadding }}>{this.police.phone}</H3>
                    </View>
                </View>
            }
        </BaseContainer>;
    }
}