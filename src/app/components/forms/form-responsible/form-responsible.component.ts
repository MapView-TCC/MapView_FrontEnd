import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageComponent } from '../../error-message/error-message.component';
import { GeneralService } from '../../../services/general/general.service';
import { TranslateModule } from '@ngx-translate/core';
import { DrpStaticComponent } from "../../inputs/drp-static/drp-static.component";

@Component({
  selector: 'app-form-responsible',
  standalone: true,
  imports: [ErrorMessageComponent, CommonModule, ReactiveFormsModule, TranslateModule, DrpStaticComponent],
  templateUrl: './form-responsible.component.html',
  styleUrl: './form-responsible.component.scss'
})
export class FormResponsibleComponent implements OnInit {

  // Serviço geral injetado no construtor
  constructor(public generalService: GeneralService) {
  }

  @Input() cadastroResponsavel!: FormGroup; //Recebe o form group do componente pai

  showForm: boolean = false;  // Controla a exibição do formulário

  // Método chamado ao inicializar o componente
  ngOnInit(): void {
    console.log(this.cadastroResponsavel)

  }


  // Converte AbstractControl em FormControl
  convertToFormControl(absCtrl: AbstractControl | null): FormControl {
    const ctrl = absCtrl as FormControl;
    return ctrl;
  }

  // Definindo os valores do dropdown para cursos(É um campo enum no banco)
  course = [
    { value: 'ADMINISTRACAO', label: 'Administração' },
    { value: 'DIGITAL_SOLUTIONS', label: 'Digital Solutions' },
    { value: 'MANUFATURA_DIGITAL', label: 'Manufatura Digital' },
    { value: 'MECATRONICA', label: 'Mecatrônica' }
  ]
}
