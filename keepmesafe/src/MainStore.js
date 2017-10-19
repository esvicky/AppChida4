// @flow
import moment from "moment";
import * as _ from "lodash";
import {observable, computed} from "mobx";

import {Firebase} from "./components";
import type {User, Member, Police} from "./Model";

export default class MainStore {

    @observable _user: User;
    @computed get user(): User { return this._user; }
    set user(user: User) { this._user = user; }

    @observable _police: Police;
    @computed get police(): Police { return this._police; }
    set police(police: Police) { this._police = police; }

    init() {
        Firebase.userRef.on("value", snapshot => {
            this.user = snapshot.val();
        });

        Firebase.policeRef.on("value", snapshot => {
            this.police = snapshot.val();
        });
    }

    get memberCount(): number {
        return this.user ? Object.keys(this.user.members || {}).length : 0;
    }

    get completedMemberCount(): number {
        return this.user ? _.map(this.user.members || {}, member => member)
            .filter(member => member.done).length : 0;
    } 

}