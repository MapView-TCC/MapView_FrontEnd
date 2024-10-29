import { Location } from "./Location";
import { Enviroment } from "./Enviroment";
import { Equipment, EquipmentTrack } from "./Equipment";

export class TrackingHistory{
    id_tracking: number = 0;
    datetime: string = '';
    equipment: Equipment = new Equipment();
    environment: Enviroment = new Enviroment();
    action: string = '';
    warning: string = '';
}

export class Historico{
    id_tracking: number = 0;
    datetime: string = '';
    equipment: EquipmentTrack = new EquipmentTrack();
    environment: Enviroment = new Enviroment();
    action: string = '';
    warning: string = '';
}

