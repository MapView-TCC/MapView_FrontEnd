import { Equipment } from "./Equipment";
import { Location } from "./Location";
import { Post } from "./Post";
import { Owner, OwnerIventario } from "./Owner";
import { Responsible } from "./DataResponsible";

export class ResponsibleFilter{
    id_equip_resp: number = 0;
    equipment: EquipmentIventario = new EquipmentIventario();
    responsible: Responsible = new Responsible();
    start_usage: string = '';
    end_usage: string|null = '';
}

export class EquipmentIventario{
    idEquipment: string = "";
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
  