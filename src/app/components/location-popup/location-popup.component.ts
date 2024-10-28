import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DropdowDynamicComponent } from '../dropdown-dynamic/dropdow-dynamic.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { BuildingDrpService } from '../../services/dropdow-building/building-drp.service';
import { GeneralService } from '../../services/general/general.service';
import { EnvironmentService } from '../../services/location_popup/environment.service';
import { AreaDrpService } from '../../services/dropdow-area/area-drp.service';
import { Building } from '../../models/Building';
import { Area } from '../../models/Area';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { LocationRegister } from '../../models/Location';

@Component({
  selector: 'app-location-popup',
  standalone: true,
  imports: [CommonModule, MatIconModule, DropdowDynamicComponent, ErrorMessageComponent, ReactiveFormsModule, TranslateModule],
  templateUrl: './location-popup.component.html',
  styleUrls: ['./location-popup.component.scss']
})
export class LocationPopupComponent implements OnInit {
  cadastroNovoLocalizacao: FormGroup;
  buildingOptions: { value: number, label: string }[] = [];
  areaOptions: { value: number, label: string }[] = [];

  @Output() refreshData = new EventEmitter<void>();


  constructor(
    private fb: FormBuilder,
    private buildingDrp: BuildingDrpService,
    private areaDrp: AreaDrpService,
    public generalService: GeneralService,
    private environmentService: EnvironmentService,
    private snackBar: MatSnackBar
  ) {

    this.cadastroNovoLocalizacao = this.fb.group({
      id_building: [{ value: '', disabled: false }, Validators.required],
      environment_name: new FormControl({ value: '', disabled: false }, Validators.required),
      id_area: new FormControl('', Validators.required),
      raspberry_name: ['', [Validators.required, Validators.minLength(2)]],
    });
  }


  //Converte o tipo para passar apr o Dropdown
  convertToFormControl(absCtrl: AbstractControl | null): FormControl {
    const ctrl = absCtrl as FormControl;
    return ctrl;
  }


  // Função que pega os valores da tabela Bulding
  loadBuildings() {
    this.buildingDrp.getBulding().subscribe((buildings: Building[]) => {
      buildings.map(data => (this.buildingOptions.push({
        value: data.id_building,
        label: data.building_code
      })))
    })
  }


  // Função que pega os valores da tabela Area
  loadAreas() {
    this.areaDrp.getArea().subscribe((areas: Area[]) => {
      areas.map(data => (this.areaOptions.push({
        value: data.id_area,
        label: data.area_code
      })))
    })
  }


  ngOnInit(): void {
    this.loadBuildings();
    this.loadAreas();
  }



  onSubmit() {
    if (this.cadastroNovoLocalizacao.valid) {

      const enviromentData = new LocationRegister();

      enviromentData.id_building = Number(this.cadastroNovoLocalizacao.get('id_building')?.value || 0);
      enviromentData.id_area = Number(this.cadastroNovoLocalizacao.get('id_area')?.value || 0);
      enviromentData.raspberry_name = this.cadastroNovoLocalizacao.get('raspberry_name')?.value || '';
      enviromentData.environment_name = this.cadastroNovoLocalizacao.get('environment_name')?.value || '';


      console.log('Dados formatados para o envio:', JSON.stringify(enviromentData));
      // Verifique os dados aqui

      this.environmentService.postEnvironment(1, enviromentData).subscribe(
        {
          next: (response) => {
            console.log('Cadastro enviado com sucesso!:', response);
            console.log(enviromentData);
            this.refreshData.emit();
            setTimeout(() => {
              this.generalService.showLocationlog = false
            }, 2000);

          },
          error: (error) => {
            // Este bloco captura erros de conexão ou de resposta HTTP
            console.error('Erro ao realizar o cadastro', error);
            this.showErrorAlert('Não foi possível realizar o cadastro.');
            // this.showErrorAlert('Não foi possível realizar o cadastro.');

          },
          complete: () => {
            this.showSuccessAlert('Cadastro realizado com sucesso.');
            console.log('Envio de registro concluído.');
          }
        }

      );
    } else {
      console.log('Formulário inválido');
    }
  }
  //Método para a mensagem de erro de cadastro
  showErrorAlert(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: ['alert-error']
    });
  }
  //Método para a mensagem de SUCESSO de cadastro
  showSuccessAlert(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: ['alert-success']
    });
  }


}
