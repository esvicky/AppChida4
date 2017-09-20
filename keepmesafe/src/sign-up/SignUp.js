// @flow
import autobind from "autobind-decorator";
import React, {Component} from "react";
import {View, Image, StyleSheet, KeyboardAvoidingView, ScrollView} from "react-native";
import {Container, Button, Header, Left, Right, Body, Icon, Title, Spinner} from "native-base";
import {observer} from "mobx-react/native";
import type {NavigationScreenProp} from "react-navigation/src/TypeDefinition";

import SignUpStore from "./SignUpStore";

import {Styles, Images, Field} from "../components";

import variables from "../../native-base-theme/variables/commonColor";

@observer
export default class SignUp extends Component {

    props: {
        navigation: NavigationScreenProp<*, *>
    }

    store = new SignUpStore()

    @autobind
    back() {
        this.props.navigation.goBack();
    }

    @autobind
    async signIn(): Promise<void> {
        try {
            await this.store.signIn();
        } catch (e) {
            alert(e.message);
        }
    }

    render(): React$Element<*> {
        return <Container>
            <ScrollView style={{backgroundColor: "white"}} containerStyle={{ flex: 1, justifyContent: "flex-end" }}>
                <KeyboardAvoidingView behavior="position">
                    <Header noShadow>
                        <Left>
                            <Button onPress={this.back} transparent>
                                <Icon name='close'/>
                            </Button>
                        </Left>
                        <Body>
                        <Title>Sign Up</Title>
                        </Body>
                        <Right/>
                    </Header>
                    <Image source={Images.signUp} style={Styles.header}>
                        <Container style={StyleSheet.flatten([Styles.imgMask, Styles.center])}>
                            <View style={style.circle}>
                                <Icon name="ios-add-outline" style={{fontSize: 75, color: variables.brandInfo}}/>
                            </View>
                        </Container>
                    </Image>
                    <Field
                        label="Name"
                        autoCorrect={false}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onChange={name => this.store.name = name}
                    />
                    <Field
                        label="Email"
                        autoCorrect={false}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onChange={email => this.store.email = email}
                    />
                    <Field
                        label="Password"
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChange={password => this.store.password = password}
                        secureTextEntry
                    />
                </KeyboardAvoidingView>
            </ScrollView>
            <Button primary full onPress={this.signIn} style={{height: variables.footerHeight}}>
                {this.store.loading ? <Spinner color="white"/> : <Icon name="md-checkmark"/>}
            </Button>
        </Container>
            ;
    }
}

const style = StyleSheet.create({
    circle: {
        backgroundColor: "white",
        height: 125,
        width: 125,
        borderRadius: 62.5,
        justifyContent: "center",
        alignItems: "center"
    }
});