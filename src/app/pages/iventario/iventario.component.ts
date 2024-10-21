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
import { ExcelService } from '../../services/excel/excel.service';
import { FooterComponent } from "../../components/footer/footer.component";
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-iventario',
  standalone: true,
  imports: [HeaderComponent, ExcluirPopupComponent, CommonModule, VizualizacaoFormComponent, LocationPopupComponent, FiltrosComponent, FilterPopupComponent, FooterComponent,MatIconModule],
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
  

  pageNumbers: number[] = [];
  currentPage: number = 0; // Página atual
  itemsPerPage: number = 10; // Itens por página
  totalItems: number = 0; // Total de itens dinâmico
  totalPages: number = 0; // Total de páginas
  lastFiltrosAplicados: any;
  currentPageItems: Equipment[] = []; 


  constructor(public generalService: GeneralService, private inventarioService: InventarioService  ,private excelService: ExcelService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.inventarioService.getEquipments().subscribe(data => {
      this.equipment = data;
      console.log("equipamentos carregados",this.equipment)

      this.filteredEquipment = data; // Inicialmente sem filtros
      this.totalItems = this.filteredEquipment.length;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.updatePageNumbers();
      this.paginateFilteredItems(); // Inicializa a primeira página
    });
  }

  updatePageNumbers() {
    this.pageNumbers = [];
    const maxPagesToShow = 3; // Número máximo de páginas para exibir
    const startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);
  
    console.log(`Atualizando números de página. Páginas de: ${startPage} até: ${endPage}`);
  
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
    this.filteredEquipment = this.equipment.filter(eq => {
      const yearFromValidity = new Date(eq.validity).getUTCFullYear();
      const matchValidity = filtros.validity === '' || yearFromValidity === Number(filtros.validity);
      const matchEnvironment = filtros.environment === '' || eq.location.environment.id_environment === Number(filtros.environment);
      const matchOwner = filtros.owner === '' || eq.owner.id_owner === filtros.owner;
      return matchEnvironment && matchValidity && matchOwner;
    });
  
    this.totalItems = this.filteredEquipment.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.currentPage = 0;
    this.updatePageNumbers();
    this.paginateFilteredItems(); // Reaplica a paginação nos itens filtrados
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
      const equipmentId = this.itemToDelete.id_equipment; // ID como string
      this.inventarioService.deleteEquipment(equipmentId).subscribe({
        next: () => {
          this.equipment = this.equipment.filter(e => e.id_equipment !== equipmentId);
          this.generalService.showDialog = false;
          this.itemToDelete = null;
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
