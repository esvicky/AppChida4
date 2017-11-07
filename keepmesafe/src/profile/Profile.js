// @flow
import React, {Component} from "react";
import * as _ from "lodash";
import {View, ScrollView} from "react-native";
import {H1, H2, H3, H4, H5, H6} from "native-base";
import {inject, observer} from "mobx-react/native";

import {BaseContainer, Avatar, TaskOverview, Styles, MemberOverview, Member} from "../components";

import variables from "../../native-base-theme/variables/commonColor";

@inject("store") @observer
export default class Profile extends Component {
    render(): React$Element<*> {
    const {store} = this.props;
        return <BaseContainer title="Perfil" navigation={this.props.navigation} scrollable>
        {
            store.user && <View>
                <View style={[Styles.whiteBg, Styles.center]}>
                    <Avatar size={100} />
                    <H1 style={{ marginTop: variables.contentPadding * 2 }}>{store.user.profile.name.split('/').join(' ')}</H1>
                    <H3 style={{ marginTop: variables.contentPadding }}>{store.user.profile.phone}</H3>
                    <H3 style={{ margin: variables.contentPadding }}>{store.user.profile.email}</H3>
                </View>
                <MemberOverview completed={store.memberCount} />
                <ScrollView>
                {
                    _.map(store.user.members, (member, key) => <Member {...{member, key}} />)
                }
                </ScrollView>
            </View>
        }
        </BaseContainer>;
    }
}