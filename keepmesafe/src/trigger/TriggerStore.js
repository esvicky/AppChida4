// @flow
import {observable, computed} from "mobx";
import {debounce} from "throttle-debounce";

import {Firebase} from "../components";
import type {Events, Tracks} from "../Model";
import {Emergency} from "../Model";
import { LocationHelper } from '../helpers/LocationHelper';


export default class TriggerStore {

    @observable _emergency: Emergency;
    @computed get emergency(): Emergency { return this._emergency; }
    set emergency(emergency: Emergency) { this._emergency = emergency; }

    @observable _loading: boolean = true;
    @observable _tracks: Tracks;

    @computed get tracks(): Tracks { return this._tracks; }
    set tracks(tracks: Tracks) { this._tracks = tracks; }

    @computed get loading(): boolean { return this._loading; }
    set loading(loading: boolean) { this._loading = loading; }

    constructor() {
        Firebase.getUser()
            .then(user => this.emergency = user.emergency)
            .then(user => this.tracks = user.tracks)
            .then(() => this.loading = false);
    }

    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    async sos(){
        try{
            const user = await Firebase.getUser()
            const enableEmergency = !user.emergency.status;
            Firebase.userRef.child("emergency/status").set(enableEmergency);
            console.log(enableEmergency);
            if(enableEmergency){
                let begin = 0;
                const event = await LocationHelper();
                while(begin <= 10){
                    await this.sleep(1000);
                    const location = await LocationHelper();
                    console.log(JSON.stringify(location));
                    Firebase.userRef.child(`emergency/events/${event.timestamp}/tracking/${location.timestamp}`).set( { lat: location.coords.latitude, long : location.coords.longitude});
                    begin++;
                    console.log(`${begin} second later...`);
                }
            }
        }catch(e) {
            console.log(e); // "oh, no!"
        }
    }
}