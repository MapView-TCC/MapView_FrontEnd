//Imports for angular
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HeaderComponent } from '../../components/header/header.component';
import { NotificationCardComponent } from '../../components/cards/notification-card/notification-card.component';
import { AutocompleteComponent } from "../../components/inputs/autocomplete/autocomplete.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { HistoryService } from '../../services/tracking-history/tracking-history.service';
import { Historico, TrackingHistory } from '../../models/TrackingHistory';
import { NotificationsAlert } from '../../models/NotificationsAlert';
import { InventarioService } from '../../services/equipaments/inventario.service';
import moment from 'moment';
import { Router } from '@angular/router';
import { WarningBtnFiltersComponent } from "../../components/warning-btn-filters/warning-btn-filters.component";
import { NoResultsPopupComponent } from '../../components/popup/no-results-popup/no-results-popup.component';
import { GeneralService } from '../../services/general/general.service';
import { CalendarCardComponent } from '../../components/cards/calendar-card/calendar-card.component';


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
    AutocompleteComponent,
    FooterComponent,
    WarningBtnFiltersComponent,
    NoResultsPopupComponent,
    CalendarCardComponent
],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.scss'
})
export class HistoricoComponent {
  notifications: NotificationsAlert[] = [];
  displayNotifications: NotificationsAlert[] = []; // Para exibir as notificações
  initialCountNotifications = 9; //Quantidade inicial de notificaçõe a ser exibida na tela

  filteredNotifications: NotificationsAlert[] = []; // Lista de notificações filtradas
  stateForm: FormGroup;
  isFiltered: boolean = false;

  idEquipment: string[] = [];

  showFilterlog = false;


  constructor(
    private trackingHistoryService: HistoryService,
    private inventarioService: InventarioService,
    private fb: FormBuilder,
    private router: Router,
    public generalService: GeneralService
  ) {
    this.stateForm = this.fb.group({
      stateGroup: [''], // FormControl para o autocomplete
    })
  }

  ngOnInit() {
    this.loadnotification(); // Carrega as notificações ao inicializar o componente
    this.loadEquipmentsID(); // Carregar as opções da API para o autocomplete
  }

  // Função auxiliar para resetar as notificações à exibição inicial
  resetNotifications() {
    this.displayNotifications = this.notifications.slice(-this.initialCountNotifications).reverse();
    this.filteredNotifications = this.notifications;
  }

  //Carrega as notificações do trackingHistory
  loadnotification() {
    this.trackingHistoryService.getHistory().subscribe((data: Historico[]) => {
      this.notifications = data.map(item => ({
        idEquipment: item.equipment?.idEquipment || 'Equipamento não definido', // Checa se 'equipment' existe
        warning: item.warning,
        equipmentName: item.equipment?.name_equipment || 'Equipamento não definido', // Checa se 'equipment' existe
        action: item.action === 'ENTER' ? 'entrou no' : 'saiu do',
        environmentName: item.environment?.environment_name || 'Ambiente não definido', // Checa se 'environment' existe
        rfid: item.equipment?.rfid || 0, // Checa se 'equipment' e 'rfid' existem
        dateTime: new Date(item.datetime),
      }));

      this.resetNotifications();
    });
  }

  //Exibe todas as notificações do mais recente para o mais antigo
  showMoreNotifications() {
    this.displayNotifications = this.notifications.slice().reverse();
  }

  //Função para passar as opções do autocomplete
  loadEquipmentsID() {
    this.inventarioService.getEquipments().subscribe((data) => {
      this.idEquipment = data.map(equipment => equipment.id_equipment)
    })
  }

  // Filtrar as notificações por data
  filterNotificationsByDate(selectedDate: moment.Moment) {
    if (selectedDate) {
      const selectedDateString = selectedDate.format('YYYY-MM-DD');
      this.filteredNotifications = this.notifications.filter(notification =>
        moment(notification.dateTime).format('YYYY-MM-DD') === selectedDateString
      );
      this.isFiltered = true;
    }
    if (this.filteredNotifications.length === 0) {
      this.filteredNotifications = this.notifications;
      this.generalService.showFilterlog = true;
      this.isFiltered = false;
    }
    // Atualiza a lista de exibição com base nas notificações filtradas
    this.displayNotifications = this.filteredNotifications.slice(-this.initialCountNotifications).reverse();

  }

  //Filtrar as notificações pelo status ('RED', 'YELLOW' or 'Green')
  filterByWarnin(warning: string) {
    if (warning) {
      this.filteredNotifications = this.notifications.filter(notification =>
        notification.warning === warning);
      this.isFiltered = true;
    }
    if (this.filteredNotifications.length === 0) {
      this.filteredNotifications = this.notifications;
      this.filteredNotifications = this.notifications.slice(-9).reverse(); // Se nenhum filtro, mostra os 9 últimos
      this.generalService.showFilterlog = true;
      this.isFiltered = false;
    }
    // Atualiza a lista de exibição com base nas notificações filtradas
    this.displayNotifications = this.filteredNotifications.slice(-this.initialCountNotifications).reverse();
  }


  //Filtro das notificações pelo código (id) do equipamento
  filterNotificationsByID(selectedOption: string) {
    if (selectedOption) {
      this.filteredNotifications = this.notifications.filter(notfication =>
        notfication.idEquipment == selectedOption.toUpperCase()
      )
      this.isFiltered = true;
    }
    if (this.filteredNotifications.length === 0) {
      this.filteredNotifications = this.notifications;
      this.generalService.showFilterlog = true;
      this.isFiltered = false;
    }
    // Atualiza a lista de exibição com base nas notificações filtradas
    this.displayNotifications = this.filteredNotifications.slice(-this.initialCountNotifications).reverse();
  }

  //Remove os filtros resetando a página 
  removeFilter() {
    const currentURL = this.router.url
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentURL])
    })
  }

}
