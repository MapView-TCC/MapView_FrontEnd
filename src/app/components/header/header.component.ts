import { Component, OnInit, NgModule } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { ProfileCardComponent } from '../cards/profile-card/profile-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { Equipment} from '../../models/Equipment';
import { FilteredEquipment } from '../../models/FilteredEquipment';
import { FormsModule } from '@angular/forms';
import { TrackingHistory } from '../../models/TrackingHistory';
import { SearchService } from '../../services/search/search.service';
import { NgOptimizedImage } from '@angular/common';
import { SearchPopupComponent } from "../popup/search-popup/search-popup.component";
import { TrackingHistoryService } from '../../services/tracking-history/tracking-history.service';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ProfileCardComponent,
    TranslateModule,
    FormsModule,
    NgOptimizedImage,
    SearchPopupComponent
],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  {

  showProfileCard = false;



  toggleProfileCard() {
    this.showProfileCard = !this.showProfileCard;
    console.log('Profile card toggled:', this.showProfileCard); // Adicione log para depuração
  }

  selectedItem: string = ''; // Item padrão selecionado


  searchItem: String = '';
  filteredItem: FilteredEquipment[] = [];
  equipmentList:Equipment[] = [];
  PopUpVisible: boolean = false;
  selectedEquipment: FilteredEquipment[] = [];
  notifications: TrackingHistory[] = []; // Adicionando esta linha
  showNotification: boolean = false;
  noResult: boolean = false;


  constructor(private searchService:SearchService, private router: Router, private notificacaoService: TrackingHistoryService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateSelectedItem();
    });
  }


  ngOnInit(): void {

    this.notificacaoService.getTrackingHistory().subscribe(notifications => {
      this.notifications = notifications
      // console.log("Essas são as notificações", this.notifications)

    });
  }

  onSearch() {
    if (this.searchItem.length > 2) { 
      // Verifique se o termo de busca está correto
      console.log('Termo de pesquisa:', this.searchItem);
  
      // Verifique se a requisição está sendo enviada
      this.searchService.getEquipments(this.searchItem).subscribe(
        (data: FilteredEquipment[]) => {
          // Log para verificar a resposta da API
          console.log('Resposta da API:', data);
  
          // Atualiza a lista filtrada
          this.filteredItem = data;
          this.noResult = this.filteredItem.length === 0;
  
          if (this.filteredItem.length > 0) {
            console.log('Itens filtrados:', this.filteredItem);
          } else {
            console.log('Nenhum item encontrado para o termo:', this.searchItem);
          }
        },
      );
    } else {
      this.filteredItem = []; // Limpa a lista se o termo for muito curto
      console.log('Termo de busca muito curto, lista limpa.');
    }
  }

  //notificação
  toggleNotification() {
    console.log("Todas as notificações", this.notifications)
    this.showNotification = !this.showNotification
  } 


   // Método para exibir o pop-up ao clicar em um equipamento
   showEquipmentDetails(equipment: FilteredEquipment) {
    // Aqui, crie um EquipmentResponsible apenas com o equipamento selecionado
    let equipmentResponsible:FilteredEquipment = new FilteredEquipment();
    equipmentResponsible = equipment; // Atribua o equipamento pesquisado
    // Defina 'responsible' e 'environment' conforme necessário, ou deixe em branco se não houver dados
    this.selectedEquipment = [equipmentResponsible]; // Define o equipamento selecionado
    this.PopUpVisible = true; // Mostrar o pop-up
    this.searchItem = ''; // Limpa o campo de pesquisa
    this.filteredItem = []; // Limpa a lista filtrada
   }
  // Método para fechar o pop-up
  closePopUp() {
    this.PopUpVisible = false;
    this.selectedEquipment = [];

  }


//Função para selecionar a página e trocar de acordo com a rota e o hover  ficar em baixo
  private updateSelectedItem() {
    const currentRoute = this.router.url;
    if (currentRoute.includes('environment')) {
      this.selectedItem = 'Ambientes';
    } else if (currentRoute.includes('register')) {
      this.selectedItem = 'Cadastro';
    } else if (currentRoute.includes('history')) {
      this.selectedItem = 'Historico';
    } else if (currentRoute.includes('inventory')) {
      this.selectedItem = 'Inventario';
    } else {
      this.selectedItem = ''; // Ou um valor padrão se não for nenhuma das rotas
    }
  }
  
  onAmbiente() {
    this.router.navigate(['/environment']);
  }

  onCadastro() {
    this.router.navigate(['/register']);
  }

  onHistorico() {
    this.router.navigate(['/history']);
  }

  onInventario() {
    this.router.navigate(['/inventory']);
  }
}

