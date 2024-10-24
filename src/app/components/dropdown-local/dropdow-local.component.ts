import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { GeneralService } from '../../services/general/general.service';
import { VizualizacaoFormComponent } from '../vizualizacao-form/vizualizacao-form.component';

@Component({
  selector: 'app-dropdow-local',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TranslateModule, FormsModule, VizualizacaoFormComponent],
  templateUrl: './dropdow-local.component.html',
  styleUrl: './dropdow-local.component.scss'
})
export class DropdowLocalComponent {

  //Para a tradução
  constructor(public generalService: GeneralService) {}

  //Parametros do dropdown
  @Input() id: string = '';
  @Input() options: {value: number | string; label: string}[] = [];
  @Input() selectedValue!: string | null;
  @Input() table: string = '';
  @Input() control!: FormControl;
  @Input() disabled: boolean = false;

  // @Output() selectedValueChange: EventEmitter<string> = new EventEmitter<string>(); 
  
  // ngOnInit() {
  //   console.log(this.control.value);
  //   this.selectedValue = this.control.value;
  // }

  // //Método para emitir a seleção do dropdown
  // onSelectionChange() {
  //   this.selectedValue = this.control.value;
  //   this.selectedValueChange.emit(this.control.value); 
  // }

  
}
