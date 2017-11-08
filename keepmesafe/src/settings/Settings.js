// @flow
import autobind from "autobind-decorator";
import React, {Component} from "react";
import {View, Text} from "react-native";
import {Switch, List, ListItem, Body, Right} from "native-base";
import {observable, action} from "mobx";
import { observer } from "mobx-react/native";

import SettingsStore from "./SettingsStore";

import {BaseContainer, Styles, Avatar, Field} from "../components";

import variables from "../../native-base-theme/variables/commonColor";

@observer
export default class Settings extends Component {

    store = new SettingsStore();

    render(): React$Element<*> {
        const {profile} = this.store;
        return <BaseContainer title="Configuraciones" navigation={this.props.navigation} scrollable>
            <View style={[Styles.header, Styles.center, Styles.whiteBg]}>
                <Avatar size={100} />
            </View>
            {
                profile && <List>
                    <ListItem itemDivider>
                        <Text>GENERAL</Text>
                    </ListItem>
                    <Field
                        label="Nombre(s)"
                        defaultValue={profile.name.split('/')[0]}
                        onChange={value => this.store.setName(value)}
                    />
                    <Field
                        label="Apellido Paterno"
                        defaultValue={profile.name.split('/')[1]}
                        onChange={value => this.store.setLastName(value)}
                    />
                    <Field
                        label="Apellido Materno"
                        defaultValue={profile.name.split('/')[2]}
                        onChange={value => this.store.setSecondLastName(value)}
                    />
                    <Field
                        label="Teléfono"
                        defaultValue={profile.phone}
                        keyboardType="phone-pad"
                        onChange={value => this.store.setPhone(value)}
                    />
                    <ListItem itemDivider>
                        <Text>NOTIFICACIONES</Text>
                    </ListItem>
                    <ListItem>
                        <Body>
                        <Text>Notificación de Email</Text>
                        </Body>
                        <Right>
                            <SettingsSwitch
                                defaultValue={profile.emailNotifications}
                                onToggle={done => this.store.toggleEmailNotifications(done)}
                            />
                        </Right>
                    </ListItem>
                    <ListItem last>
                        <Body>
                        <Text>Notificación de Teléfono</Text>
                        </Body>
                        <Right>
                            <SettingsSwitch
                                defaultValue={profile.phoneNotifications}
                                onToggle={done => this.store.togglePhoneNotifications(done)}
                            />
                        </Right>
                    </ListItem>
                </List>
            }
        </BaseContainer>;
    }
}

@observer
class SettingsSwitch extends Component {

    props: {
        defaultValue: boolean,
        onToggle: boolean => void
    }

    @observable value: boolean;

    componentWillMount() {
        const {defaultValue} = this.props;
        this.value = defaultValue;
    }

    @autobind @action
    toggle() {
        const {onToggle} = this.props;
        this.value = !this.value;
        onToggle(this.value);
    }

    render(): React$Element<*> {
        return <Switch
            value={this.value}
            onValueChange={this.toggle}
            onTintColor="rgba(80, 210, 194, .5)"
            thumbTintColor={this.value ? variables.brandInfo : "#BEBEC1"}
        />;
    }

}