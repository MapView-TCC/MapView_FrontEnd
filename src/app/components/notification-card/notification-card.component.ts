import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification-card',
  standalone: true,
  imports: [],
  templateUrl: './notification-card.component.html',
  styleUrl: './notification-card.component.scss'
})
export class NotificationCardComponent {
  @Input() warning: string = ''; //pensar se n da para fazer com numeros
  @Input() equipmentName: string = '';
  @Input() action: string = '';
  @Input() environmentName: string = '';


}
