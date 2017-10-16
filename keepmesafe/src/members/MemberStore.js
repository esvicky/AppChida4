// @flow
import {observable, computed} from "mobx";
import {debounce} from "throttle-debounce";

import type {Members} from "../Model";
import {Firebase} from "../components";

export default class MemberStore {

    @observable _loading: boolean = true;
    @observable _members: Members;

    @computed get members(): Members { return this._members; }
    set members(members: Members) { this._members = members; }

    @computed get loading(): boolean { return this._loading; }
    set loading(loading: boolean) { this._loading = loading; }

    setName = debounce(1000, (key: string, newName: string) => {
        Firebase.getUser().then(user => {
            let [name, lastName, secondLastName] = user.members.key.name.split('/');
            name = newName;
            console.log(name);
            var newFullName = [name, lastName, secondLastName].join('/');
            Firebase.userRef.child(`members/${key}/name`).set(newFullName);
        }).catch(function(e) {
            console.log(e); // "oh, no!"
        });
        
    });

    setLastName = debounce(1000, (key: string, newLastName: string) => {
        Firebase.getUser().then(user => {
            let [name, lastName, secondLastName] = user.members.key.name.split('/');
            lastName = newLastName;
            var newFullName = [name, lastName, secondLastName].join('/');
            Firebase.userRef.child(`members/${key}/name`).set(newFullName);  
        }).catch(function(e) {
            console.log(e); // "oh, no!"
        });      
    });

    setSecondLastName = debounce(1000, (key: string, newSecondLastName: string) => {
        Firebase.getUser().then(user => {
            let [name, lastName, secondLastName] = user.members.key.name.split('/');
            secondLastName = newSecondLastName;
            var newFullName = [name, lastName, secondLastName].join('/');
            Firebase.userRef.child(`members/${key}/name`).set(newFullName);   
        }).catch(function(e) {
            console.error(e); // "oh, no!"
        })               
    });

    setPhone = debounce(1000, (key: string, phone: string) => {
        Firebase.userRef.child(`members/${key}/phone`).set(phone);
    });

    setEmail = debounce(1000, (key: string, email: string) => {
        Firebase.userRef.child(`members/${key}/email`).set(email);
    });

    constructor() {
        Firebase.getUser()
            .then(user => this.members = user.members)
            .then(() => this.loading = false);
    }

    toggleItem(key: string, done: boolean) {
        Firebase.userRef.child(`members/${key}/done`).set(done);
    }

    deleteMember(key: string) {
        console.log(key);
    }

    
}