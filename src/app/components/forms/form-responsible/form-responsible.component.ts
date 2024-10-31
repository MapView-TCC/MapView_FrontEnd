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

  constructor(public generalService: GeneralService) {
    // Inicialize o FormGroup com os controles necessários
  }
  @Input() cadastroResponsavel!: FormGroup; //Recebe o form group da página incial

  ngOnInit(): void {
    console.log(this.cadastroResponsavel)

  }

  showForm: boolean = false;

  //Converte o tipo para passar apr o Dropdown
  convertToFormControl(absCtrl: AbstractControl | null): FormControl {
    const ctrl = absCtrl as FormControl;
    return ctrl;
  }

  //Definindo os valores do dropdown
  course = [
    { value: 'ADMINISTRACAO', label: 'Administração' },
    { value: 'DIGITAL_SOLUTIONS', label: 'Digital Solutions' },
    { value: 'MANUFATURA_DIGITAL', label: 'Manufatura Digital' },
    { value: 'MECATRONICA', label: 'Mecatrônica' }
  ]
}
