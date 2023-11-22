
import {useState}  from 'react';
import { MapContainer, TileLayer,useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Units from './Layers/units';
import IUnit from './Layers/Iunits';
const beaconMap = () => {
    const [markers, setMarkers] = useState<IUnit[]>([]);

    const MyMarker  = () => {
       
         useMapEvents({
          
            click(e) {
                let newTruck:IUnit = {location: e.latlng}
                setMarkers([...markers, newTruck]);
            }
        })
        return null;
    }

    return (
        <MapContainer center={[19.432, -99.133]} zoom={11} zoomControl={false}  >
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
                <Units trucks={markers} />
        <MyMarker/>
      </MapContainer>
    )
}

export default beaconMap;