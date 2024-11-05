import { Component, Input} from '@angular/core';
import { ErrorMessageComponent } from '../../error-message/error-message.component';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GeneralService } from '../../../services/general/general.service';
import { TranslateModule } from '@ngx-translate/core';
import { DrpStaticComponent } from "../../inputs/drp-static/drp-static.component";

@Component({
  selector: 'app-form-equipament',
  standalone: true,
  imports: [ErrorMessageComponent, ReactiveFormsModule, TranslateModule, DrpStaticComponent],
  templateUrl: './form-equipament.component.html',
  styleUrl: './form-equipament.component.scss'
})
export class FormEquipamentComponent {

  constructor(public generalService: GeneralService) { } // Injeta o serviço geral

  @Input() cadastroEquipamento!: FormGroup; //Recebe o formgroup para cadastro do equipamento

  //Converte um AbstractControl para FormControl para facilitar o uso no dropdown
  convertToFormControl(absCtrl: AbstractControl | null): FormControl {
    const ctrl = absCtrl as FormControl;
    return ctrl;
  }


  // Opções para o dropdown de tipo de equipamento
  typeEquipamentOptions = [
    { value: 'Desktop', label: 'Desktop' },
    { value: 'Notebook', label: 'Notebook' },
    { value: 'Outro', label: 'Outro' }
  ]

  // Opções para o dropdown de modelos de equipamento
  enumModelEquipment = [
    { value: 'DESKTOP_TINK', label: 'Desktop Tink' },
    { value: 'NOTEBOOK_STANDARD', label: 'Notebook Standard' },
    { value: 'DESKTOP_EXTERNO', label: 'Desktop Externo' },
    { value: 'NOTEBOOK_ENHANCED', label: 'Notebook Enhanced' }
  ]

}
