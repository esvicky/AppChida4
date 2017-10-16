// @flow
import {observable, computed} from "mobx";
import {debounce} from "throttle-debounce";


import {Profile} from "../Model";
import {Firebase} from "../components";

export default class PhoneStore {

    constructor() {
        Firebase.getUser().then(user => this.profile = user.profile);
        this.loading = false;
    }

    @observable _profile: Profile;
    @computed get profile(): Profile { return this._profile; }
    set profile(profile: Profile) { this._profile = profile; }

    @observable _loading: boolean;
    @computed get loading(): boolean { return this._loading; }
    set loading(loading: boolean) { this._loading = loading; }

    @observable _phone: string = "";
    @computed get phone(): string { return this._phone; }
    set phone(phone: string) { this._phone = phone; }

    validatePhone = (phone) => {
        const newPhone = `+52${phone}`;
        var re = /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{10}$/;
        return re.test(newPhone);
    };

    async save(): Promise<void> {
        this.loading = true;
        const {phone} = this;
        if (phone === "") {
            this.loading = false;
            throw new Error("Número de teléfono requerido");
        }else if(!this.validatePhone(phone)){
            this.loading = false;
            throw new Error("Número de teléfono inválido");
        }
        await Firebase.userRef.child("profile/phone").set(phone);
        this.loading = false;
    }
}