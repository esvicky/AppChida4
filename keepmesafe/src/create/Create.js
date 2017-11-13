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
        const {params} = this.props.navigation.state;
        this.existing =  false;
        if(params){
            const {member, id} = params;
            console.log(JSON.stringify(member));
            console.log(JSON.stringify(id));
            this.props.navigation.state.params = null;
            this.store.firstName = member.name.split('/')[0];
            this.store.lastName = member.name.split('/')[1];
            this.store.secondLastName = member.name.split('/')[2];
            this.store.phone = member.phone;
            this.store.email = member.email;
            this.existing = true;
            this.id = id;
        }
    }

    @autobind
    async save(): Promise<void> {
        try {
            await this.store.save();
            this.props.navigation.navigate("Comunidad");
        } catch(e) {
            alert(e.message);
        }
    }

    @autobind
    async update(): Promise<void> {
        try {
            await this.store.update(this.id);
            this.props.navigation.navigate("Comunidad");
        } catch(e) {
            alert(e.message);
        }
    }

    render(): React$Element<*> {
        const footer = ([
            !this.existing &&  <Button key={1} primary full onPress={this.save}>
                {
                    this.store.loading ? <Spinner color="white" /> : <Text style={style.text}>MIEMBRO NUEVO</Text>

                }
            </Button>,
            this.existing && <Button key={2} primary full onPress={this.update}>
                {
                    this.store.loading ? <Spinner color="white" /> : <Text style={style.text}>ACTUALIZAR MIEMBRO</Text>

                }
            </Button>]
        );
        return <BaseContainer title={this.existing ? "Actualizar" : "Crear"} navigation={this.props.navigation} scrollable {...{footer}}>
            <Image source={Images.members} style={Styles.header}>
                <View style={[Styles.center, Styles.flexGrow, Styles.headerMask]}>
                    <H1 style={{ color: "white" }}>MIEMBRO</H1>
                </View>
            </Image>
            <Field
                label="Nombre(s)"
                defaultValue={this.store.firstName}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChange={firstName => this.store.firstName = firstName}
            />
            <Field
                label="Apellido Paterno"
                defaultValue={this.store.lastName}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChange={lastName => this.store.lastName = lastName}
            />
            <Field
                label="Apellido Materno"
                defaultValue={this.store.secondLastName}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChange={momLastName => this.store.momLastName = momLastName}
            />
            <Field
                label="Teléfono (a 10 dígitos)"
                defaultValue={this.store.phone}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="phone-pad"
                onChange={phone => this.store.phone = phone}
            />
            <Field
                label="Email"
                defaultValue={this.store.email}
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
