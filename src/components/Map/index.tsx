import {useState, useRef, useEffect}  from 'react';
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt from '@tomtom-international/web-sdk-maps';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fetchLayers } from './Layers/layerSlice';

const BeaconMap = () => {
    const dispatch = useAppDispatch();
    const [mapLongitude,setMapLongitude] = useState(-99.133)
    const [mapLatitude, setMapLatitude] = useState(19.432)
    const mapElement = useRef(null);
    const [mapZoom, setMapZoom] = useState(8)
    const [timer, setTimer] = useState(0);
    const [map, setMap] = useState<tt.Map>()
  
 
    
    const layers = useAppSelector((state) => state.layers.layers);
    const layerStatus = useAppSelector((state) => state.layers.status)
    
    const addMarkers = () => {
        if (map !== undefined && layers[0].units)  {
            layers[0].units?.forEach((unit) => {
                const location = unit.location;
                new tt.Marker()
                .setLngLat({lng:location.lng, lat:location.lat})
                .addTo(map)
            })
           
        }
    }

    const timerHandler = () => {
        console.log ('timer loading');
        dispatch(fetchLayers());
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
       if (Array.isArray(layers) && layers.length > 0)
            addMarkers();
    },[layers])

    useEffect(() => {
        if (map !== undefined  && layerStatus === 'idle') {
            console.log('dispatch fetchLayer')
            dispatch(fetchLayers());
            const timer = setInterval(timerHandler, 60000);
            setTimer(timer);
        }
    }, [map, layerStatus, dispatch])


    return (
       <div ref={mapElement} className='mapDiv'/>
    )
}

export default BeaconMap;