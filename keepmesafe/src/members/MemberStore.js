// @flow
import {observable, computed} from "mobx";
import moment from "moment";

import type {Member} from "../Model";
import {Firebase} from "../components";

export default class MemberStore {

	constructor() {
        this.loading = false;
        this.done = false;
    }
	
	@observable _loading: boolean;
    @computed get loading(): boolean { return this._loading; }
    set loading(loading: boolean) { this._loading = loading; }

    @observable _name: string = "";
    @computed get name(): string { return this.name; }
    set name(name: string) { this._name = name; }

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
    set email(email: string) { this._phone = phone; }

    @observable _done: boolean;
    @computed get done(): boolean { return this._done; }
    set done(done: boolean) { this._done = done; }

    async save(): Promise<void> {
        this.loading = true;
        const {name, phone, email, done} = this;
        if (name === "") {
            this.loading = false;
            throw new Error("Name field required");
        }
        if (lastName === ""){
        	this.loading = false;
            throw new Error("Last name field required");
        }
        if (momLastName === ""){
        	this.loading = false;
            throw new Error("Mom's last name field required");
        }
        if (phone === "") {
            this.loading = false;
            throw new Error("Phone field required");
        }
        if (email === "") {
            this.loading = false;
            throw new Error("Email field required");
        }
        const member: Member = {name: `${name}/${lastName}/${momLastName}`, phone, email, done};
        await Firebase.userRef.child("members").push(member);
        this.loading = false;
    }

}