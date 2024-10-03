import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageComponent } from '../../error-message/error-message.component';
import { DropdowLocalComponent } from '../../dropdow-local/dropdow-local.component';

@Component({
  selector: 'app-form-responsible',
  standalone: true,
  imports: [ErrorMessageComponent, CommonModule, ReactiveFormsModule, DropdowLocalComponent], 
  templateUrl: './form-responsible.component.html',
  styleUrl: './form-responsible.component.scss'
})
export class FormResponsibleComponent {
  @Input() cadastroResponsavel!: FormGroup; //Recebe o form group da página incial

  // responsaveis: Array<FormGroup> = [{}]; // Inicia com um responsável
  responsaveis: Array<any> = [{}]; // Inicia com um responsável
  showForm: boolean = false;

  //Converte o tipo para passar apr o Dropdown
  convertToFormControl(absCtrl: AbstractControl | null): FormControl {
    const ctrl = absCtrl as FormControl;
    return ctrl;
  }

  //Definindo os valores do dropdown
  course = [
    {value: 'ADMINISTRACAO', label: 'Administração'},
    {value: 'DIGITAL_SOLUTIONS', label: 'Digital Solutions'},
    {value: 'MANUFATURA_DIGITAL', label: 'Manufatura Digital'},
    {value: 'MECATRONICA', label: 'Mecatrônica'}
  ]


  // Função para adicionar um novo responsável
  addResponsavel() {
    this.showForm = true;

  }

  // Função para remover
  removeResponsavel() {
    this.showForm = false;
  }
}
