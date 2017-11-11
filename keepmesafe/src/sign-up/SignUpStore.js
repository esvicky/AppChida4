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

    @observable _phone: string = "";
    @computed get phone(): string { return this._phone; }
    set phone(phone: string) { this._phone = phone; }

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    validatePhone = (phone) => {
        const newPhone = `+52${phone}`;
        var re = /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{10}$/;
        return re.test(newPhone);
    };

    async signIn(): Promise<void> {
        const {name, lastName, momLastName, email, password, phone} = this;
        this.loading = true;
        try {
            if (name === "") {
                throw new Error("Nombre requerido.");
            }
            if (lastName === ""){
                throw new Error("Apellido paterno requerido.");
            }
            if (momLastName === ""){
                throw new Error("Apellido materno requerido.");
            }
            if (email === "") {
                throw new Error("Email requerido.");
            }else if (!this.validateEmail(email)){
            this.loading = false;
            throw new Error("Email inválido");
            }
            if (password === "") {
                throw new Error("Contraseña requerida.");
            }
            if (phone === "") {
                this.loading = false;
                throw new Error("Número de teléfono requerido");
            }else if(!this.validatePhone(phone)){
                this.loading = false;
                throw new Error("Número de teléfono inválido");
            }
            const user = await Firebase.auth.createUserWithEmailAndPassword(email, password);
            await user.updateProfile({ displayName: `${name}/${lastName}/${momLastName}`,email});
            await Firebase.setDefaultUserIfEmpty(user);
            await Firebase.userRef.child("profile/phone").set(phone);
            this.loading = false;
        } catch(e) {
            this.loading = false;
            throw e;
        }
    }
}