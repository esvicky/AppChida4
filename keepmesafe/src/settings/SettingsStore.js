// @flow
import {observable, computed} from "mobx";
import  {debounce} from "throttle-debounce";

import {Profile} from "../Model";
import {Firebase} from "../components";

export default class SettingsStore {

    @observable _profile: Profile;
    @computed get profile(): Profile { return this._profile; }
    set profile(profile: Profile) { this._profile = profile; }

    setName = debounce(1000, (name: string) => {
        Firebase.userRef.child("profile/name").set(name);
    });

    setLastName = debounce(1000, (lastName: string) => {
        Firebase.userRef.child("profile/lastName").set(lastName);
    });

    setMomLastName = debounce(1000, (momLastName: string) => {
        Firebase.userRef.child("profile/momLastName").set(momLastName);
    });

    /*setPhone = debounce(1000, (phone: string) => {
        Firebase.userRef.child("profile/phone").set(phone);
    });*/

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