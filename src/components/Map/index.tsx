
import {useState}  from 'react';
import { MapContainer, TileLayer,useMapEvents, Marker, Popup, ZoomControl, LayerGroup, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLng } from 'leaflet';
const beaconMap = () => {
    const [markers, setMarkers] = useState<LatLng[]>([]);

    const MyMarker  = () => {
       
         useMapEvents({
          
            click(e) {
                console.log(`event ${JSON.stringify(e.latlng)}`);
                setMarkers([...markers, e.latlng]);
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
           
                        <LayerGroup >


                            {markers.map((mark:LatLng, index:number) => {
                                return (
                                    <Marker position={mark} key={index} ></Marker>
                                )
                        })}
                        </LayerGroup>
         
                       

             
                    
                
        <MyMarker/>
      </MapContainer>
    )
}

export default beaconMap;