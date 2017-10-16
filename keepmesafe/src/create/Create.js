// @flow
import autobind from "autobind-decorator";
import React, {Component} from "react";
import {observer} from "mobx-react/native";
import {StyleSheet, View, Text, Image} from "react-native";
import {H1, Button, Spinner} from "native-base";

import CreateStore from "./CreateStore";

import {BaseContainer, Styles, Images, Field, WindowDimensions} from "../components";

import variables from "../../native-base-theme/variables/commonColor";

@observer
export default class Create extends Component {

    store: CreateStore;

    componentWillMount() {
        this.store = new CreateStore();
    }

    @autobind
    async save(): Promise<void> {
        try {
            await this.store.save();
            this.props.navigation.navigate("Members");
        } catch(e) {
            alert(e.message);
        }
    }

    render(): React$Element<*> {
        const footer = (
            <Button primary full onPress={this.save}>
                {
                    this.store.loading ? <Spinner color="white" /> : <Text style={style.text}>MIEMBRO NUEVO</Text>
                }
            </Button>
        );
        return <BaseContainer title="Create" navigation={this.props.navigation} scrollable {...{footer}}>
            <Image source={Images.members} style={Styles.header}>
                <View style={[Styles.center, Styles.flexGrow, Styles.headerMask]}>
                    <H1 style={{ color: "white" }}>MIEMBRO</H1>
                </View>
            </Image>
            <Field
                label="Nombre(s)"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChange={firstName => this.store.firstName = firstName}
            />
            <Field
                label="Apellido Paterno"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChange={lastName => this.store.lastName = lastName}
            />
            <Field
                label="Apellido Materno"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChange={momLastName => this.store.momLastName = momLastName}
            />
            <Field
                label="Teléfono (a 8 dígitos)"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="phone-pad"
                onChange={phone => this.store.phone = phone}
            />
            <Field
                label="Email"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                onChange={email => this.store.email = email}
            />
        </BaseContainer>;
    }
}

const {width} = WindowDimensions;
const style = StyleSheet.create({
    icon: {
        color: variables.brandInfo,
        fontSize: 30
    },
    avatars: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    avatar: {
        marginRight: variables.contentPadding / 2
    },
    text: {
        color: "white"
    },
    datePicker: {
        paddingLeft: variables.listItemPadding,
        width
    }
});
