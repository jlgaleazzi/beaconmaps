import { useState } from "react";
import IUnit from "../Iunits";

const Unidades = (map:tt.Map) => {

interface Marker {
  id: string | undefined;
  obj: tt.Marker;
}

const [markers,setMarkers] = useState<Marker[]>([]);

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

    const addMarkers = () => {

    }



return null;
}

export default Unidades;