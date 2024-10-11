import { Location } from "./Location";
import { Owner } from "./Owner";
import { Equipment_Responsible } from "./Equipment_Responsible";

export class Equipment{
    id_equipment: string = "";
    name_equipment: string ="";
    rfid: number = 0;
    type: string ="";
    model: string ="";
    validity: string="";
    admin_rights: string="";
    location: Location = new Location();
    owner: Owner = new Owner();
    showOption?: boolean = false;
    equipment_responsible: Equipment_Responsible[] = [];

}
