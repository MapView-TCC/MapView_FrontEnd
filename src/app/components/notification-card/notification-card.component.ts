import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-card.component.html',
  styleUrl: './notification-card.component.scss'
})
export class NotificationCardComponent {
  @Input() warning: string = ''; //pensar se n da para fazer com numeros
  @Input() equipmentName: string = '';
  @Input() action: string = '';
  @Input() environmentName: string = '';
  @Input() dateTime: string = ''; // Recebe a data como string

   // Método para verificar se a data é hoje
   isToday(dateString: string): boolean {
    const date = new Date(dateString);
    const today = new Date();

    return date.getFullYear() === today.getFullYear() &&
           date.getMonth() === today.getMonth() &&
           date.getDate() === today.getDate();
  }

  // Método para formatar a data e hora
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}/${month}/${year}, ${hours}:${minutes}`; // Formatação da data e hora
  }

  // Método para obter a exibição correta da data
  getDisplayDate(dateString: string): string {
    return this.isToday(dateString) 
      ? 'Hoje, ' + new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      : this.formatDate(dateString);
  }
}



