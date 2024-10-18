import { Equipment } from "./Equipment";
import { Responsible } from "./Responsible";
import { Enviroment } from "./Enviroment";


export class EquipmentResponsible{
    equipment: Equipment = new Equipment();
    responsible: Responsible = new Responsible();
    environment: Enviroment = new Enviroment();
}