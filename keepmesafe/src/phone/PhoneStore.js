// @flow
import {observable, computed} from "mobx";
import {debounce} from "throttle-debounce";

import {Profile} from "../Model";
import {Firebase} from "../components";

const accountSid = 'AC189fad9eef9a38b7c137caa7a4b9273b';
const authToken = 'a5cc77d84f5b391b152f79c24a07a082';

const client = require('twilio')(accountSid, authToken);

export default class PhoneStore {
	@observable _profile: Profile;
    @computed get profile(): Profile { return this._profile; }
    set profile(profile: Profile) { this._profile = profile; }

    setPhone = debounce(1000, (phone: string) => {
    	client.lookups.v1.phoneNumbers(phone).fetch()
    	  	.then({
                (number) => console.log(number.carrier.type, number.carrier.name)
                Firebase.userRef.child("profile/phone").set(phone);

            }).catch(function(e) {
    	            console.log(e); // "oh, no!"
    		});
    });

    constructor() {
        Firebase.getUser().then(user => this.profile = user.profile);
    }

}