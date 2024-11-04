import { Classes } from "./Classes";
import { User } from "./User";

export class Responsibles {
    responsible_id: number = 0;
    responsible: string = '';
    edv: string = '';
    classes: Classes = new Classes();
    users: User = new User();
}
