import { Component, OnInit,NgModule } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { ProfileCardComponent } from '../profile-card/profile-card.component';
import { TranslateLoader, TranslateModule,TranslateService  } from '@ngx-translate/core';
import { Equipment, FilteredEquipment } from '../../models/Equipment';
import { EquipmentResponsible } from '../../models/EquipmentResponsible';
import { FormsModule } from '@angular/forms';
import { PopUpComponent } from '../popUp-Search/pop-up/pop-up.component';
import { SearchService } from '../../services/pop-upSearch/search.service';

import { tick } from '@angular/core/testing';
import { GeneralService } from '../../services/general/general.service';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ProfileCardComponent,
    TranslateModule,
    FormsModule,
    PopUpComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  showProfileCard = false;

  

  toggleProfileCard() {
    this.showProfileCard = !this.showProfileCard;
    console.log('Profile card toggled:', this.showProfileCard); // Adicione log para depuração
  }

  selectedItem: string = 'Ambientes'; // Item padrão selecionado
  

  searchItem: String = '';
  filteredItem: FilteredEquipment[] = [];
  equipmentList: Equipment[] = [];
  PopUpVisible: boolean = false;
  selectedEquipment: FilteredEquipment[] = [];
 

  constructor(private searchService:SearchService, private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateSelectedItem();
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
  


  private updateSelectedItem() {
    const currentRoute = this.router.url;
    if (currentRoute.includes('ambiente')) {
      this.selectedItem = 'Ambientes';
    } else if (currentRoute.includes('cadastro')) {
      this.selectedItem = 'Cadastro';
    } else if (currentRoute.includes('historico')) {
      this.selectedItem = 'Historico';
    } else if (currentRoute.includes('iventario')) {
      this.selectedItem = 'Iventario';
    }
  }

  onAmbiente() {
    this.router.navigate(['/ambiente']);
  }

  onCadastro() {
    this.router.navigate(['/cadastro']);
  }

  onHistorico() {
    this.router.navigate(['/historico']);
  }

  onIventario() {
    this.router.navigate(['/iventario']);
  }
}

