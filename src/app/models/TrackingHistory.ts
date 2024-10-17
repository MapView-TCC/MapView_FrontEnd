import { Enviroment } from "./Enviroment";
import { Equipment } from "./Equipment";

export class TrackingHistory{
    id_tracking: number = 0;
    datetime: string = '';
    equipment: Equipment = new Equipment();
    environment: Enviroment = new Enviroment();
    action: string = '';
    warning: string = '';
}


