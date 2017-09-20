// @flow
import React, {Component} from "react";
import {KeyboardAvoidingView, ScrollView} from "react-native";
import {Container, Button, Header as NBHeader, Left, Body, Title, Right, Icon} from "native-base";
import { EvilIcons } from "@expo/vector-icons";
import type { NavigationScreenProp } from "react-navigation/src/TypeDefinition";

import variables from "../../native-base-theme/variables/commonColor";

export default class BaseContainer extends Component {
    props: {
        title: string | React$Element<*>,
        navigation: NavigationScreenProp<*, *>,
        scrollable?: boolean,
        children?: React$Element<*>,
        footer?: React$Element<*>
    }

    render(): React$Element<*> {
        const {title, navigation, scrollable, footer} = this.props;
        return <Container>
                <NBHeader noShadow>
                    <Left>
                        <Button onPress={() => navigation.navigate("DrawerOpen")} transparent>
                            <EvilIcons name="navicon" size={32} color={variables.gray} />
                        </Button>
                    </Left>
                    <Body>
                    {
                        typeof(title) === "string" ? <Title>{title}</Title> : title
                    }
                    </Body>
                    <Right style={{ alignItems: "center" }}>
                        <Button transparent onPress={() => navigation.navigate("Create")}>
                            <Icon name="ios-add-outline" style={{ color: variables.gray, fontSize: 50 }} />
                        </Button>
                    </Right>
                </NBHeader>
                {
                    scrollable ? <ScrollView style={{ backgroundColor: "white" }}>
                            <KeyboardAvoidingView behavior="position">{this.props.children}</KeyboardAvoidingView>
                        </ScrollView>
                    :
                        this.props.children
                }
                {
                    footer
                }
            </Container>;
    }
}