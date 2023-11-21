import { LatLng } from "leaflet";
import { LayerGroup, Marker} from "react-leaflet";


interface UnitsProps {
    trucks:LatLng[];

}

const Units = (props:UnitsProps) => {
    return (
        <LayerGroup>

        {props.trucks.map((mark:LatLng, index:number) => {
            return (
                <Marker position={mark} key={index} ></Marker>
        )
    })}
    </LayerGroup>
       
        );
}
    


export default Units;