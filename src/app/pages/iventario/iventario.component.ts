// Imports for Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventarioService } from '../../services/equipaments/inventario.service';
import { Equipment } from '../../models/Equipment';

// Import for our components
import { GeneralService } from '../../services/general/general.service';
import { HeaderComponent } from '../../components/header/header.component';
import { VizualizacaoFormComponent } from '../../components/vizualizacao-form/vizualizacao-form.component';
import { ExcluirPopupComponent } from '../../components/excluir-popup/excluir-popup.component';
import { LocationPopupComponent } from "../../components/location-popup/location-popup.component";
import { error } from 'console';

import { FiltrosComponent } from '../../components/filtros/filtros.component';

interface Item {
  identificacao: string;
  usuario: string;
  laboratorio: string;
  posto: string;
  validade: string;
  showOptions?: boolean; // Controla a exibição do dropdown
}

@Component({
  selector: 'app-iventario',
  standalone: true,
  imports: [HeaderComponent, ExcluirPopupComponent, CommonModule, VizualizacaoFormComponent, LocationPopupComponent,FiltrosComponent, CommonModule],
  templateUrl: './iventario.component.html',
  styleUrls: ['./iventario.component.scss'] 
})
export class IventarioComponent implements OnInit {
  showFilro = false;
  equipment: Equipment[] =[]
 
  toggleFiltro() {
    this.showFilro = !this.showFilro;
    console.log('teste:', this.showFilro);
  }

  itens: Item[] = [
    { identificacao: 'JVL-C-OOO9X', usuario: 'CT67CA', laboratorio: 'Laboratorio 01', posto: 'PC 01', validade: '2027.Q1', showOptions: false },
    { identificacao: 'JVL-C-OOO9X', usuario: 'CT67CA', laboratorio: 'Laboratorio 01', posto: 'PC 01', validade: '2027.Q1', showOptions: false }
  ];

  constructor(public generalService: GeneralService, private inventarioService: InventarioService) {}

  ngOnInit(): void{
   this.loadItems();
  }

 

  loadItems(){
    this.inventarioService.getEquipments().subscribe(
      data => {
          this.equipment = data;
      },
     
  );
  }

  viewItem(item: Item): void {
    this.generalService.showFormlog = true;
    
  }

  deleteItem(item: Item): void {
    this.generalService.showDialog = true;
    
  }
}
