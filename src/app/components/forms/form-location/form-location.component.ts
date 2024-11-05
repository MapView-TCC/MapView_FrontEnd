import { Component, Input } from '@angular/core';
import { ErrorMessageComponent } from '../../error-message/error-message.component';
import { DrpApiComponent } from '../../inputs/drp-api/drp-api.component';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GeneralService } from '../../../services/general/general.service';
import { CommonModule } from '@angular/common';
import { LocationFormPopupComponent } from "../../popup/location-form-popup/location-form-popup.component";
import { TranslateModule } from '@ngx-translate/core';
import { EnvironmentService } from '../../../services/environment/environment.service';
import { Enviroment } from '../../../models/Enviroment';

@Component({
  selector: 'app-form-location',
  standalone: true,
  imports: [ErrorMessageComponent, DrpApiComponent, ReactiveFormsModule, CommonModule, TranslateModule, LocationFormPopupComponent],
  templateUrl: './form-location.component.html',
  styleUrl: './form-location.component.scss'
})
export class FormLocationComponent {
  //Construtor para injetar os serviços necessários
  constructor(private environmentDropService: EnvironmentService, public generalService: GeneralService) {
    
  }

  @Input() cadastroLocalizacao!: FormGroup; //Recebe o form group da página incial

  // Opções para o dropdown de ambientes
  environmentOptions: { value: number, label: string }[] = [];

  //Converte o controle abstrato para FormControl
  convertToFormControl(absCtrl: AbstractControl | null): FormControl {
    const ctrl = absCtrl as FormControl;
    return ctrl;
  }

  // Função para carregar os valores da tabela Environment
  loadEnvironments() {
    this.environmentOptions = [];
    console.log(this.environmentOptions)
    this.environmentDropService.getEnviroment().subscribe((enviroments: Enviroment[]) => {
      enviroments.map(data => (this.environmentOptions.push({
        value: data.id_environment,
        label: data.environment_name
      })))
    })
  }

  // Método de inicialização do componente
  ngOnInit(): void {
    this.loadEnvironments()
  }
}
