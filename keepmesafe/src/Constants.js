// @flow
import {User} from "./Model";

const DEFAULT_USER = (name: string, email: string): User => ({
    profile : {
        name,
        email,
        "phone" : "",
        "emailNotifications" : true,
        "phoneNotifications" : true
    }
});

export {DEFAULT_USER};