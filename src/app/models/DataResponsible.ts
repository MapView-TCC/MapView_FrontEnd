import { Classes } from "./Classes";
import { User } from "./User";
import { Location } from "./Location";
import { EquipmentIventario } from "./Equipment";

export class DataResponsible{
    responsible_name: string = '';
    edv: string = '';
    enumCourse: string = '';
    name_classes: string = '';
}

export class Responsible {
    id_responsible: number = 0;
    responsible: string = '';
    edv: string = '';
    location: Location = new Location();
    classes: Classes = new Classes();
    user: User = new User();
    operative: boolean = false;
}

export class ResponsibleForm {
    responsible: string = '';
    edv: string = '';
    classes: string = '';
    enumCourse: string = '';
}

//acho que é do vizualizar 
export class ResponsibleSocorro{
    responsible_name: string = '';
    edv: string = '';
    id_classes: number=1;
    id_user: number=1;
}

//responsivle-by-id-service
export class ResponsibleFilter{
    id_equip_resp: number = 0;
    equipment: EquipmentIventario = new EquipmentIventario();
    responsible: Responsible = new Responsible();
    start_usage: string = '';
    end_usage: string|null = '';
}


export const ResponsibleList: ResponsibleSocorro[]=[]
