// @flow
import {observable, computed} from "mobx";
import {debounce} from "throttle-debounce";

import {Profile} from "../Model";
import {Firebase} from "../components";

export default class SettingsStore {

    @observable _profile: Profile;
    @computed get profile(): Profile { return this._profile; }
    set profile(profile: Profile) { this._profile = profile; }


    setName = debounce(1000, (newName: string) => {
        Firebase.getUser().then(user => {
            let [name, lastName, secondLastName] = user.profile.name.split('/');
            name = newName;
            console.log(name);
            var newFullName = [name, lastName, secondLastName].join('/');
            Firebase.userRef.child("profile/name").set(newFullName);
        }).catch(function(e) {
            console.log(e); // "oh, no!"
        });
        
    });

    setLastName = debounce(1000, (newLastName: string) => {
        Firebase.getUser().then(user => {
            let [name, lastName, secondLastName] = user.profile.name.split('/');
            lastName = newLastName;
            var newFullName = [name, lastName, secondLastName].join('/');
            Firebase.userRef.child("profile/name").set(newFullName);  
        }).catch(function(e) {
            console.log(e); // "oh, no!"
        });      
    });

    setSecondLastName = debounce(1000, (newSecondLastName: string) => {
        Firebase.getUser().then(user => {
            console.log(user);
            let [name, lastName, secondLastName] = user.profile.name.split('/');
            secondLastName = newSecondLastName;
            var newFullName = [name, lastName, secondLastName].join('/');
            Firebase.userRef.child("profile/name").set(newFullName);   
        }).catch(function(e) {
            console.error(e); // "oh, no!"
        })               
    });

    setPhone = debounce(1000, (phone: string) => {
        Firebase.userRef.child("profile/phone").set(phone);
    });

    constructor() {
        Firebase.getUser().then(user => this.profile = user.profile);
    }

    toggleEmailNotifications(done: boolean) {
        Firebase.userRef.child("profile/emailNotifications").set(done);
    }

    togglePhoneNotifications(done: boolean) {
        Firebase.userRef.child("profile/phoneNotifications").set(done);
    }
}