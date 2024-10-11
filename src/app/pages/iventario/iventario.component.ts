import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventarioService } from '../../services/equipaments/inventario.service';
import { Equipment } from '../../models/Equipment';
import { GeneralService } from '../../services/general/general.service';
import { HeaderComponent } from '../../components/header/header.component';
import { VizualizacaoFormComponent } from '../../components/vizualizacao-form/vizualizacao-form.component';
import { ExcluirPopupComponent } from '../../components/excluir-popup/excluir-popup.component';
import { LocationPopupComponent } from "../../components/location-popup/location-popup.component";
import { FiltrosComponent } from '../../components/filtros/filtros.component';
import { FilterPopupComponent } from '../../components/filter-popup/filter-popup.component';

@Component({
  selector: 'app-iventario',
  standalone: true,
  imports: [HeaderComponent, ExcluirPopupComponent, CommonModule, VizualizacaoFormComponent, LocationPopupComponent, FiltrosComponent, FilterPopupComponent],
  templateUrl: './iventario.component.html',
  styleUrls: ['./iventario.component.scss'] 
})
export class IventarioComponent implements OnInit {
  showFilro = false;
  showDialog = false;
  showFormlog = false;
  showOptionsIndex: number | null = null;
  equipment: Equipment[] = [];
  itemToDelete: Equipment | null = null; // Adicione esta linha

  constructor(public generalService: GeneralService, private inventarioService: InventarioService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.inventarioService.getEquipments().subscribe(data => {
      this.equipment = data;
    });
  }

  toggleFiltro() {
    this.showFilro = !this.showFilro;
    console.log('teste:', this.showFilro);
  }

  toggleOptions(index: number) {
    if (this.showOptionsIndex === index) {
      this.showOptionsIndex = null; // Fecha se o mesmo for clicado
    } else {
      this.showOptionsIndex = index; // Abre o novo
    }
  }

  closeOptions() {
    this.showOptionsIndex = null; // Fecha o menu
  }

  viewItem(item: Equipment) {
    this.generalService.showFormlog = true;
    this.closeOptions(); // Usa 'this' para chamar o método
  }


  deleteItem(item: Equipment) {
    this.itemToDelete = item; // Armazena o equipamento a ser excluído
    this.generalService.showDialog = true; // Exibe o popup
    this.closeOptions();
  }
  
  confirmDelete() {
    if (this.itemToDelete) {
      this.inventarioService.deleteEquipment(Number(this.itemToDelete.id_equipment)).subscribe(() => {
        this.equipment = this.equipment.filter(e => e.id_equipment !== this.itemToDelete!.id_equipment);
        this.generalService.showDialog = false; // Fecha o popup
        this.itemToDelete = null; // Limpa a referência
      });
    }
  }
  
  cancelDelete() {
    this.generalService.showDialog = false; // Fecha o popup sem excluir
    this.itemToDelete = null; // Limpa a referência
  }
  

}