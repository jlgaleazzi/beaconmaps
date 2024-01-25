import IUnit from "../components/Map/Layers/Iunits";
import { LatLng } from "leaflet";
import IWarehouse from "../components/Map/Layers/Iwarehouse";


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

const immuebleTipo: string = [
    'Almacen',
    'Deposito',
    'Central',
]

const estatus: string = [
    'En ruta',
    'Entregando',
    'Parado'
]

const ciudades: string[] =  [
    "CDMX",
    "Puebla",
    "Monterrey",
    "Saltillo",
    "Guadalajara",
    "Cd. Juarez",
    "Toluca",
    "Merida",
    "Queretaro",
    "Morelia",
    "Cancun",
    "Chihuahua",
    "Tijuana",
    "Leon",
    "Pachuca"

]

const getRandom = (array:string[]):string => {
    return array[Math.floor(Math.random() * array.length)];
}

const truckGenerator = (position:LatLng , key:number):IUnit => {
    const nombreDest:string = getRandom(ciudades);
    const nombreOrigen:string = getRandom(ciudades);
    const truck: IUnit =  {location: position, identifier:key.toString(), origin:nombreOrigen, destination: nombreDest }
    console.log(JSON.stringify(truck));
    return truck
}



const locationGenerator = (position:LatLng, key:number):IWarehouse => {
   const warehouse: IWarehouse = {location: position, identifier:key.toString() }
   return warehouse;
}


export  {truckGenerator, locationGenerator};