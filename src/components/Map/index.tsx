import {useState, useRef, useEffect}  from 'react';
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt from '@tomtom-international/web-sdk-maps';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fetchTrucks } from './Layers/Unidades/trucksSlice';
import truckIcon from '../../assets/truckIcon.png'
import IUnit from './Layers/Iunits';
import { fetchWarehouses } from './Layers/Unidades/warehouseSlice';
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
    const [truckMarkers, setTruckMarkers]  = useState<Marker[]>([])

    const layersVisible = useAppSelector((state) => state.layers)
    const [trucksVisible, setTrucksVisible] = useState(true)

    const trucks = useAppSelector((state) => state.trucks);
    const truckLayerStatus = useAppSelector((state) => state.trucks.status)

    const warehouses = useAppSelector((state) => state.warehouses)
    const warehouseStatus = useAppSelector((state) => state.warehouses.status)

    const popupHtml = (unit:IUnit):string => {
        const html =
        `<div class='popUp'>
        id: ${unit.identifier} <br/>
        origen: ${unit.origin} <br/>
        destino: ${unit.destination} <br/>
        </div>` ;
        return html
    }

    const addTruckMarkers = () => {
        if (map !== undefined)  {
            removeTruckMarkers();
                 if (trucks.visible && trucks.units) {
                    trucks.units?.map((unit,i) => {

                        const location = unit.location;
                        const icon =  truckIcon ;
                        const popup = new tt.Popup({closeButton:false, offset:  {top: [0,0],
                            bottom: [0,-50],
                            "bottom-right": [0,-50],
                            "bottom-letft": [0,-50],
                            left: [25,-35],
                            right: [-25, -35]}}).setHTML(
                                popupHtml(unit)
                            )
                        const markerElement = document.createElement("div")
                       // console.log(`layer.label? ${layer.label}`)
                        markerElement.innerHTML = `<img src=${icon} />`

                        const m = new tt.Marker({element: markerElement})
                        .setLngLat({lng:location.lng, lat:location.lat})
                        .addTo(map)
                        .setPopup(popup)
                        setTruckMarkers(prevmarker => [...prevmarker, {id: unit.identifier, obj:m}]);

                    })
                }

            }

    }

    const removeTruckMarkers = () => {
       truckMarkers.forEach((m) => {

             m.obj.remove();
        })
        setTruckMarkers([]);
    }

    const timerHandler = () => {
        console.log ('timer loading');
        dispatch(fetchTrucks());
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

       if (Array.isArray(trucks.units) && trucks.units.length > 0)
            addTruckMarkers();
    },[trucks])

    useEffect(() => {

       const hide = layersVisible.layers.filter((el) => el.visible === false)
       const show = layersVisible.layers.filter((el) => el.visible === true)
       hide.forEach((layer) => {
        if (layer.label === "Unidades") {
            //remove layer
            removeTruckMarkers();
            setTrucksVisible(false);

        }
       })

       show.forEach((layer) => {
        if (layer.label === "Unidades") {
            setTrucksVisible(true);
            addTruckMarkers();
        }
       })
       
       
       
    },[layersVisible])

    useEffect(() => {
        if (map !== undefined  && truckLayerStatus === 'idle') {
            dispatch(fetchTrucks());
            dispatch(fetchWarehouses());
            const timer = setInterval(timerHandler, 60000);
            setTimer(timer);
        }
    }, [map, truckLayerStatus, dispatch])




    return (
            <div ref={mapElement} className='mapDiv'/>
    )
}

export default BeaconMap;