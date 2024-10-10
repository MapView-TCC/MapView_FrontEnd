import { Component, OnInit,NgModule } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { ProfileCardComponent } from '../profile-card/profile-card.component';
import { TranslateLoader, TranslateModule,TranslateService  } from '@ngx-translate/core';
import { InventarioService } from '../../services/equipaments/inventario.service';
import { Equipment } from '../../models/Equipment';
import { FormsModule } from '@angular/forms';
import { PopUpComponent } from '../popUp-Search/pop-up/pop-up.component';

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
export class HeaderComponent implements OnInit{

  showProfileCard = false;

  

  toggleProfileCard() {
    this.showProfileCard = !this.showProfileCard;
    console.log('Profile card toggled:', this.showProfileCard); // Adicione log para depuração
  }

  selectedItem: string = 'Ambientes'; // Item padrão selecionado
  

  searchItem: String = '';
  filteredItem:Equipment[]=[];
  equipmentList: Equipment[] =[];
  PopUpVisible: boolean = false;
  selectedEquipment: Equipment[]=[];
  noResult:boolean = false;
 

  constructor(private equipment:InventarioService, private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateSelectedItem();
    });
  }

  
  ngOnInit(): void {
    this.equipment.getEquipments().subscribe(
      (data: Equipment[]) => {
        this.equipmentList = data; // Preenchendo a equipmentList
        this.filteredItem = data; // Inicialmente, mostra todos os equipamentos
        console.log(this.equipmentList)
      }
    );
  }

  onSearch() {
    if (this.searchItem) {
    
      let searchEquipment = this.equipmentList.filter((e, i) => this.equipmentList.findIndex(o => o.name_equipment == e.name_equipment) === i);
      this.filteredItem = searchEquipment.filter(equipment => equipment.name_equipment.toLowerCase().includes(this.searchItem.toLowerCase())
      );
      console.log(this.searchItem)
      console.log(this.filteredItem)
      console.log(this.equipmentList[0].name_equipment.toLowerCase().includes(this.searchItem.toLowerCase()))

      this.noResult = this.filteredItem.length === 0;

    } else {
      this.filteredItem = this.equipmentList; // Se o campo de pesquisa estiver vazio, mostrar todos
      this.noResult = false;
    }
  }

 

   // Método para exibir o pop-up ao clicar em um equipamento
   showEquipmentDetails(equipment: Equipment) {
    // Filtrar os equipamentos com o mesmo nome e armazenar no selectedEquipment
    this.selectedEquipment = this.equipmentList.filter(e => e.name_equipment === equipment.name_equipment);
    // Tornar o pop-up visível
    this.PopUpVisible = true;
    this.searchItem = '';                // Limpa o campo de pesquisa
    this.filteredItem = [];  
  }

  // Método para fechar o pop-up
  closePopUp() {
    this.PopUpVisible = false;
   
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

