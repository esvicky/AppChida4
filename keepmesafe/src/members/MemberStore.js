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
        if (title === "") {
            this.loading = false;
            throw new Error("Title field required");
        }
        if (project === "") {
            this.loading = false;
            throw new Error("Project field required");
        }
        const task: Task = {title, time, project, participants: {}, done};
        await Firebase.userRef.child("tasks").push(task);
        this.loading = false;
    }

}