import { Component, EventEmitter, Output, Input } from '@angular/core';
import { TranslateModule, } from '@ngx-translate/core';
import { MatCommonModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { GeneralService } from '../../services/general/general.service';
import { Equipment } from '../../models/Equipment';

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [MatCommonModule, MatButtonModule, MatMenuModule, CommonModule, MatIconModule, TranslateModule],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.scss'
})


export class FiltrosComponent {
  showFilro: boolean = false;  // Controla exibição do filtro
  filtros = {
    owner: '',
    environment: '',
    validity: ''
  }; // Armazena os filtros selecionados
  activeButton: string = '';  // Botão ativo

  @Output() filtrosAplicados = new EventEmitter<any>(); // Evento para emitir os filtros aplicados



  constructor() { }

  aplicarFiltro() {
    console.log('filtroa a serem aplicados', this.filtros)
    this.filtrosAplicados.emit(this.filtros)
  }

  // Função para ativar o botão do filtro
  setActive(buttonName: string) {
    this.activeButton = buttonName;
  }



  toggleFiltro() {
    this.showFilro = !this.showFilro;
  }
}