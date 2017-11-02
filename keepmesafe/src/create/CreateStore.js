// @flow
import {observable, computed} from "mobx";
import moment from "moment";

import type {Member} from "../Model";
import {Firebase} from "../components";

export default class CreateStore {

    constructor() {
        this.loading = false;
        this.done = false;
    }
    
    @observable _loading: boolean;
    @computed get loading(): boolean { return this._loading; }
    set loading(loading: boolean) { this._loading = loading; }

    @observable _firstName: string = "";
    @computed get firstName(): string { return this._firstName; }
    set firstName(firstName: string) { this._firstName = firstName; }

    @observable _lastName: string = "";
    @computed get lastName(): string { return this._lastName; }
    set lastName(lastName: string) { this._lastName = lastName; }

    @observable _momLastName: string = "";
    @computed get momLastName(): string { return this._momLastName; }
    set momLastName(momLastName: string) { this._momLastName = momLastName; }

    @observable _phone: string = "";
    @computed get phone(): string { return this._phone; }
    set phone(phone: string) { this._phone = phone; }

    @observable _email: string = "";
    @computed get email(): string { return this._email; }
    set email(email: string) { this._email = email; }

    @observable _done: boolean;
    @computed get done(): boolean { return this._done; }
    set done(done: boolean) { this._done = done; }

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    validatePhone = (phone) => {
        const newPhone = `+52${phone}`;
        var re = /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{10}$/;
        return re.test(newPhone);
    };

    async save(): Promise<void> {
        this.loading = true;
        const {firstName, lastName, momLastName, phone, email, done} = this;
        if (firstName === "") {
            this.loading = false;
            throw new Error("Nombre requerido");
        }
        if (lastName === ""){
            this.loading = false;
            throw new Error("Apellido Paterno requerido");
        }
        if (momLastName === ""){
            this.loading = false;
            throw new Error("Apellido Materno requerido");
        }
        if (phone === "") {
            this.loading = false;
            throw new Error("Número de teléfono requerido");
        }else if(!this.validatePhone(phone)){
            this.loading = false;
            throw new Error("Número de teléfono inválido");
        }
        if (email === "") {
            this.loading = false;
            throw new Error("Email requerido");
        }else if (!this.validateEmail(email)){
            this.loading = false;
            throw new Error("Email inválido");
        }
        const member: Member = {name: `${firstName}/${lastName}/${momLastName}`, phone , email, done:true};
        await Firebase.userRef.child("members").push(member);
        this.loading = false;
    }

}