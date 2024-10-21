import { Enviroment } from "./Enviroment";
import { Equipment, EquipmentTrack } from "./Equipment";

export class TrackingHistory{
    id_tracking: number = 0;
    datetime: string = '';
    equipment: EquipmentTrack = new EquipmentTrack();
    environment: Enviroment = new Enviroment();
    action: string = '';
    warning: string = '';
}


