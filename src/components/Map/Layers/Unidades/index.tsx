import { useState } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import IUnit from "../Iunits";
import { Layer } from "../ILayer";
import truckIcon from '../../../../assets/truckIcon.png'
const Unidades = (map:tt.Map, layer:Layer) => {

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
      if (map !== undefined) {
        removeMarkers();
      }
      if (layer.visible && layer.units) {
        layer.units.map((unit) => {
          const location = unit.location;
          const icon = truckIcon;
          const popup = new tt.Popup({closeButton:false, offset:  {top: [0,0],
            bottom: [0,-50],
            "bottom-right": [0,-50],
            "bottom-letft": [0,-50],
            left: [25,-35],
            right: [-25, -35]}}).setHTML(
                popupHtml(unit, layer.label)
            )

            const markerElement = document.createElement("div");

            const m = new tt.Marker({
              element: markerElement
            })
            .setLngLat({lng:location.lng, lat:location.lat})
            .addTo(map)
            .setPopup(popup)
            setMarkers(prevmarker => [...prevmarker, {id:unit.identifier,obj:m}])

        })
      }

    }



return null;
}

export default Unidades;