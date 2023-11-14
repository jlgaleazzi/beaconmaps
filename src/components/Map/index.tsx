
import React, {useState}  from 'react';
import { MapContainer, TileLayer,useMapEvents, Marker, Popup, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLng } from 'leaflet';
const beaconMap = () => {
    const [markers, setMarkers] = useState<LatLng[]>([]);

    const MyMarker  = () => {
       
        const map = useMapEvents({
            click(e) {
                setMarkers([...markers, e.latlng]);
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
            {markers.map((mark:LatLng, index:number) => {
                return (
                    <Marker position={mark} key={index}></Marker>
                )
            })}
        <MyMarker/>
      </MapContainer>
    )
}

export default beaconMap;