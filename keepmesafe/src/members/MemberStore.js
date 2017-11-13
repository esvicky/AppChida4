// @flow
import {observable, computed} from "mobx";
import {debounce} from "throttle-debounce";
import {Alert} from "react-native";
import autobind from "autobind-decorator";

import type {Members} from "../Model";
import {Firebase} from "../components";

export default class MemberStore {

    @observable _loading: boolean = true;
    @observable _members: Members;

    @computed get members(): Members { return this._members; }
    set members(members: Members) { this._members = members; }

    @computed get loading(): boolean { return this._loading; }
    set loading(loading: boolean) { this._loading = loading; }


    constructor() {
        Firebase.getUser()
            .then(user => this.members = user.members)
            .then(() => this.loading = false);
    }

    deleteMember(key: string, done: boolean) {

        try {
            if(done === true){
                Alert.alert(
                  'Eliminar',
                  '¿Estás seguro de eliminar a 1 miembro de tu comunidad?',
                  [
                    {text: 'Cancelar', onPress: () => console.log('Cancel Pressed')},
                    {text: 'OK', onPress: () => {
                        Firebase.userRef.child(`members/${key}`).remove();
                        const {[key]:deletedKey, ...mem} = this.members;
                        this.members = mem;                     
                    }},
                  ],
                  { cancelable: false }
                )
            } 
        } catch(e) {
            alert(e.message);
        }
    }
} 