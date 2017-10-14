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

    async save(): Promise<void> {
        this.loading = true;
        const {firstName, lastName, momLastName, phone, email, done} = this;
        if (firstName === "") {
            this.loading = false;
            throw new Error("Nombre requirido");
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
        }
        if (email === "" && ( !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(valor3)) )) {
            this.loading = false;
            throw new Error("Email requerido");
        }
        const member: Member = {name: `${firstName}/${lastName}/${momLastName}`, phone, email, done:true};
        await Firebase.userRef.child("members").push(member);
        this.loading = false;
    }

}