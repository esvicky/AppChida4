// @flow
import {observable, computed} from "mobx";
import {debounce} from "throttle-debounce";

import {Firebase} from "../components";
import type {Events} from "../Model";
import {Emergency} from "../Model";
import { LocationHelper } from '../helpers/LocationHelper';


export default class TriggerStore {

    @observable _emergency: Emergency;
    @computed get emergency(): Emergency { return this._emergency; }
    set emergency(emergency: Emergency) { this._emergency = emergency; }

    @observable _loading: boolean = true;
    
    @observable _events: Events;

    @computed get events(): Events { return this._events; }
    set events(events: Events) { this._events = events; }

    @computed get loading(): boolean { return this._loading; }
    set loading(loading: boolean) { this._loading = loading; }

     constructor() {
        
            /*.then(user => {
                this.emergency = user.emergency;
                this.enableEmergency = user.emergency.status;
                this.events = user.events;
            })
            .then(() => this.loading = false);*/
    }

    async builder() {
        const user = await Firebase.getUser()
        this.enableEmergency = user.emergency.status;
        this.emergency = user.emergency;
        this.events = user.emergency.events;
    }

    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    @observable _enableEmergency: boolean;
    @computed get enableEmergency(): boolean { return this._enableEmergency; }
    set enableEmergency(enableEmergency: boolean) { this._enableEmergency = enableEmergency; }

    async sos(){
        try{
            const user = await Firebase.getUser()
            enableEmergency = !user.emergency.status;
            Firebase.userRef.child("emergency/status").set(enableEmergency);
            //console.log(enableEmergency);
            const event = Date.now();
            //console.log(enableEmergency);
            while(enableEmergency){
                const location = await LocationHelper();
                //console.log(JSON.stringify(location));
                Firebase.userRef.child(`emergency/events/t-${event}/tracking/${location.timestamp}`).set( { lat: location.coords.latitude, long : location.coords.longitude});
                await this.sleep(10000);
            }
        }catch(e) {
            console.log(e); // "oh, no!"
        }
    }

    async monitored(){
        try{
            const user = await Firebase.getUser()
            enableEmergency = user.emergency.status;
            //console.log(`User.emergency.status= ${user.emergency.status}`);
            //console.log(`enableEmergency: ${enableEmergency}`);
            const events = user.emergency.events;
            const event = Object.keys(events).pop();

            //console.log(`Events: ${JSON.stringify(events)}`);
            console.log(`Event Key: ${event}`);
            
            while(enableEmergency){
                const location = await LocationHelper();
                //console.log(JSON.stringify(location));
                Firebase.userRef.child(`emergency/events/${event}/tracking/${location.timestamp}`).set( { lat: location.coords.latitude, long : location.coords.longitude});
                await this.sleep(10000);
            }
        }catch(e) {
            console.log(e); // "oh, no!"
        }
    }
}