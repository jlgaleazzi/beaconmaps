import _default from "@emotion/styled";
import { LatLng } from "leaflet";

interface IUnit {
    location: LatLng,
    identifier?: string,
    lastUpdated?: Date,
    origin?: string | LatLng, 
    destination?: string | LatLng ,
    status?: "onroute" | "delivering" | "idle",
}

export default IUnit;