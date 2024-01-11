import IUnit from "../components/Map/Layers/Iunits";
import { LatLng } from "leaflet";


const nombres: string[] = [
    'Hilarión' ,
    'Virgilio', 
    'Macario',
    'Virginia',
    'Teófanes',
    'Mar',
    'Sara',
    'Tomás',
    'Leandro',
    'Amelia',
   ' María',
   ' Erico',
]

const immuebleTipo: string[] = [
    'Almacen',
    'Deposito',
    'Central',
]

const estatus: string[] = [
    'En ruta',
    'Entregando',
    'Parado'
]



const getRandom = (array: any[]):any => {
    return array[Math.floor(Math.random() * array.length)];
}

const truckGenerator = (position:LatLng , key:Number):IUnit => {
    let nombreDest:string = getRandom(nombres);

    let nombreOrigen:string = getRandom(nombres);
    let truck: IUnit =  {location: position, identifier:key.toString(), origin:nombreOrigen, destination: nombreDest }
    console.log(JSON.stringify(truck));
    return truck
}

// generate id
// genrate  origin
// generate destination
// generate date
// generate status

export default truckGenerator;