
import {useState, useRef, useEffect}  from 'react';
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt from '@tomtom-international/web-sdk-maps';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

const beaconMap = () => {
    const dispatch = useAppDispatch();
    const [mapLongitude,setMapLongitude] = useState(-99.133)
    const [mapLatitude, setMapLatitude] = useState(19.432)
    const [map, setMap] = useState({})
    const [mapZoom, setMapZoom] = useState(8)
    const mapElement = useRef(null);
    
    const layers = useAppSelector((state) => state.layers.layers);
    const [unitNumber,setUnitNumber] = useState(1)

    useEffect(()=>  {
        
      let map = tt.map({
           key: 'GWppGGSQTAElC4Z4Qz5ZAGjsIlTh3h3G' ,
           container: mapElement.current,
           center: [mapLongitude, mapLatitude],
           zoom: mapZoom,

        })
        setMap(map);
        return () => map.remove;
    },[])

    return (
      
           
       <div ref={mapElement} className='mapDiv'/>
     
    )
}

export default beaconMap;