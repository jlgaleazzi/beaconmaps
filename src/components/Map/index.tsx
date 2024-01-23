import {useState, useRef, useEffect, createElement}  from 'react';
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt from '@tomtom-international/web-sdk-maps';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fetchLayers } from './Layers/layerSlice';
import truckIcon from '../../assets/truckIcon.png'
import warehouseIcon from '../../assets/warehouse.png'
import IUnit from './Layers/Iunits';
const BeaconMap = () => {

    interface Marker {
        id: string | undefined;
        obj: tt.Marker;
    }
    const dispatch = useAppDispatch();
    const [mapLongitude,setMapLongitude] = useState(-102.15735)
    const [mapLatitude, setMapLatitude] = useState(23.22123)
    const mapElement = useRef(null);
    const [mapZoom, setMapZoom] = useState(5)
    const [timer, setTimer] = useState(0);
    const [map, setMap] = useState<tt.Map>()
    const [markers, setMarkers]  = useState<Marker[]>([])


    const layers = useAppSelector((state) => state.layers.layers);
    const layerStatus = useAppSelector((state) => state.layers.status)

    const popupHtml = (unit:IUnit):string => {
        return (
            `<div class='popUp'>
            id: ${unit.identifier} <br/>
            origen: ${unit.origin} <br/>
            destino: ${unit.destination} <br/>
            </div>`
        )
    }

    const addMarkers = () => {
        if (map !== undefined)  {
            removeMarkers();
            //console.log(`number of current ${markers.length} markers `);
            layers.forEach(layer => {
                if (layer.visible && layer.units) {
                    layer.units?.map((unit,i) => {
                        //console.log (`adding unit ${JSON.stringify(unit.identifier)}`)
                        const location = unit.location;

                        const popup = new tt.Popup({closeButton:false, offset:  {top: [0,0],
                            bottom: [0,-50],
                            "bottom-right": [0,-50],
                            "bottom-letft": [0,-50],
                            left: [25,-35],
                            right: [-25, -35]}}).setHTML(
                                popupHtml(unit)
                            )
                        const markerElement = document.createElement("div")
                        const icon = layer.label === 'Unidades' ? truckIcon : warehouseIcon;
                        markerElement.innerHTML = `<img src=${icon} />`

                        const m = new tt.Marker({element: markerElement})
                        .setLngLat({lng:location.lng, lat:location.lat})
                        .addTo(map)
                        .setPopup(popup)
                        setMarkers(prevmarker => [...prevmarker, {id: unit.identifier, obj:m}]);

                    })
                }
            })

        }
    }

    const removeMarkers = () => {

       markers.forEach((m) => {
            //console.log(`'removing marker' ${m.id}`)
             m.obj.remove();
        })
        setMarkers([]);
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
            //console.log('dispatch fetchLayer')
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