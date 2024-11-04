import { Location } from "./Location";
import { Owner} from "./Owner";
import { Responsibles } from "./Responsibles";

export class Equipment{
    id_equipment: string = "";
    code: string = "";
    name_equipment: string ="";
    rfid: number = 0;
    type: string ="";
    model: string ="";
    validity: string="";
    admin_rights: string="";
    observation: string= "";
    location: Location = new Location();
    owner: Owner = new Owner();
    showOption?: boolean = false;
    responsible: Responsibles = new Responsibles();    responsibles: Responsibles[] = [];
}
