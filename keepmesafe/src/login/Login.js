// @flow
import autobind from "autobind-decorator";
import React from "react";
import {observer} from "mobx-react/native";
import {View, Image, StyleSheet, ScrollView, KeyboardAvoidingView} from "react-native";
import {H1, H2, Container, Button, Text, Spinner} from "native-base";
import type { NavigationScreenProp } from "react-navigation/src/TypeDefinition";

import LoginStore from "./LoginStore";
import Mark from "./Mark";

import {Small, Styles, Images, Field, WindowDimensions} from "../components";

import variables from "../../native-base-theme/variables/commonColor";

@observer
export default class Login extends React.Component {

    props: {
        navigation: NavigationScreenProp<*, *>
    }

    store = new LoginStore()

    @autobind
    async signIn(): Promise<void> {
        try {
            await this.store.login();
        } catch(e) {
            alert(e.message);
        }
    }

    @autobind
    signUp() {
        this.props.navigation.navigate("SignUp");
    }

    @autobind
    forgotPassword() {
        this.props.navigation.navigate("ForgotPassword");
    }

    render(): React$Element<*> {
        return <Image source={Images.login} style={style.img}>
            <Container style={StyleSheet.flatten(Styles.imgMask)}>
                <ScrollView contentContainerStyle={style.content}>
                    <KeyboardAvoidingView behavior="position">
                        <View style={style.logo}>
                            <View>
                                <Mark />
                                <H1 style={StyleSheet.flatten(style.title)}>KEEP ME SAFE</H1>
                                <H2 style={StyleSheet.flatten(style.title)}>Bienvenido</H2>
                            </View>
                        </View>
                        <View style={style.blur}>
                            <Field
                                label="Email"
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="email-address"
                                returnKeyType="next"
                                onChange={email => this.store.email = email}
                                inverse
                            />
                            <Field
                                label="Contraseña"
                                secureTextEntry
                                autoCapitalize="none"
                                autoCorrect={false}
                                returnKeyType="go"
                                onChange={password => this.store.password = password}
                                onSubmitEditing={this.signIn}
                                last
                                inverse
                            />
                            <View>
                                <View>
                                    <Button primary full onPress={this.signIn}>
                                    {this.store.loading ? <Spinner color="white" /> : <Text>Inicia Sesión</Text>}
                                    </Button>
                                </View>
                                <View>
                                    <Button transparent full onPress={this.signUp}>
                                        <Small style={{color: "white"}}>No tienes cuenta aún? Regístrate.</Small>
                                    </Button>
                                </View>
                                <View>
                                    <Button transparent full onPress={this.forgotPassword}>
                                        <Small style={{color: "white"}}>Olvidaste tu contraseña?</Small>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </Container>
        </Image>;
    }
}

const style = StyleSheet.create({
    img: {
        resizeMode: "cover",
        ...WindowDimensions
    },
    content: {
        flex: 1,
        justifyContent: "flex-end"
    },
    logo: {
        alignSelf: "center",
        marginBottom: variables.contentPadding
    },
    title: {
        marginTop: variables.contentPadding * 2,
        color: "white",
        textAlign: "center"
    },
    blur: {
        backgroundColor: "rgba(255, 255, 255, .2)"
    }
});
