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
  @Input() warning: string = ''; //Recebe e armazena o valor de warning do componente pai
  @Input() equipmentName: string = ''; //Recebe e armazena o nome do equipamento do componente pai
  @Input() rfid: number = 0; // Recebe e armazena o valor do rfid do compoennte pai
  @Input() action: string = ''; // Recebe e armazena o valor da action do compoennte pai
  @Input() environmentName: string = ''; // Recebe e armazena o o nome do equipamento do compoennte pai
  @Input() dateTime: Date = new Date(); // Recebe a data 

  // Método para verificar se a data é a mesma do dia atual
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
      return (`Etiqueta ${rfid} não cadastrada`)
      // return (`Etiqueta RFID não cadastrada`)
    } else {
      return (`${equipmentName} ${action} ${environmentName}`)
    }
  }

  //Método para exibir o subtítulo correspondente de acordo com o status
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



