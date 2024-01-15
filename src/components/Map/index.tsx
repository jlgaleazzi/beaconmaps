
import {useState}  from 'react';
import { MapContainer, TileLayer,useMapEvents } from "react-leaflet";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addUnit } from './Layers/layerSlice';
import "leaflet/dist/leaflet.css";
import Units from './Layers/units';
import IUnit from './Layers/Iunits';
import truckGenerator from '../../utils/truckgenerator';
const BeaconMap = () => {
    const dispatch = useAppDispatch();
    const layers = useAppSelector((state) => state.layers.layers);
    const [unitNumber,setUnitNumber] = useState(1)

    const MyMarker  = () => {
       
         useMapEvents({
          
            click(e) {
                
                const newTruck:IUnit = truckGenerator(e.latlng, unitNumber);
                setUnitNumber(unitNumber + 1);
                dispatch(addUnit({layerId:'0',unit:newTruck}))
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
            {layers.map((layer) => ( 
             layer.visible &&
                <Units key={layer.id} trucks={layer.units} />
            ))}
           
        <MyMarker/>
      </MapContainer>
    )
}

export default BeaconMap;