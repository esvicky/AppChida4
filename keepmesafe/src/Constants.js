// @flow
import {User} from "./Model";

const DEFAULT_USER = (name: string, email: string): User => ({
    profile : {
        name,
        email,
        "phone" : "",
        "emailNotifications" : true,
        "phoneNotifications" : true
    },
    members : {
        "9IjrOBdfw5WtTNutIk5cHVQL01n2" : {
            "name" : "Pancho/Perez/Perez",
            "phone" : "+525511111111",
            "email" : "example@gmail.com",
            "done" : false
        }  
    }
});

export {DEFAULT_USER};