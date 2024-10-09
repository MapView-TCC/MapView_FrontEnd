import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { GeneralService } from '../../services/general/general.service';

@Component({
  selector: 'app-dropdow-local',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TranslateModule],
  templateUrl: './dropdow-local.component.html',
  styleUrl: './dropdow-local.component.scss'
})
export class DropdowLocalComponent {

  //Para a tradução
  constructor(public generalService: GeneralService) {}

  //Parametros do dropdown
  @Input() id: string = '';
  @Input() options: {value: number | string; label: string}[] = [];
  @Input() selectedValue: string = '';
  @Input() table: string = '';
  @Input() control!: FormControl;

  @Output() selectedValueChange: EventEmitter<string> = new EventEmitter<string>(); 

  //Método para emitir a seleção do dropdown
  onSelectionChange() {
    console.log(this.control.value)
    this.selectedValue = this.control.value;
    this.selectedValueChange.emit(this.control.value); 
  }
}
