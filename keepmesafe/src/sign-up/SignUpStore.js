// @flow
import {observable, computed} from "mobx";

import {Firebase} from "../components";

export default class SignUpStore {

    @observable _loading: boolean = false;
    @computed get loading(): boolean { return this._loading; }
    set loading(loading: boolean) { this._loading = loading; }

    @observable _name: string = "";
    @computed get name(): string { return this._name; }
    set name(name: string) { this._name = name; }

    @observable _lastName: string = "";
    @computed get lastName(): string { return this._lastName; }
    set lastName(lastName: string) { this._lastName = lastName; }

    @observable _momLastName: string = "";
    @computed get momLastName(): string { return this._momLastName; }
    set momLastName(momLastName: string) { this._momLastName = momLastName; }

    @observable _email: string = "";
    @computed get email(): string { return this._email; }
    set email(email: string) { this._email = email; }

    @observable _password: string = "";
    @computed get password(): string { return this._password; }
    set password(password: string) { this._password = password; }

    async signIn(): Promise<void> {
        const {name, lastName, momLastName, phone, email, password} = this;
        this.loading = true;
        try {
            if (name === "") {
                throw new Error("Please provide name.");
            }
            if (lastName === ""){
                throw new Error("Please provide last name.");
            }
            if (momLastName === ""){
                throw new Error("Please provide mom's last name.");
            }
            if (email === "") {
                throw new Error("Please provide email address.");
            }
            if (password === "") {
                throw new Error("Please provide password.");
            }
            const user = await Firebase.auth.createUserWithEmailAndPassword(email, password);
            await user.updateProfile({ displayName: `${name} ${lastName} ${momLastName}`,email});
            await Firebase.setDefaultUserIfEmpty(user);
            this.loading = false;
        } catch(e) {
            this.loading = false;
            throw e;
        }
    }
}