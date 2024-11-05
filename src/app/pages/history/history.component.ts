//Imports
import { Component,OnDestroy,OnInit } from '@angular/core';
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
import { TrackingHistoryService } from '../../services/tracking-history/tracking-history.service';
import { TrackingHistory } from '../../models/TrackingHistory';
import { NotificationsAlert } from '../../models/NotificationsAlert';
import moment from 'moment';
import { Router } from '@angular/router';
import { WarningBtnFiltersComponent } from "../../components/warning-btn-filters/warning-btn-filters.component";
import { NoResultsPopupComponent } from '../../components/popup/no-results-popup/no-results-popup.component';
import { GeneralService } from '../../services/general/general.service';
import { CalendarCardComponent } from '../../components/cards/calendar-card/calendar-card.component';
import { EquipmentService } from '../../services/equipment/equipment.service';
import { WebsocketService } from '../../services/Websocket/websocket.service';


@Component({
  selector: 'app-history',
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
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})

export class HistoryComponent implements OnInit,OnDestroy {

  notifications: NotificationsAlert[] = []; // Armazena todas as notificações
  displayNotifications: NotificationsAlert[] = []; // Notificações a serem exibidas
  initialCountNotifications = 9; // Quantidade inicial de notificações a ser exibida na tela

  filteredNotifications: NotificationsAlert[] = [];  // Lista de notificações filtradas
  stateForm: FormGroup; // FormGroup para o estado do filtro
  isFiltered: boolean = false; // Indica se há um filtro ativo

  idEquipment: string[] = []; // Armazena IDs de equipamentos

  showFilterlog = false; // Indica se o log de filtro deve ser exibido

  private websocketSubscrption: any




  constructor(
    private trackingHistoryService: TrackingHistoryService,
    private inventarioService: EquipmentService,
    private fb: FormBuilder,
    private router: Router,
    public generalService: GeneralService,
    private websocketService: WebsocketService
  ) {
    // Inicializa o FormGroup com um controle para o filtro de estado
    this.stateForm = this.fb.group({
      stateGroup: [''], // FormControl para o autocomplete
    })
  }

  ngOnInit():void {
    this.loadnotification(); // Carrega as notificações ao inicializar o componente
    this.loadEquipmentsID(); // Carregar as opções da API para o autocomplete
    this.setupWebSocket();
  }

  setupWebSocket() {
    // Inscreve-se nas atualizações do WebSocket
    this.websocketSubscrption = this.websocketService.notifications$.subscribe(notification => {
     const transformedNotification = this.transformNotification(notification)
      this.notifications.push(transformedNotification); // Adiciona a nova notificação ao array
      this.resetNotifications(); // Atualiza a exibição
    });
  }

  private transformNotification(item: TrackingHistory): NotificationsAlert {
    // Exemplo de transformação: Você pode mapear os campos que precisa
    return {
        idEquipment: item.equipment?.code || 'Equipamento não definido', // Checa se 'equipment' existe
        warning: item.warning,
        equipmentName: item.equipment?.name_equipment || 'Equipamento não definido', // Checa se 'equipment' existe
        action: item.action === 'ENTER' ? 'entrou no' : 'saiu do',
        environmentName: item.environment?.environment_name || 'Ambiente não definido', // Checa se 'environment' existe
        rfid: item.equipment?.rfid || 0, // Checa se 'equipment' e 'rfid' existem
        dateTime: new Date(item.datetime),
      // Adicione mais campos conforme necessário
    };
  }

  ngOnDestroy() {
    //this.closeWebSocket(); // Fecha a conexão ao destruir o componente
  }

  
  private closeWebSocket() {
    if (this.websocketSubscrption) {
      this.websocketSubscrption.unsubscribe(); // Limpa a assinatura
      this.websocketSubscrption = null; // Evita referências pendentes
    }
    this.websocketService.disconnect(); // Opcional: você pode criar um método para desconectar
  }



  // Reseta as notificações à exibição inicial
  resetNotifications() {
    this.displayNotifications = this.notifications.slice(-this.initialCountNotifications).reverse();
    this.filteredNotifications = this.notifications;
  }

  //Carrega as notificações do trackingHistory
  loadnotification() {
    this.trackingHistoryService.getTrackingHistory().subscribe((data: TrackingHistory[]) => {
      // Mapeia os dados para criar notificações
      this.notifications = data.map(item => ({
        idEquipment: item.equipment?.code || 'Equipamento não definido',
        warning: item.warning,
        equipmentName: item.equipment?.name_equipment || 'Equipamento não definido',
        action: item.action === 'ENTER' ? 'entrou no' : 'saiu do',
        environmentName: item.environment?.environment_name || 'Ambiente não definido',
        rfid: item.equipment?.rfid || 0,
        dateTime: new Date(item.datetime),
      }));

      this.resetNotifications(); // Reseta as notificações após o carregamento
    });
  }

  // Exibe todas as notificações do mais recente para o mais antigo
  showMoreNotifications() {
    this.displayNotifications = this.notifications.slice().reverse();
  }

  // Carrega os IDs dos equipamentos para o autocomplete
  loadEquipmentsID() {
    this.inventarioService.getEquipments().subscribe((data) => {
      this.idEquipment = data.map(equipment => equipment.code)
    }) // Mapeia os códigos dos equipamentos
  }

  // Filtra as notificações por data
  filterNotificationsByDate(selectedDate: moment.Moment) {
    if (selectedDate) {
      const selectedDateString = selectedDate.format('YYYY-MM-DD');
      // Filtra notificações pela data selecionada
      this.filteredNotifications = this.notifications.filter(notification =>
        moment(notification.dateTime).format('YYYY-MM-DD') === selectedDateString
      );
      this.isFiltered = true;
    }

    // Se não houver notificações filtradas, reseta a lista
    if (this.filteredNotifications.length === 0) {
      this.filteredNotifications = this.notifications;
      this.generalService.showFilterlog = true;
      this.isFiltered = false;
    }

    // Atualiza a lista de exibição com base nas notificações filtradas
    this.displayNotifications = this.filteredNotifications.slice(-this.initialCountNotifications).reverse();

  }

  // Filtra as notificações pelo status ('RED', 'YELLOW' ou 'Green')
  filterByWarnin(warning: string) {
    if (warning) {
      // Filtra notificações pelo warning selecionado
      this.filteredNotifications = this.notifications.filter(notification =>
        notification.warning === warning);
      this.isFiltered = true;
    }

    // Se não houver notificações filtradas, reseta a lista
    if (this.filteredNotifications.length === 0) {
      this.filteredNotifications = this.notifications;
      this.filteredNotifications = this.notifications.slice(-9).reverse(); // Se nenhum filtro, mostra os 9 últimos
      this.generalService.showFilterlog = true;
      this.isFiltered = false;
    }

    // Atualiza a lista de exibição com base nas notificações filtradas
    this.displayNotifications = this.filteredNotifications.slice(-this.initialCountNotifications).reverse();
  }


  // Filtra as notificações pelo código (id) do equipamento
  filterNotificationsByID(selectedOption: string) {
    if (selectedOption) {
      // Filtra notificações pelo ID selecionado
      this.filteredNotifications = this.notifications.filter(notfication =>
        notfication.idEquipment == selectedOption.toUpperCase()
      )
      this.isFiltered = true;
    }

    // Se não houver notificações filtradas, reseta a lista
    if (this.filteredNotifications.length === 0) {
      this.filteredNotifications = this.notifications;
      this.generalService.showFilterlog = true;
      this.isFiltered = false;
    }

    // Atualiza a lista de exibição com base nas notificações filtradas
    this.displayNotifications = this.filteredNotifications.slice(-this.initialCountNotifications).reverse();
  }

  // Remove os filtros e reseta a página
  removeFilter() {
    const currentURL = this.router.url
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentURL]) // Navega de volta para a URL atual
    })
  }

}
