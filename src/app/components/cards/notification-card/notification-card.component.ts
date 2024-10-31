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
  @Input() rfid: number = 0; // Recebe a data como string
  @Input() action: string = '';
  @Input() environmentName: string = '';
  @Input() dateTime: Date = new Date(); // Recebe a data como string

  // Método para verificar se a data é hoje
  isToday(date: Date): boolean {
    const today = new Date();

    return date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate();
  }

  // Método para obter a exibição correta da data
  getDisplayDate(date: Date): string {
    return this.isToday(date)
      ? 'Hoje, ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : date.toLocaleDateString('pt-Br', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
  }

  //Método para exibir o título correspondente
  formatTitle(warning: string, equipmentName: string = 'Sem equipamento', rfid: number, action: string, environmentName: string) {
    if (warning == "RED") {
      // return (`Etiqueta ${rfid} não cadastrada`)
      return (`Etiqueta RFID não cadastrada`)
    } else {
      return (`${equipmentName} ${action} ${environmentName}`)
    }
  }

  //Método para exibir o subtitulo correspondente
  formatSubtitle(warning: string, action: string, environmentName: string) {
    if (warning === 'RED' && action === 'entrou no') {
      return ("Entrou no " + environmentName);
    }
    if (warning === 'RED' && action === 'saiu do') {
      return ("Saiu do " + environmentName);
    }
    else {
      return ("Local de origem: " + environmentName)
    }

  }
}



