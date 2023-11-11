import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer,useMapEvents, Marker, Popup, ZoomControl } from "react-leaflet";

const beaconMap = () => {

    const MyMarker  = () => {
       
        const map = useMapEvents({
            click(e) {
                console.log(JSON.stringify(e.latlng))
            }
        })
        return null;
    }

    return (
        <MapContainer center={[19.432, -99.133]} zoom={11} zoomControl={false} >
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        <MyMarker/>
      </MapContainer>
    )
}

export default beaconMap;