// @flow
import React, {Component} from "react";
import * as _ from "lodash";
import {View, ScrollView} from "react-native";
import {H1, H2, H3, H4, H5, H6} from "native-base";
import {inject, observer} from "mobx-react/native";

import {BaseContainer, Avatar, TaskOverview, Styles} from "../components";

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
                        <H3 style={{ marginTop: variables.contentPadding }}>{store.user.profile.phone}</H3>
                    </View>
                    <TaskOverview completed={store.completedTaskCount} overdue={store.overdueTaskCount} totalMem={store.totalMemTaskCount} />
                    <ScrollView>
                    {
                        _.map(store.user.tasks, (task, key) => <Task {...{task, key}} />)
                    }
                    </ScrollView>
                </View>
            }
        </BaseContainer>;
    }
}