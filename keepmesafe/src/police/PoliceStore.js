// @flow
import {observable, computed} from "mobx";

import type {Police} from "../Model";
import {Firebase} from "../components";

export default class PoliceStore {

    @observable _loading: boolean = true;
    @observable _police: Police;

    @computed get police(): Police { return this._police; }
    set police(police: Police) { this._police = police; }

    constructor() {
        name = Firebase.getPolice()
            .then(police => this.police = police)
            .then(() => this.loading = false);
    }

}