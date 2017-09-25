// @flow
import React, {Component} from "react";
import * as _ from "lodash";
import {View, ScrollView} from "react-native";
import {H1} from "native-base";
import {inject, observer} from "mobx-react/native";

import {BaseContainer, Avatar, TaskOverview, Styles, Member} from "../components";

import variables from "../../native-base-theme/variables/commonColor";

@inject("store") @observer
export default class Profile extends Component {
    render(): React$Element<*> {
        const {store} = this.props;
        return <BaseContainer title="Profile" navigation={this.props.navigation} scrollable>
            {
                store.user && <View>
                    <View style={[Styles.header, Styles.whiteBg, Styles.center]}>
                        <Avatar size={100} />
                        <H1 style={{ marginTop: variables.contentPadding * 2 }}>{store.user.profile.name}</H1>
                        <H1 style={{ marginTop: variables.contentPadding * 2 }}>{store.user.profile.lastName}</H1>
                        <H1 style={{ marginTop: variables.contentPadding * 2 }}>{store.user.profile.momLastName}</H1>
                        <H1 style={{ marginTop: variables.contentPadding * 2 }}>{store.user.profile.phone}</H1>
                    </View>
                    <TaskOverview completed={store.completedTaskCount} overdue={store.overdueTaskCount} />
                    <ScrollView>
                    {
                        _.map(store.user.members, (member, key) => <Task {...{member, key}} />)
                    }
                    </ScrollView>
                </View>
            }
        </BaseContainer>;
    }
}