import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { GeneralService } from '../../../services/general/general.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-drp-api',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TranslateModule],
  templateUrl: './drp-api.component.html',
  styleUrl: './drp-api.component.scss'
})
export class DrpApiComponent {

  @Input() options: { value: number | string, label: string }[] = []; // Opções para o dropdown, recebidas do componente pai 
  @Input() selectedValue: string = ''; // Valor selecionado no componente pai(FormControl)
  @Input() table: string = ''; // Nome da tabela, usado para condições específicas no template
  @Input() control!: FormControl; // FormControl recebido do componente pai
  @Input() generalService!: GeneralService; // Serviço general para acesso a métodos e propriedades globais
  @Input() disabled: boolean = false; // Define se o dropdown está desabilitado

  @Output() selectedValueChanges = new EventEmitter<number | string>(); // Emite o valor selecionado para o componente pai quando há uma mudança

  // Inicializa selectedValue com o valor do control
  ngOnInit() {
    this.selectedValue = this.control.value;
  }

  // Método chamado ao selecionar uma nova opção
  onSelect() {
    console.log(this.selectedValue);
    this.selectedValue = this.control.value; // Atualiza selectedValue com o valor selecionado
    this.selectedValueChanges.emit(this.control.value)
  }
}
