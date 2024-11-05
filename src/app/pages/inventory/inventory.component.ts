import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentService } from '../../services/equipment/equipment.service';
import { Equipment } from '../../models/Equipment';
import { GeneralService } from '../../services/general/general.service';
import { HeaderComponent } from '../../components/header/header.component';
import {ViewEditPopupComponent } from '../../components/popup/view-edit-popup/view-edit-popup.component';
import { DeletePopupComponent } from '../../components/popup/delete-popup/delete-popup.component';
import { FiltersComponent } from '../../components/filters/filters.component';
import { NoResultsPopupComponent } from '../../components/popup/no-results-popup/no-results-popup.component';
import { ExportToExcelService } from '../../services/export-to-excel/export-to-excel.service';
import { FooterComponent } from "../../components/footer/footer.component";
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-iventario',
  standalone: true,
  imports: [HeaderComponent, DeletePopupComponent, CommonModule, FiltersComponent, FooterComponent, MatIconModule, NoResultsPopupComponent, ViewEditPopupComponent],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  showDialog = false;
  showFormlog = false;
  showOptionsIndex: number | null = null;
  equipment: Equipment[] = [];
  itemToDelete: Equipment | null = null; 
  filteredEquipment: Equipment[] = [];  // Lista filtrada
  showFiltro: boolean = false;  // Para controlar a exibição do componente de filtros
  @ViewChild(FiltersComponent) filtersComponent!: FiltersComponent; // Referência para app-filtros

  pageNumbers: number[] = [];
  currentPage: number = 0; // Página atual
  itemsPerPage: number = 10; // Itens por página
  totalItems: number = 0; // Total de itens dinâmico
  totalPages: number = 0; // Total de páginas
  lastFiltrosAplicados: any;
  currentPageItems: Equipment[] = [];

  selectedEquipment: string = '';
  constructor(public generalService: GeneralService, private inventoryService: EquipmentService, private excelService: ExportToExcelService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  //careegar os itens da pagina
  loadItems() {
    this.inventoryService.getEquipments().subscribe(data => {
      this.equipment = data;
      console.log("equipamentos carregados", this.equipment)

      this.filteredEquipment = data; // Inicialmente sem filtros
      this.totalItems = this.filteredEquipment.length;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.updatePageNumbers();
      this.paginateFilteredItems(); // Inicializa a primeira página
    });
  }

//Atualizar os números de páginas de acordo com a quantidade de quipamentos 
  updatePageNumbers() {
    this.pageNumbers = [];
    const maxPagesToShow = 3; // Número máximo de páginas para exibir
    const startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);
  
  
    for (let i = startPage; i <= endPage; i++) {
      if (i <= this.totalPages) {
        this.pageNumbers.push(i);
      }
    }
  }

  paginateFilteredItems() {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.currentPageItems = this.filteredEquipment.slice(start, end); // Define os itens da página atual
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.paginateFilteredItems(); // Atualiza os itens da nova página
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.paginateFilteredItems(); // Atualiza os itens da página anterior
    }
  }

  setItemsPerPage(num: number) {
    this.itemsPerPage = num;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.currentPage = 0; // Volta para a primeira página
    this.updatePageNumbers();
    this.paginateFilteredItems(); // Atualiza os itens exibidos
  }

  aplicarFiltro(filtros: any) {
    this.generalService.showFilterlog = false;
    this.filteredEquipment = this.equipment.filter(eq => {
      const yearFromValidity = new Date(eq.validity).getUTCFullYear();
      const matchValidity = filtros.validity === '' || yearFromValidity === Number(filtros.validity);
      const matchEnvironment = filtros.environment === '' || eq.location.environment.id_environment === Number(filtros.environment);
      const matchOwner = filtros.owner === '' || eq.owner.id_owner === filtros.owner;
      console.log("apliquei")
      return matchEnvironment && matchValidity && matchOwner;
    });

    if(this.filteredEquipment.length === 0){
      this.filtersComponent.resetFiltros(); // Chama a função de reset do componente filho
      this.generalService.showFilterlog = true;
    }

    this.totalItems = this.filteredEquipment.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.currentPage = 0;
    this.updatePageNumbers();
    this.paginateFilteredItems(); // Reaplica a paginação nos itens filtrados
  }

  toggleFiltro() {
    this.showFiltro = !this.showFiltro;
    console.log('teste:', this.showFiltro);
  }



  toggleOptions(index: number) {
    if (this.showOptionsIndex === index) {
      this.showOptionsIndex = null; // Fecha se o mesmo for clicado
    } else {
      this.showOptionsIndex = index; 
    }
  }

  closeOptions() {
    this.showOptionsIndex = null;
  }

  viewItem(item: Equipment) {
    this.generalService.showFormlog = true;
    this.selectedEquipment = item.id_equipment;
    this.closeOptions(); 
    console.log(this.generalService.showFormlog);
    console.log(this.selectedEquipment);
  }

  onExport() {
    this.excelService.exportToExcel().subscribe(
      (blob) => {
        console.log(blob); // Verifique o conteúdo do blob
        const fileURL = URL.createObjectURL(blob);
        console.log(fileURL); // Verifique o URL gerado
        this.excelService.downloadExcel(blob, 'equipment.xls');
      },
    );
  }


  deleteItem(item: Equipment) {
    this.itemToDelete = item; // Armazena o equipamento a ser excluído
    this.generalService.showDialog = true; // Exibe o popup
    this.closeOptions(); // Fecha o menu de opções
  }

  confirmDelete() {
    console.log('Tentando excluir o equipamento:', this.itemToDelete);

    if (this.itemToDelete) {
      const equipmentId = this.itemToDelete.code; // ID como string
      this.inventoryService.deleteEquipment(equipmentId).subscribe({
        next: () => {
          // Remover o equipamento da lista original
          this.equipment = this.equipment.filter(e => e.code !== equipmentId);

          // Atualizar a lista filtrada
          this.filteredEquipment = this.filteredEquipment.filter(e => e.code !== equipmentId);

          this.generalService.showDialog = false;
          this.itemToDelete = null;

          // Reaplicar a paginação para atualizar os itens exibidos
          this.totalItems = this.filteredEquipment.length;
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
          this.currentPage = 0; // Resetar para a primeira página
          this.updatePageNumbers();
          this.paginateFilteredItems(); // Atualiza os itens da nova página
        },
        error: (err) => {
          console.error('Erro ao excluir o equipamento', err);
        }
      });
    } else {
      console.warn('Nenhum equipamento selecionado para exclusão');
    }
  }
  
  cancelDelete() {
    this.generalService.showDialog = false; // Fecha o popup sem excluir
    this.itemToDelete = null; // Limpa a referência
  }
}

function saveAs(blob: Blob, fileName: string) {
  throw new Error('Function not implemented.');
}
