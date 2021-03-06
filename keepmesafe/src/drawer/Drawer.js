// @flow
import autobind from "autobind-decorator";
import React, {Component} from "react";
import {View, StyleSheet, Image, TouchableOpacity, Text} from "react-native";
import {Button, Container, H1, Icon} from "native-base";

import {Images, Firebase, WindowDimensions} from "../components";

import variables from "../../native-base-theme/variables/commonColor";

export default class Drawer extends Component {

    go(key: string) {
        this.props.navigation.navigate(key);
    }

    @autobind
    logout() {
        Firebase.auth.signOut();
    }

    render(): React$Element<*> {
        const navState = this.props.navigation.state;
        const currentIndex = navState.index;
        const items = navState.routes
            .filter(route => ["Settings", "Create"].indexOf(route.key) === -1)
            .map((route, i) =>
                <DrawerItem key={i} onPress={() => this.go(route.key)} label={route.key} active={currentIndex === i} />
            );
        return <Image source={Images.drawer} style={style.img}>
            <Container style={StyleSheet.flatten(style.container)}>
                <View style={style.row}>
                    <Button transparent onPress={() => this.go("DrawerClose")}>
                        <Icon name="ios-close-outline" style={StyleSheet.flatten(style.closeIcon)} />
                    </Button>
                </View>
                <View style={style.drawerItemsContainer}>
                    <View style={style.drawerItems}>{items}</View>
                </View>
                <View style={style.row}>
                    <DrawerIcon label="configuraciones" icon="ios-settings-outline" onPress={() => this.go("Settings")} />
                    <DrawerIcon label="salir" icon="ios-log-out-outline" onPress={this.logout} />
                </View>
            </Container>
        </Image>;
    }
}

class DrawerItem extends Component {

    props: {
        label: string,
        onPress: () => void,
        active?: boolean
    }

    render(): React$Element<Button> {
        const {label, onPress, active} = this.props;
        return <Button onPress={onPress} full transparent>
            <H1 style={{ color: active ? "white" : "rgba(255, 255, 255, .5)" }}>{label}</H1>
        </Button>;
    }
}

class DrawerIcon extends Component {

    props: {
        label: string,
        icon: string,
        onPress: () => void
    }

    render(): React$Element<Button> {
        const {label, icon, onPress} = this.props;
        return <TouchableOpacity style={style.drawerIcon} onPress={onPress}>
            <Icon name={icon} style={{ color: "rgba(255, 255, 255, .5)", padding: variables.contentPadding }} />
            <Text style={{ color: "white", fontSize: 12 }}>{label.toUpperCase()}</Text>
        </TouchableOpacity>;
    }
}

const style = StyleSheet.create({
    img: {
        resizeMode: "cover",
        ...WindowDimensions
    },
    container: {
        backgroundColor: "rgba(101, 99, 164, .4)",
        paddingHorizontal: variables.contentPadding * 1.5,
        paddingVertical: variables.contentPadding * 2.5
    },
    mask: {
        color: "rgba(255, 255, 255, .9)"
    },
    closeIcon: {
        fontSize: 50,
        color: "rgba(255, 255, 255, .9)"
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    drawerItemsContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: variables.contentPadding * 16
    },
    drawerItems: {
        flex: 1,
        justifyContent: "space-between"
    },
    drawerIcon: {
        justifyContent: "center",
        alignItems: "center"
    }
});
