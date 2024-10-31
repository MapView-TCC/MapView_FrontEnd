export class NotificationsAlert{
    id_equipment: string = '';
    warning: string = '';
    equipmentName: string = '';
    rfid: number = 0;
    action: string = '';
    environmentName: string = '';
    dateTime: Date = new Date(); // ou Date, se preferir
}