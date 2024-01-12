import _default from "@emotion/styled";

interface IUnit {
    location: {lat:number, lng:number},
    identifier?: string,
    lastUpdated?: Date,
    origin?: string | {lat:number, lng:number},
    destination?: string | {lat:number, lng:number} ,
    status?: "En ruta" | "Entregando" | "Parado",
}

export default IUnit;