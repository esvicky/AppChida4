// @flow
import {observable, computed} from "mobx";

import type {Members} from "../Model";
import {Firebase} from "../components";

export default class MemberStore {

    @observable _loading: boolean = true;
    @observable _members: Members;

    @computed get members(): Members { return this._members; }
    set members(members: Members) { this._members = members; }

    @computed get loading(): boolean { return this._loading; }
    set loading(loading: boolean) { this._loading = loading; }

    constructor() {
        Firebase.getUser()
            .then(user => this.members = user.members)
            .then(() => this.loading = false);
    }

    toggleItem(key: string, done: boolean) {
        Firebase.userRef.child(`members/${key}/done`).set(done);
    }
}