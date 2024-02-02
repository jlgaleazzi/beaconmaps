import { FC, useEffect, useState } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import { useAppDispatch, useAppSelector  } from "../../../../app/hooks";
import IUnit from "../Iunits";
import { Layer } from "../ILayer";
import truckIcon from '../../../../assets/truckIcon.png'
import { fetchTrucks } from "./trucksSlice";

 interface truckProps {
  map:tt.Map | undefined,
  layer: Layer

}
const Unidades = (props:any) => {
const {addMarkers} = props;
interface Marker {
  id: string | undefined;
  obj: tt.Marker;
}

const [markers,setMarkers] = useState<Marker[]>([]);
const dispatch = useAppDispatch();
const trucks = useAppSelector((state) => state.trucks.units)
const truckStatus = useAppSelector((state) => state.trucks.status)
const layerVisible = useAppSelector((state) => state.trucks.visible)

  const popupHtml = (unit:IUnit, label?:string):string => {
    const html = label === 'Unidades' ?
    `<div class='popUp'>
      id: ${unit.identifier} <br/>
      origen: ${unit.origin} <br/>
      destino: ${unit.destination} <br/>
      </div>` :  `<div class='popUp'>
      Almacen
    </div>`
    ;
    return html
  }

  const removeMarkers = () => {
    markers.forEach((m) => {
         console.log(`'removing marker' ${m.id}`)
          m.obj.remove();
     })
     setMarkers([]);
 }



    useEffect(() => {
      if ( truckStatus === 'idle') {
        dispatch(fetchTrucks())
      }
    },[])

    useEffect(() => {
      console.log(`useEffect ${truckStatus}`)
      if (Array.isArray(trucks) ) {
        console.log('useEffect addMarkers')
        addMarkers(trucks);
      }
    }, [trucks, truckStatus])



return null;
}

export default Unidades;