//Imports for angular
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

//Imports for our components
import { HeaderComponent } from '../../components/header/header.component';
import { NotificationCardComponent } from '../../components/notification-card/notification-card.component';
import { CalendarioComponent } from '../../components/calendario/calendario.component';
import { AutocompleteComponent } from "../../components/autocomplete/autocomplete.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { TrackingHistoryService } from '../../services/tracking-history/tracking-history.service';
import { TrackingHistory } from '../../models/TrackingHistory';
import { NotificationsAlert } from '../../models/NotificationsAlert';
import { InventarioService } from '../../services/equipaments/inventario.service';


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
  displayNotifications: NotificationsAlert[] = []; // Para exibir as notificações
  initialCountNotifications = 9; //Quantidade inicial a ser exibida

  filteredNotifications: NotificationsAlert[] = []; // Lista de notificações exibidas
  stateForm: FormGroup;

  idEquipment: string[] = [] //Opções do autocomplete

  constructor(private trackingHistoryService: TrackingHistoryService, private inventarioService: InventarioService, private fb: FormBuilder) { 
    this.stateForm = this.fb.group({
      stateGroup: [''], // FormControl para o autocomplete
    })
  }

  ngOnInit() {
    this.loadnotification(); // Chama a função ao inicializar o componente
    this.loadEquipmentsID(); // Carregar as opções da API para o autocomplete
  }

  loadnotification() {
    this.trackingHistoryService.getTrackingHistory().subscribe((data: TrackingHistory[]) => {
      console.log(data);
      this.notifications = data.map(item => ({
        idEquipment: item.equipment?.idEquipment || 'Equipamento não definido', // Checa se 'equipment' existe
        warning: item.warning,
        equipmentName: item.equipment?.name_equipment || 'Equipamento não definido', // Checa se 'equipment' existe
        action: item.action === 'ENTER' ? 'entrou no' : 'saiu do',
        environmentName: item.environment?.environment_name || 'Ambiente não definido', // Checa se 'environment' existe
        rfid: item.equipment?.rfid || 0, // Checa se 'equipment' e 'rfid' existem
        dateTime: new Date(item.datetime),
      }));

      

      //exibe os 9 itens recem adicionados no banco 
      this.displayNotifications = this.notifications.slice(-this.initialCountNotifications).reverse();
      this.filteredNotifications = this.notifications; // Inicializa com todas as notificações
      console.log(this.filteredNotifications)
      console.log(this.notifications)
    });
  }

  showMoreNotifications() {
    //Exibe todas as notificações do mais recente para o mais antigo
    this.displayNotifications = this.notifications.slice().reverse();
  }

  //Função para passar as opções para o autocomplete
  loadEquipmentsID(){
    this.inventarioService.getEquipments().subscribe((data)=> {
      this.idEquipment = data.map(equipment => equipment.id_equipment )
    })
    return this.idEquipment;
  }

  //Função de filtro chamada quando uma opção é selecionada no autoocomplete
  filterNotifications(selectedOption: string){
    console.log(selectedOption)
    if(selectedOption){
      console.log(this.notifications)
      this.filteredNotifications = this.notifications.filter(notfication =>
        notfication.idEquipment == selectedOption.toUpperCase()// Filtra as notificações com base na opção selecionada
      )
      
      console.log("Chegeui no pqp")
    }else{
      // Se não houver opção selecionada, exibe todas as notificações
      this.filteredNotifications = this.notifications;
    }
    // Atualiza a lista de exibição com base nas notificações filtradas
    this.displayNotifications = this.filteredNotifications.slice(-this.initialCountNotifications).reverse();
  }

  
  //

}
