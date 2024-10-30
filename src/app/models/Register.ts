import { DataResponsible } from "./DataResponsible";

export class Register{
    id_equipment: string = '';
    name_equipment: string = '';
    rfid: number = 0;
    type: string = '';
    model: string = '';
    validity: string = '';
    admin_rights: string = '';
    observation: string = '';
    id_environment: number = 0;
    post: string = '';
    id_owner: string = '';
    costCenter_name: string = '';
    dataResponsible: DataResponsible[] = [];
}

export class RegisterUpdate{
    id_equipment: string = '';
    name_equipment: string = '';
    rfid: number = 0;
    type: string = '';
    model: string = '';
    validity: string = '';
    admin_rights: string = '';
    observation: string = '';
    id_environment: number = 0;
    post: string = '';
    id_owner: string = '';
    costCenter_name: string = '';
    dataResponsible: DataResponsible[] = [];
}

