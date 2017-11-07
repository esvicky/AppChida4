// @flow
import * as _ from "lodash";
import autobind from "autobind-decorator";
import React, {Component} from "react";
import {StyleSheet, Image, View, Text, Alert} from "react-native";
import {H1, H3, Button, Icon} from "native-base";
import {observable, action} from "mobx";
import {observer} from "mobx-react/native";

import MemberStore from "./MemberStore";

import {BaseContainer, Styles, Images} from "../components";

import variables from "../../native-base-theme/variables/commonColor";

@observer
export default class Members extends Component {

    store = new MemberStore();

    render(): React$Element<*> {
        const {members, loading} = this.store;
        return <BaseContainer title="Miembros" navigation={this.props.navigation} scrollable>
        {
            !loading && <View>
                <Image source={Images.members} style={Styles.header}>
                    <View style={[Styles.center, Styles.flexGrow, Styles.headerMask]}>
                        <H1 style={{ color: "white" }}>EDITA TUS MIEMBROS</H1>
                    </View>
                </Image>
                {
                    !members && <View>
                        <H3>No tienes ningún miembro aún. Añade uno!</H3>
                    </View>
                }
                {
                    _.map(
                        members,
                        (member, key) => <Member
                            key={key}
                            name={member.name}
                            phone={member.phone}
                            email={member.email}
                            onToggle={done => this.store.toggleItem(key, done)}
                        />
                    )
                }
            </View>
        }
        </BaseContainer>;
    }
}

@observer
class Member extends Component {

    props: {
        name: string,
        phone: string,
        email: string,
        onToggle: boolean => void
    }

    @observable done: string;

    componentWillMount() {
        const {done} = this.props;
        this.done = !!done; 
    }

    @autobind @action
    toggle() {
        const {onToggle} = this.props;
        this.done = !this.done;
        onToggle(this.done);
        Alert.alert('Elige la acción que quieres para tu contacto',null,
            [{text: 'Editar', onPress:this.edit},
            {text: 'Eliminar', onPress:this.delete}]);
    }

    edit() {
        console.log('Presiono el botón editar');
    }

    delete(){
        console.log('Quiere eliminar al miembro');
    }

    render(): React$Element<*>  {
        const {name, phone, email} = this.props;
        const btnStyle ={ backgroundColor: this.done ? variables.brandInfo : variables.lightGray };
        return <View style={Styles.listItem}>
            <Button transparent
                onPress={this.toggle}
                style={StyleSheet.flatten([Styles.stretch, btnStyle])}>
                <View style={[Styles.center, style.title]}>
                    <Text style={{ color: this.done ? variables.gray : variables.black }}>{name.split('/').join(' ')}</Text>
                </View>
            </Button>
        </View>;
    }
}

const style = StyleSheet.create({
    button: {
        height: 75, width: 75, borderRadius: 0
    },
    title: {
        paddingLeft: variables.contentPadding
    }
});