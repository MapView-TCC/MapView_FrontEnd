import { Location } from "./Location";
import { Owner } from "./Owner";
import { Post } from "./Post";
import { Responsible } from "./Responsible";

export class Equipment{
    id_equipment: string = "";
    name_equipment: string ="";
    rfid: number = 0;
    type: string ="";
    model: string ="";
    validity: string="";
    admin_rights: string="";
    observation: string="";
    location: Location = new Location();
    owner: Owner = new Owner();
    showOption?: boolean = false;
    post: Post = new Post();
    responsible: Responsible = new Responsible();
}

export class FilteredEquipment {
    currentEnvironment: string = ''
    environment: string = ''
    id_equipment: string = ''
    location: string = ''
    name_equipment: string = ''
    owner: string = ''
    responsibles: Array<string> = []
}

//falta o observation