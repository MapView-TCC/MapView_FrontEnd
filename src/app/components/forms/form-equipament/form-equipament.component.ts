import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ErrorMessageComponent } from '../../error-message/error-message.component';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DropdowLocalComponent } from '../../dropdow-local/dropdow-local.component';

@Component({
  selector: 'app-form-equipament',
  standalone: true,
  imports: [ErrorMessageComponent, DropdowLocalComponent, ReactiveFormsModule],
  templateUrl: './form-equipament.component.html',
  styleUrl: './form-equipament.component.scss'
})
export class FormEquipamentComponent {

  @Input() cadastroEquipamento!: FormGroup; //Recebe o form group da página incial

  //Converte o tipo para passar apr o Dropdown
  convertToFormControl(absCtrl: AbstractControl | null): FormControl {
    const ctrl = absCtrl as FormControl;
    return ctrl;
  }
  

  //Definindo conteúdo do Dropdown
  typeEquipamentOptions = [
    {value: 'Desktop', label: 'Desktop'},
    {value: 'Notebook', label: 'Notebook'},
    {value: 'Outro', label: 'Outro'}
  ]
    
}
