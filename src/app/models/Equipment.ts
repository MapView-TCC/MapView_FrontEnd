import { Location } from "./Location";
import { Owner, OwnerIventario } from "./Owner";
import { Post } from "./Post";
import { Responsible } from "./DataResponsible";

export class Equipment{
    id_equipment: string = "";
    name_equipment: string ="";
    rfid: number = 0;
    type: string ="";
    model: string ="";
    validity: string="";
    admin_rights: string="";
    observation: string= "";
    location: Location = new Location();
    owner: OwnerIventario = new OwnerIventario();
    showOption?: boolean = false;
    // post: Post = new Post();
    responsible: Responsible = new Responsible();    responsibles: Responsible[] = [];
}

export class EquipmentIventario{
  id_equipment: string = "";
  name_equipment: string ="";
  rfid: number = 0;
  type: string ="";
  model: string ="";
  validity: string="";
  admin_rights: string="";
  location: Location = new Location();
  owner: OwnerIventario = new OwnerIventario();
  showOption?: boolean = false;
  post: Post = new Post();
  id_responsavel: any;
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

export class EquipmentTrack{
    idEquipment: string = "";
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
    post: Post = new Post();
}

//falta o observation