import { Component, Input } from '@angular/core';
import { ErrorMessageComponent } from '../../error-message/error-message.component';
import { DropdowDynamicComponent } from '../../dropdow-dynamic/dropdow-dynamic.component';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BuildingDrpService } from '../../../services/dropdow-building/building-drp.service';
import { EnviromentDrpService } from '../../../services/dropdow-enviroment/enviroment-drp.service';
import { AreaDrpService } from '../../../services/dropdow-area/area-drp.service';
import { BuildingDrp } from '../../../models/BuldingDrp';
import { Enviroment } from '../../../models/Enviroment';
import { Area } from '../../../models/Area';
import { Building } from '../../../models/Building';
import { GeneralService } from '../../../services/general/general.service';
import { ExcluirPopupComponent } from '../../excluir-popup/excluir-popup.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-location',
  standalone: true,
  imports: [ErrorMessageComponent, DropdowDynamicComponent, ReactiveFormsModule, ExcluirPopupComponent, CommonModule],
  templateUrl: './form-location.component.html',
  styleUrl: './form-location.component.scss'
})
export class FormLocationComponent {
  constructor(private buldingDrp: BuildingDrpService, private environmentDrop: EnviromentDrpService, private areaDrp: AreaDrpService, public generalService: GeneralService) {
    // Inicialize o FormGroup com os controles necessários
  }

  @Input() cadastroLocalizacao!: FormGroup; //Recebe o form group da página incial

  buildingOptions: { value: number, label: string }[] = [];
  environmentOptions: { value: number, label: string }[] = [];
  areaOptions: { value: number, label: string }[] = [];

  //Converte o tipo para passar apr o Dropdown
  convertToFormControl(absCtrl: AbstractControl | null): FormControl {
    const ctrl = absCtrl as FormControl;
    return ctrl;
  }

  
  // Função que pega os valores da tabela Bulding 
  loadBuildings() {
    this.buldingDrp.getBulding().subscribe((buildings: Building[]) => {
       buildings.map(data => (this.buildingOptions.push({
        value: data.id_building,
        label: data.building_code
      })))
    })
  }

  loadEnvironments() {
    this.environmentDrop.getEnviroment().subscribe((enviroments: Enviroment[]) => {
      enviroments.map(data => (this.environmentOptions.push({
        value: data.id_environment,
        label: data.environment_name
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
    this.loadEnvironments()
    this.loadAreas()
    this.loadBuildings()
  }
}
