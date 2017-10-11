// @flow
import autobind from "autobind-decorator";
import React, {Component} from "react";
import {View, Text} from "react-native";
import {Switch, List, ListItem, Body, Right, H1} from "native-base";
import {observable, action} from "mobx";
import { observer } from "mobx-react/native";

import PhoneStore from "./PhoneStore";

import {BaseContainer, Styles, Avatar, Field} from "../components";

import variables from "../../native-base-theme/variables/commonColor";

@observer
export default class Phone extends Component {

	store = new PhoneStore();

	render(): React$Element<*> {
        const {profile} = this.store;
        return <BaseContainer title="Phone" navigation={this.props.navigation} scrollable>
            <Image source={Images.phone} style={Styles.header}>
                <View style={[Styles.imgMask, Styles.center, Styles.flexGrow]}>
                    <H1 style={Styles.whiteText}>CELULAR</H1>
                </View>
            </Image>
            {
                profile && <List>
                    <ListItem itemDivider>
                        <Text>REGISTRA TU CELULAR: (A 8 DIGITOS)</Text>
                    </ListItem>
                    <Field
                        label="Phone"
                        defaultValue={profile.phone}
                        onChange={value => this.store.setPhone(value)}
                    />
                </List>
            }
        </BaseContainer>;
    }

}
