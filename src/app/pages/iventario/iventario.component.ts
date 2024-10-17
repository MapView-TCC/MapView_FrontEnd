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
  filteredEquipment: Equipment[] = [];  // Lista filtrada
  showFiltro: boolean = false;  // Para controlar a exibição do componente de filtros
  


  constructor(public generalService: GeneralService, private inventarioService: InventarioService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.inventarioService.getEquipments().subscribe(data => {
      this.equipment = data;
      this.filteredEquipment = data
      console.log('dados carregados', this.filteredEquipment)
      
    });
  }

  aplicarFiltro(filtros: any) {
    console.log('Equipamentos antes do filtro', this.equipment);
    console.log('Filtros aplicados', filtros);

    // Filtrando equipamentos que possuem a validade correspondente ao filtro
    this.filteredEquipment = this.equipment.filter(eq => {
        const yearFromValidity = new Date(eq.validity).getUTCFullYear(); // Extrai o ano como número

        // Comparação com o filtro de validade (só ano)
        const matchValidity = filtros.validity === '' || yearFromValidity === Number(filtros.validity);
        console.log(matchValidity);
        const matchEnvironment = filtros.environment === '' || eq.location.environment.id_environment === Number(filtros.environment);
        const matchOwner = filtros.owner === '' || eq.owner.id_owner === filtros.owner;

        console.log(`Equipamento: ${eq.id_equipment}, Validity: ${eq.validity}, Selected Year: ${filtros.validity}, Year From Validity: ${yearFromValidity}, Match Validity: ${matchValidity}`);
        console.log(filtros.validity, yearFromValidity, matchValidity);
        return matchEnvironment && matchValidity && matchOwner;
    });

    console.log('Equipamentos filtrados', this.filteredEquipment);
    console.log('Filtros recebidos', filtros);
}


  loadEquipment(): Equipment[]{
    return []
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