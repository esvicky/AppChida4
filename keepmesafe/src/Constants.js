// @flow
import {User} from "./Model";

const DEFAULT_USER = (name: string, lastName: string, momLastName: string, phone: number): User => ({
    profile : {
        name,
        lastName,
        momLastName,
        phone,
        "emailNotifications" : true,
        "phoneNotifications" : true
    },
    members : {
        "9IjrOBdfw5WtTNutIk5cHVQL01n2" : {
            "name" : "Pancho",
            "lastName" : "Perez",
            "momLastName" : "Perez",
            "phone" : 519948000000,
            "email" : "example@gmail.com",
            "done" : false
        }
        
    },
    police: {
        "-KrpI_77r8nBwiT1CYxl": {
            "done" : true,
            "name" : "Policia CDMX",
            "phone" : 519948000001,
            "email" : "policia.cdmx@gmail.com"
        }
    }
});

export {DEFAULT_USER};