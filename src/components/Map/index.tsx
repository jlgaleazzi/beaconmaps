
import {useState, useRef, useEffect}  from 'react';
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt from '@tomtom-international/web-sdk-maps';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

const BeaconMap = () => {
    const dispatch = useAppDispatch();
    const [mapLongitude,setMapLongitude] = useState(-99.133)
    const [mapLatitude, setMapLatitude] = useState(19.432)
    const mapElement = useRef(null);
    const [mapZoom, setMapZoom] = useState(8)
    const [map, setMap] = useState<tt.Map>()
  
 
    
    const layers = useAppSelector((state) => state.layers.layers);
   
    
    const addMarkers = () => {
        if (map)  {
            layers[0].units?.forEach((unit) => {
                const location = unit.location;
                new tt.Marker()
                .setLngLat({lng:location.lng, lat:location.lat})
                .addTo(map)
            })
           
        }
    }

   
    useEffect(()=>  {
  
        const ttmap = tt.map({
            key: 'GWppGGSQTAElC4Z4Qz5ZAGjsIlTh3h3G' ,
            container: mapElement.current,
            center: [mapLongitude, mapLatitude],
            zoom: mapZoom,
    
         });
         setMap(ttmap);
        
        return () => ttmap.remove();
    },[])

    useEffect(() => {
        addMarkers();
    },[map])


    return (
       <div ref={mapElement} className='mapDiv'/>
    )
}

export default BeaconMap;