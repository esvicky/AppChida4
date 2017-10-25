// @flow
import {observable, computed} from "mobx";
import {debounce} from "throttle-debounce";

import {Firebase} from "../components";
import type {Tracks} from "../Model";
import {Emergency} from "../Model";


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
            .then(user => this.emergency = user.emergency);
            //.then(user => this.tracks = user.tracks)
            //.then(() => this.loading = false);
    }

    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
/*
    async sos(){
        Firebase.getUser().then(user => {
            let stat : boolean
            stat = user.emergency.status;
            console.log(stat);
            if(stat === false){
                stat = true;
                Firebase.userRef.child("emergency/status").set(stat);
            }else{
                Firebase.userRef.child("emergency/status").set(false);
            }
        }).catch(function(e) {
            console.log(e); // "oh, no!"
        })


    }*/

    async sos(){
        try{
            const user = await Firebase.getUser()
            Firebase.userRef.child("emergency/status").set(!user.emergency.status);
            console.log(!user.emergency.status);
            if(!user.emergency.status === true){
                let begin = 0;
                while(begin <= 70){
                    await this.sleep(1000);
                    console.log(`Two second later: begin ${begin}`);
                    begin++;
                }
            }
        }catch(e) {
                console.log(e); // "oh, no!"
        }
    }

    async demo() {
        console.log('Taking a break...');
        await this.sleep(10000);
        console.log(`A miute later`);
    }
}