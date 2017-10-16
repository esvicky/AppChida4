// @flow
import autobind from "autobind-decorator";
import React, {Component} from "react";
import {observer} from "mobx-react/native";
import {StyleSheet, View, Text, Image} from "react-native";
import {H1, Button, Spinner} from "native-base";

import PhoneStore from "./PhoneStore";

import {BaseContainer, Styles, Images, Field, WindowDimensions} from "../components";

import variables from "../../native-base-theme/variables/commonColor";

@observer
export default class Phone extends Component {

	store = PhoneStore;

    componentWillMount() {
        this.store = new PhoneStore();
    }

    @autobind
    async save(): Promise<void> {
        try {
            await this.store.save();
            this.props.navigation.navigate("Profile");
        } catch(e) {
            alert(e.message);
        }
    }

	render(): React$Element<*> {
        const footer = (
            <Button primary full onPress={this.save}>
                {
                    this.store.loading ? <Spinner color="white" /> : <Text style={style.h1}>REGISTRAR TELEFONO</Text>
                }
            </Button>
        );
        return <BaseContainer title="Phone" navigation={this.props.navigation} scrollable {...{footer}}>
            <Image source={Images.phone} style={Styles.header}>
                <View style={[Styles.imgMask, Styles.center, Styles.flexGrow]}>
                    <H1 style={style.h1}>CELULAR</H1>
                </View>
            </Image>            
            <Text style={style.text}>REGISTRA TU CELULAR: (A 8 DIGITOS)</Text>
            <Field
                label="Telefono"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="phone-pad"
                onChange={phone => this.store.phone = phone}
            />
        </BaseContainer>;
    }

}

const {width} = WindowDimensions;
const style = StyleSheet.create({
    h1: {
        color: "white"
    },
    text: {
        color: "gray",
        padding: variables.contentPadding
    }
});
