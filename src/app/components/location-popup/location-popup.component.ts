import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DropdowDynamicComponent } from '../dropdow-dynamic/dropdow-dynamic.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { BuildingDrpService } from '../../services/dropdow-building/building-drp.service';
import { GeneralService } from '../../services/general/general.service';
import { EnvironmentService } from '../../services/location_popup/environment.service';
import { Forms_Register } from '../../models/Forms_Register';
import { AreaDrpService } from '../../services/dropdow-area/area-drp.service';
import { Building } from '../../models/Building';
import { Area } from '../../models/Area';
// import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-location-popup',
  standalone: true,
  imports: [CommonModule, MatIconModule, DropdowDynamicComponent, ErrorMessageComponent, ReactiveFormsModule],
  templateUrl: './location-popup.component.html',
  styleUrls: ['./location-popup.component.scss']
})
export class LocationPopupComponent implements OnInit {
  cadastroNovoLocalizacao: FormGroup;
  buildingOptions: { value: number, label: string }[] = [];
  areaOptions: { value: number, label: string }[] = []; 

  
  constructor(
    private fb: FormBuilder,
    private buildingDrp: BuildingDrpService,
    private areaDrp: AreaDrpService,
    public generalService: GeneralService,
    private environmentService: EnvironmentService
  ) {

    this.cadastroNovoLocalizacao = this.fb.group({
      id_building: [{ value: '', disabled: false }, Validators.required],
      environment_name: new FormControl({value: '', disabled: false }, Validators.required),
      id_area: new FormControl( '', Validators.required), 
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
      


        const enviromentData = new Forms_Register();

        enviromentData.id_building = Number(this.cadastroNovoLocalizacao.get('id_building')?.value || 0) ;
        enviromentData.id_area =  Number(this.cadastroNovoLocalizacao.get('id_area')?.value || 0);
        enviromentData.raspberry_name = this.cadastroNovoLocalizacao.get('raspberry_name')?.value || '';
        enviromentData.environment_name = this.cadastroNovoLocalizacao.get('environment_name')?.value || '';

   
        console.log('Dados formatados para o envio:', JSON.stringify(enviromentData));
// Verifique os dados aqui

        this.environmentService.postEnvironment(1, enviromentData).subscribe(
          {
            next:(response) =>{
              console.log('Cadastro enviado com sucesso!:', response);
              console.log(enviromentData);
            
            },
            error:(erro) => {
              console.error('Erro ao realiozar o cadastro',erro);
              console.log(erro)
            }
          }
            
        );
    } else {
        console.log('Formulário inválido');
    }
}


}
