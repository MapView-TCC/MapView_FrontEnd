import { Component, Input } from '@angular/core';
import { ErrorMessageComponent } from '../../error-message/error-message.component';
import { DrpApiComponent } from '../../drp-api/drp-api.component';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EnviromentDrpService } from '../../../services/dropdow-enviroment/enviroment-drp.service';
import { Enviroment } from '../../../models/Enviroment';
import { GeneralService } from '../../../services/general/general.service';
import { ExcluirPopupComponent } from '../../excluir-popup/excluir-popup.component';
import { CommonModule } from '@angular/common';
import { LocationPopupComponent } from "../../location-popup/location-popup.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-form-location',
  standalone: true,
  imports: [ErrorMessageComponent, DrpApiComponent, ReactiveFormsModule, ExcluirPopupComponent, CommonModule, LocationPopupComponent, TranslateModule],
  templateUrl: './form-location.component.html',
  styleUrl: './form-location.component.scss'
})
export class FormLocationComponent {
  constructor(private environmentDrop: EnviromentDrpService, public generalService: GeneralService) {
    // Inicialize o FormGroup com os controles necessários
  }

  @Input() cadastroLocalizacao!: FormGroup; //Recebe o form group da página incial


  environmentOptions: { value: number, label: string }[] = [];

  //Converte o tipo para passar apr o Dropdown
  convertToFormControl(absCtrl: AbstractControl | null): FormControl {
    const ctrl = absCtrl as FormControl;
    return ctrl;
  }


  // Função que pega os valores da tabela Evironment
  loadEnvironments() {
    this.environmentOptions = [];
    console.log(this.environmentOptions)
    this.environmentDrop.getEnviroment().subscribe((enviroments: Enviroment[]) => {
      enviroments.map(data => (this.environmentOptions.push({
        value: data.id_environment,
        label: data.environment_name
      })))
    })
  }

  ngOnInit(): void {
    this.loadEnvironments()
  }
}
