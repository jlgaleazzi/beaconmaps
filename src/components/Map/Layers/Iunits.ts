import _default from "@emotion/styled";
import { LatLng } from "leaflet";

interface IUnit {
    location: LatLng,
    identifier?: string,
    lastUpdated?: Date,
    origin?: string | LatLng, 
    destination?: string | LatLng ,
    status?: "En ruta" | "Entregando" | "Parado",
}

export default IUnit;