// @flow
import * as _ from "lodash";
import autobind from "autobind-decorator";
import React, {Component} from "react";
import {StyleSheet, Image, View, Text} from "react-native";
import {H1, Button, Icon} from "native-base";
import {observable, action} from "mobx";
import {observer} from "mobx-react/native";

import ListsStore from "./ListsStore";

import {BaseContainer, Styles, Images} from "../components";

import variables from "../../native-base-theme/variables/commonColor";

@observer
export default class Lists extends Component {

    store = new ListsStore();

    render(): React$Element<*> {
        const {tasks, loading} = this.store;
        return <BaseContainer title="Lists" navigation={this.props.navigation} scrollable>
        {
            !loading && <View>
                <Image source={Images.lists} style={Styles.header}>
                    <View style={[Styles.center, Styles.flexGrow, Styles.headerMask]}>
                        <H1 style={{ color: "white" }}>Task List</H1>
                    </View>
                </Image>
                {
                    !tasks && <View>
                        <Text>You don't have any tasks yet. Please add one.</Text>
                    </View>
                }
                {
                    _.map(
                        tasks,
                        (item, key) => <Item
                            key={key}
                            title={item.title}
                            done={item.done}
                            onToggle={done => this.store.toggleItem(key, done)}
                        />
                    )
                }
            </View>
        }
        </BaseContainer>;
    }
}

@observer
class Item extends Component {

    props: {
        title: string,
        done?: boolean,
        onToggle: boolean => void
    }

    @observable done: boolean;

    componentWillMount() {
        const {done} = this.props;
        this.done = !!done;
    }

    @autobind @action
    toggle() {
        const {onToggle} = this.props;
        this.done = !this.done;
        onToggle(this.done);
    }

    render(): React$Element<*>  {
        const {title} = this.props;
        const btnStyle ={ backgroundColor: this.done ? variables.brandInfo : variables.lightGray };
        return <View style={Styles.listItem}>
            <Button transparent
                    onPress={this.toggle}
                    style={StyleSheet.flatten([Styles.center, style.button, btnStyle])}>
                {this.done ? <Icon name="md-checkmark" style={{ color: "white" }} /> : undefined}
            </Button>
            <View style={[Styles.center, style.title]}>
                <Text style={{ color: this.done ? variables.gray : variables.black }}>{title}</Text>
            </View>
        </View>;
    }
}

const style = StyleSheet.create({
    button: {
        height: 75, width: 75, borderRadius: 0
    },
    title: {
        paddingLeft: variables.contentPadding
    }
});