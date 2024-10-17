//Imports for angular
import { Component} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { OnInit, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

//Imports for our components
import { HeaderComponent } from '../../components/header/header.component';
import { NotificationCardComponent } from '../../components/notification-card/notification-card.component';
import { CalendarioComponent } from '../../components/calendario/calendario.component';
import { AutocompleteComponent } from "../../components/autocomplete/autocomplete.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { TrackingHistoryService } from '../../services/tracking-history/tracking-history.service';
import { TrackingHistory } from '../../models/TrackingHistory';
import { NotificationsAlert } from '../../models/NotificationsAlert';


@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [
    HeaderComponent,
    NotificationCardComponent,
    CommonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    AsyncPipe,
    CalendarioComponent,
    AutocompleteComponent,
    FooterComponent
],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.scss'
})
export class HistoricoComponent {
  notifications: NotificationsAlert[] = []; // Use a nova interface aqui

  constructor(private trackingHistoryService: TrackingHistoryService) {}

  ngOnInit() {
    this.loadnotification(); // Chama a função ao inicializar o componente
  }

  loadnotification() {
    this.trackingHistoryService.getTrackingHistory().subscribe((data: TrackingHistory[]) => {
      this.notifications = data.map(item => ({
        warning: item.warning,
        equipmentName: item.equipment.name_equipment,
        action: item.action === 'ENTER' ? 'entrou no' : 'saiu do', // Exemplo de formatação
        environmentName: item.environment.environment_name,
        dateTime: new Date(item.datetime).toLocaleString('pt-BR', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
      }));
    });
  }


}
