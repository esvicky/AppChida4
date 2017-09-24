// @flow
import {observable, computed} from "mobx";

import type {Polices} from "../Model";
import {Firebase} from "../components";

export default class ListsStore {

    @observable _loading: boolean = true;
    @observable _polices: Polices;

    @computed get polices(): Polices { return this._polices; }
    set polices(polices: Polices) { this._polices = polices; }

    @computed get loading(): boolean { return this._loading; }
    set loading(loading: boolean) { this._loading = loading; }

    constructor() {
        Firebase.getUser()
            .then(user => this.polices = user.polices)
            .then(() => this.loading = false);
    }

    toggleItem(key: string, done: boolean) {
        Firebase.userRef.child(`police/${key}/done`).set(done);
    }
}