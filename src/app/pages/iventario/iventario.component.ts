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
  pageNumbers: number[] = [];
  currentPage: number = 0; // Página atual
  itemsPerPage: number = 10; // Itens por página
  totalItems: number = 0; // Total de itens dinâmico
  totalPages: number = 0; // Total de páginas

  constructor(public generalService: GeneralService, private inventarioService: InventarioService  ,private excelService: ExcelService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.inventarioService.getEquipments(this.currentPage, this.itemsPerPage).subscribe(
      (data: Equipment[]) => {
        if (data) {
          // Verifique se os dados estão vazios
          if (data.length === 0) {
            console.log('Nenhum item encontrado. Você está na última página.');
            return; // Não faça nada se não houver mais itens
          }
  
          this.equipment = data; // Itens da página atual
        } else {
          // Se não houver dados, também indicamos que não há mais itens
          console.log('Nenhum item encontrado. Você está na última página.');
          return; 
        }
  
        // Aqui devemos fazer a chamada para obter o total de itens
        this.updateTotalItems();
      },
      (error) => {
        console.error('Erro ao carregar itens:', error);
      }
    );
  }
  
  // Método para atualizar o total de itens
  updateTotalItems() {
    this.inventarioService.getEquipments(0, 1000).subscribe( // Ajuste o número para obter todos os itens de uma vez, se necessário
      (data: Equipment[]) => {
        this.totalItems = data.length; // Total de itens retornados
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage); // Calcule o total de páginas
        this.updatePageNumbers(); // Atualiza os números das páginas
      },
      (error) => {
        console.error('Erro ao obter o total de itens:', error);
      }
    );
  }
  
  // Método para atualizar os números das páginas
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
  
  // Atualize a lógica ao mudar de página
  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadItems(); // Carregar itens da nova página
    }
  }
  
  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadItems(); // Carregar itens da página anterior
    }
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
      (error) => {
        console.error('Erro ao exportar para Excel:', error);
      }
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
