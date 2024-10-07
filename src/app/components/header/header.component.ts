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
import { PopupComponent } from '../popUp-search/popup/popup.component';
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
    PopupComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  showProfileCard = false;
generalService: any;
  

  toggleProfileCard() {
    this.showProfileCard = !this.showProfileCard;
    console.log('Profile card toggled:', this.showProfileCard); // Adicione log para depuração
  }

  selectedItem: string = 'Ambientes'; // Item padrão selecionado
  

  searchItem: String = '';
  filteredItem:Equipment[]=[];
  equipmentList: Equipment[] =[];
  isModalOpen: boolean = false;
  selectedEquipment: any;
  PopupVisible: boolean = true;
  // searchFilter

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
      // let aaaa = this.equipmentList.filter((e, i) => this.equipmentList.findIndex(o => o.name_equipment == e.name_equipment) === i);      // let aaaa = [...new Set(this.equipmentList)];
      // console.log(aaaa);
      let searchEquipment = this.equipmentList.filter((e, i) => this.equipmentList.findIndex(o => o.name_equipment == e.name_equipment) === i);
      this.filteredItem = searchEquipment.filter(equipment => equipment.name_equipment.toLowerCase().includes(this.searchItem.toLowerCase())
      );
      console.log(this.searchItem)
      console.log(this.filteredItem)
      console.log(this.equipmentList[0].name_equipment.toLowerCase().includes(this.searchItem.toLowerCase()))
    } else {
      this.filteredItem = this.equipmentList; // Se o campo de pesquisa estiver vazio, mostrar todos
    }
  }

  openPopUp(equipment: any){
    console.log('cliquei', equipment)
    this.selectedEquipment = equipment;
    this.PopupVisible = true;
  }

  closePopUp(){
    this.PopupVisible = false;
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

