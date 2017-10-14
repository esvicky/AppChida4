// @flow
import {observable, computed} from "mobx";
import {debounce} from "throttle-debounce";


import {Profile} from "../Model";
import {Firebase} from "../components";

export default class PhoneStore {
	@observable _profile: Profile;
    @computed get profile(): Profile { return this._profile; }
    set profile(profile: Profile) { this._profile = profile; }

    setPhone = debounce(1000, (phone: string) => {
    	
        Firebase.userRef.child("profile/phone").set(phone);
    });

    constructor() {
        Firebase.getUser().then(user => this.profile = user.profile);
    }

}