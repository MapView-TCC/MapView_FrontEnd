import { Cost_center, Cost_centerIventario } from "./CostCenter";

export class Owner{
    id_owner: string = "";
    owner_name: string = "";
    cost_center: Cost_center = new Cost_center();
}

export class OwnerIventario{
    id_owner: string = "";
    owner_name: string = "";
    costCenter: Cost_centerIventario = new Cost_centerIventario();
}


