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
export class DrpApiComponent{

  @Input() options: { value: number | string, label: string }[] = [];
  @Input() selectedValue: string = '';
  @Input() table: string = '';
  @Input() control!: FormControl;
  @Input() generalService!: GeneralService;
  @Input() disabled: boolean = false;

  @Output() selectedValueChanges = new EventEmitter<number | string>();

  ngOnInit() {
    this.selectedValue = this.control.value; // Inicializa selectedValue com o valor do control
  }

  onSelect() {
    console.log(this.selectedValue);
    this.selectedValue = this.control.value; // Atualiza selectedValue com o valor selecionado
    this.selectedValueChanges.emit(this.control.value)
    //this.control.setValue(value); // Atualiza o control do formulário também
  }
}