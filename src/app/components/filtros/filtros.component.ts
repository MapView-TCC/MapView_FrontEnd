import { Component, EventEmitter, Output, Input, HostListener, ChangeDetectorRef } from '@angular/core';
import { TranslateModule ,} from '@ngx-translate/core';
import { MatCommonModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import {MatButtonModule}from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { GeneralService } from '../../services/general/general.service';
import { Equipment } from '../../models/Equipment';

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [MatCommonModule,MatButtonModule,MatMenuModule,CommonModule,MatIconModule,TranslateModule],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.scss'
})


export class FiltrosComponent {
    // showFilro: boolean = false;  // Controla exibição do filtro
    filtros = {
      owner: '',
      environment: '',
      validity: ''
    }; // Armazena os filtros selecionados
    activeButton: string = '';  // Botão ativo

  @Output() filtrosAplicados = new EventEmitter<any>(); // Evento para emitir os filtros aplicados
  @Input() showFiltro: boolean = false; // Recebe o valor do componente pai


  constructor(private cd: ChangeDetectorRef) {}

  aplicarFiltro(){
    console.log('filtroa a serem aplicados', this.filtros)
    this.filtrosAplicados.emit(this.filtros)
  }

  // Função para ativar o botão do filtro
  setActive(buttonName: string) {
    this.activeButton = buttonName;
  }

 

  toggleFiltro() {
    this.showFiltro = !this.showFiltro;
  }
  // Detecta cliques fora do componente
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    // Verifica se o clique foi fora do componente
    const isClickInside = targetElement.closest('.card') !== null || targetElement.closest('button') !== null;;

    console.log('click dentro', isClickInside)

    if (!isClickInside) {
      console.log('Ocultando filtro. showFilro antes:', this.showFiltro);
      this.showFiltro = false; // Oculta o filtro
      this.cd.detectChanges(); // Força a atualização do template
    }
  }
}