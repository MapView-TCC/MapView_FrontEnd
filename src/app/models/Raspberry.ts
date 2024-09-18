import { Area } from "./Area";
import { Building } from "./Building";

export class Raspberry{
    id_raspberry: string = '';
    building: Building = new Building();
    area:Area = new Area();
    operative: boolean = false;
}
    