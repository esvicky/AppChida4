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
            //console.log(name);
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
            //console.log(user);
            let [name, lastName, secondLastName] = user.profile.name.split('/');
            secondLastName = newSecondLastName;
            var newFullName = [name, lastName, secondLastName].join('/');
            Firebase.userRef.child("profile/name").set(newFullName);   
        }).catch(function(e) {
            console.error(e); // "oh, no!"
        })               
    });

    validatePhone = (phone) => {
        const newPhone = `+52${phone}`;
        var re = /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{10}$/;
        return re.test(newPhone);
    };

    setPhone = debounce(1000, (phone: string) => {
        Firebase.getUser().then(user => {
            //console.log(user);
            let phone1 = user.profile.phone;
            //console.log(phone1);
            if(!this.validatePhone(phone)){
                try {
                    alert('Número de teléfono inválido');
                    Firebase.userRef.child("profile/phone").set(phone1);
                } catch(e) {
                    alert(e.message);
                }
            }else
                Firebase.userRef.child("profile/phone").set(phone); 
        }).catch(function(e) {
            console.error(e); // "oh, no!"
        })  
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