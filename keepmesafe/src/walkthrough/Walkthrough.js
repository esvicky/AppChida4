// @flow
import autobind from "autobind-decorator";
import React, {Component} from "react";
import {View, Text} from "react-native";
import {Container, Header, Body, Left, Right, Title, Button} from "native-base";
import CarouselCard from "react-native-card-carousel";
import type { NavigationScreenProp } from "react-navigation/src/TypeDefinition";

import IntroCard from "./IntroCard";

import {Styles, NavigationHelpers} from "../components";

import variables from "../../native-base-theme/variables/commonColor";

type Card = { color: string, label: string};
type Cards = Card[];

export default class Walkthrough extends Component {

    props: {
        navigation: NavigationScreenProp<*, *>
    }

    cards: Cards = [
        {
            color: variables.brandPrimary,
            label: "Contacta a tu comunidad en caso de una emergencia"
        },
        {
            color: variables.brandSecondary,
            label: "Siéntete a salvo"
        },
        {
            color: variables.brandInfo,
            label: "Es facil y rápido"
        }
    ];

    @autobind
    home() {
        NavigationHelpers.reset(this.props.navigation, "Main");
    }

    @autobind
    contentRender(card: Card): React$Element<*> {
        return <IntroCard color={card.color} label={card.label} />;
    }

    render(): React$Element<*> {
        return <Container>
            <Header noShadow>
                <Left />
                <Body>
                    <Title>Descubre</Title>
                </Body>
                <Right />
            </Header>
            <View style={[Styles.bg, Styles.center, Styles.flexGrow]}>
                <CarouselCard
                    data={this.cards}
                    onPress={() => undefined}
                    contentRender={this.contentRender}
                />
                <View style={[{marginTop: variables.contentPadding}, Styles.center]}>
                    <Button onPress={this.home} light>
                        <Text>Entendido</Text>
                    </Button>
                </View>
            </View>
        </Container>;
    }
}