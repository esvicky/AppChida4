// @flow
import autobind from "autobind-decorator";
import {observer} from "mobx-react/native";
import React from "react";
import {StyleSheet, Image, View} from "react-native";
import {Button, Spinner, Text} from "native-base";
import type { NavigationScreenProp } from "react-navigation/src/TypeDefinition";

import ForgotPasswordStore from "./ForgotPasswordStore";

import {Images, WindowDimensions, Field, Small} from "../components";

@observer
export default class ForgotPassword extends React.Component {

    store = new ForgotPasswordStore();

    props: {
        navigation: NavigationScreenProp<*, *>
    }

    @autobind
    login() {
        this.props.navigation.navigate("Login");
    }

    @autobind
    async submit(): Promise<void> {
        try {
            await this.store.submit();
            alert("We send you an email so you can reset your password.");
            this.props.navigation.navigate("Login");
        } catch(e) {
            alert(e.message);
        }
    }

    render(): React$Element<*> {
        return <Image source={Images.login} style={style.img}>
            <View style={style.container}>
                <Field
                    label="Email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    returnKeyType="next"
                    onChange={email => this.store.email = email}
                    inverse
                />
                <Button primary full onPress={this.submit}>
                {this.store.loading ? <Spinner color="white" /> : <Text>Reset Password</Text>}
                </Button>
                <Button transparent full onPress={this.login}>
                    <Small style={{color: "white"}}>Login</Small>
                </Button>
            </View>
        </Image>;
    }
}

const style = StyleSheet.create({
    img: {
        resizeMode: "cover",
        ...WindowDimensions
    },
    container: {
        backgroundColor: "rgba(80, 210, 194, .8)",
        flex: 1,
        justifyContent: "center"
    }
});

