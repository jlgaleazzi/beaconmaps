import _default from "@emotion/styled";
import { LatLng } from "leaflet";

interface IWarehouse {
    location : LatLng,
    identifier?: string,
    lastUpdated?:Date
}

export default IWarehouse