import IUnit from "./Iunits";

export interface Layer {
    id: string;
    label?: string;
    visible?: boolean;
    units?: IUnit[];
}