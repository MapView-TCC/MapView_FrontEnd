import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExcluirPopupComponent } from '../excluir-popup/excluir-popup.component';
import { GeneralService } from '../../services/general/general.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dropdow-dynamic',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ExcluirPopupComponent, TranslateModule],
  templateUrl: './dropdow-dynamic.component.html',
  styleUrl: './dropdow-dynamic.component.scss'
})
export class DropdowDynamicComponent{

  @Input() options: { value: number | string, label: string }[] = [];
  @Input() selectedValue: string = '';
  @Input() table: string = '';
  @Input() control!: FormControl;
  @Input() generalService!: GeneralService;
  @Input() disabled: boolean = false;

  // @Output() selectedValueChange = new EventEmitter<number | string>();

  //Método para emitir a seleção do dropdown
  // onSelect() {
  //   console.log(this.control.value)
  //   this.selectedValue = this.control.value;
  //   this.selectedValueChange.emit(this.control.value);
  // }


}