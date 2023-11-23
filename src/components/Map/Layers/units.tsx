import { LayerGroup, Marker} from "react-leaflet";
import IUnit from "./Iunits";


interface UnitsProps {
    
    trucks:IUnit[];
    visible:boolean,

}

const Units = (props:UnitsProps) => {
   
        <LayerGroup>

        {props.trucks.map((mark:IUnit, index:number) => {
            return (
                <Marker position={mark.location} key={index} ></Marker>
        )
    })}
    </LayerGroup>
       

}
    


export default Units;