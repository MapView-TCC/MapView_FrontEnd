import { Classes } from "./Classes";
import { User } from "./User";
import { Location } from "./Location";

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