// @flow
import React, {Component} from "react";
import * as _ from "lodash";
import {View, ScrollView} from "react-native";
import {H1, H2, H3, H4, H5, H6} from "native-base";
import {inject, observer} from "mobx-react/native";

import {BaseContainer, Avatar, Styles} from "../components";

import variables from "../../native-base-theme/variables/commonColor";

@inject("store") @observer
export default class Police extends Component {
    render(): React$Element<*> {
        const {store} = this.props;
        return <BaseContainer title="Police" navigation={this.props.navigation} scrollable>
            {
                store.police && <View>
                    <View style={[Styles.whiteBg, Styles.center]}>
                        <Avatar size={100} />
                        <H1 style={{ marginTop: variables.contentPadding * 2 }}>{store.police.name}</H1>
                        <H3 style={{ marginTop: variables.contentPadding }}>{store.police.email}</H3>
                        <H3 style={{ marginTop: variables.contentPadding }}>{store.police.phone}</H3>
                    </View>
                </View>
            }
        </BaseContainer>;
    }
}