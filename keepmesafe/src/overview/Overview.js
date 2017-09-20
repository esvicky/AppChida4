// @flow
import moment from "moment";
import * as _ from "lodash";
import React, {Component} from "react";
import {inject, observer} from "mobx-react/native";
import {StyleSheet, View, Text, ScrollView} from "react-native";
import {Container, Tab, Tabs, TabHeading, H1} from "native-base";

import {Task as ITask} from "../Model";
import {BaseContainer, Task, Styles, TaskOverview} from "../components";

import variables from "../../native-base-theme/variables/commonColor";
import MainStore from "../MainStore";

const DAY = 1;
const WEEK = 2;
const MONTH = 3;

@inject("store") @observer
export default class Overview extends Component {
    render(): React$Element<*> {
        const {store} = this.props;
        return <BaseContainer title="Overview" navigation={this.props.navigation}>
            <Tabs>
                <Tab heading={<TabHeading><Text style={style.tabHeading}>DAY</Text></TabHeading>}>
                    <OverviewTab period={DAY} {...{store}} />
                </Tab>
                <Tab heading={<TabHeading><Text style={style.tabHeading}>WEEK</Text></TabHeading>}>
                    <OverviewTab period={WEEK} {...{store}} />
                </Tab>
                <Tab heading={<TabHeading><Text style={style.tabHeading}>MONTH</Text></TabHeading>}>
                    <OverviewTab period={MONTH} {...{store}} />
                </Tab>
            </Tabs>
        </BaseContainer>;
    }
}

@observer
class OverviewTab extends Component {
    props: {
        period: 1 | 2 | 3,
        store: MainStore
    }

    render(): React$Element<*> {
        const {period, store} = this.props;
        const now = moment();
        let label: string;
        let tasks: ITask[];
        if (period === 1) {
            label = now.format("dddd");
            tasks = store.getTasksOfDay(now.date(), now.month());
        } else if (period === 2) {
            label = `Week ${now.format("W")}`;
            tasks = store.getTasksOfWeek(now.week());
        } else {
            label = moment().format("MMMM");
            tasks = store.getTasksOfMonth(now.month());
        }
        const completed = tasks.filter(task => task.done).length;
        const overdue = tasks.filter(tasks => !tasks.done).length;
        return <Container>
            <View style={[style.tab, Styles.center]}>
                <H1>{label}</H1>
            </View>
            <TaskOverview {...{ completed, overdue }} />
            <ScrollView>
            {
                _.map(tasks, (task, key) => <Task {...{task, key}} />)
            }
            </ScrollView>
        </Container>
    }
}

const style = StyleSheet.create({
    tabHeading: {
        color: variables.gray
    },
    tab: {
        backgroundColor: "#f8f8f8",
        padding: variables.contentPadding * 4
    }
});