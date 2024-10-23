import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AbstractControl, FormControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { GeneralService } from '../../services/general/general.service';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { DropdowLocalComponent } from '../dropdown-local/dropdow-local.component';
import { Building } from '../../models/Building';
import { Enviroment } from '../../models/Enviroment';
import { Area } from '../../models/Area';
import { DropdowDynamicComponent } from '../dropdown-dynamic/dropdow-dynamic.component';
import { LocationPopupComponent } from '../location-popup/location-popup.component';
import { ResponsibleByIDService } from '../../services/responsiblesById/responsible-by-id.service';
import { EquipmentByIDService } from '../../services/equipmentsById/equipment-by-id.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BuildingDrpService } from '../../services/dropdow-building/building-drp.service';
import { EnviromentDrpService } from '../../services/dropdow-enviroment/enviroment-drp.service';
import { AreaDrpService } from '../../services/dropdow-area/area-drp.service';
import {Responsible} from '../../models/DataResponsible';
import e from 'express';

@Component({
  selector: 'app-vizualizacao-form',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
    ErrorMessageComponent,
    DropdowLocalComponent,
    DropdowDynamicComponent,
    LocationPopupComponent,
  ],
  templateUrl: './vizualizacao-form.component.html',
  styleUrls: ['./vizualizacao-form.component.scss'],
})
export class VizualizacaoFormComponent implements OnInit {

  @Input() equipmentId!: string;

  disabled: boolean = true;
  isEditing = false;
  buldingDrp: any;
  environmentDrop: any;
  areaDrp: any;

  showForm: boolean = false;




  buildingOptions: { value: number, label: string }[] = [];
  environmentOptions: { value: number, label: string }[] = [];
  areaOptions: { value: number, label: string }[] = [];


  // Definindo conteúdo do Dropdown
  typeEquipamentOptions = [
    { value: 'Desktop', label: 'Desktop' },
    { value: 'Laptop', label: 'Notebook' },
    { value: 'Outro', label: 'Outro' }
  ];

  // Definindo conteúdo do Dropdown
  enumModelEquipment = [
    { value: 'DESKTOP_TINK', label: 'Desktop Tink' },
    { value: 'NOTEBOOK_STANDARD', label: 'Notebook Standard' },
    { value: 'DESKTOP_EXTERNO', label: 'Desktop Externo' },
    { value: 'NOTEBOOK_ENHANCED', label: 'Notebook Enhanced' }
  ];

  // Definindo os valores do dropdown
  course = [
    { value: 'ADMINISTRACAO', label: 'Administração' },
    { value: 'DIGITAL_SOLUTIONS', label: 'Digital Solutions' },
    { value: 'MANUFATURA_DIGITAL', label: 'Manufatura Digital' },
    { value: 'MECATRONICA', label: 'Mecatrônica' }
  ];



  //Converte o tipo para passar apr o Dropdown
  convertToFormControl(absCtrl: AbstractControl | null): FormControl {
    const ctrl = absCtrl as FormControl;
    return ctrl;
  }

  


  constructor(
    private fb: FormBuilder,
    public generalService: GeneralService,
    private responsibleService: ResponsibleByIDService,
    private equipmentService: EquipmentByIDService,
    private buildingDrpService: BuildingDrpService,
    private enviromentDrpService: EnviromentDrpService,
    private areaDrpService: AreaDrpService,
  ) { }

  vizualizarCadastro = this.fb.group({
    id_equipment: [{ value: '', disabled: false }, [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
    name_equipment: [{ value: '', disabled: false }, [Validators.required, Validators.minLength(4)]],
    rfid: [{ value: 0, disabled: false }, [Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern('^[0-9]*$')]],
    type: [{ value: '', disabled: true }, [Validators.required]],
    model: [{ value: '', disabled: true }, [Validators.required]],
    id_owner: [{ value: '', disabled: false }, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
    constcenter: [{ value: '', disabled: false }, [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('^[0-9]*$')]], // Aceita apenas dígitos 0-9
    validity: [{ value: '', disabled: false }, [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
    admin_rights: [{ value: '', disabled: false }, [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
    observation: [{ value: '', disabled: false }, []],//ok
    id_building: [{ value: 0, disabled: true }, Validators.required],
    id_environment: [{ value: 0, disabled: true }, Validators.required],
    id_area: [{ value: 0, disabled: true }, Validators.required],
    id_post: [{ value: '', disabled: false }, [Validators.required, Validators.minLength(2), Validators.pattern('^[0-9]*$')]],
    responsaveis: this.fb.array([])
  });

  ngOnInit(): void {
    console.log('LOADEI O COMPONENTE AQUI SEU MERDA!')
    const userLogId = 1; 
    this.loadBuildings();
    this.loadEnvironments();
    this.loadAreas();
    this.loadData(this.equipmentId, userLogId);
  }
  // Função que pega os valores da tabela Building 
  loadBuildings() {
    this.buildingDrpService.getBulding().subscribe((buildings: Building[]) => {
      console.log(buildings)
      buildings.map(data => this.buildingOptions.push({
        value: data.id_building,
        label: data.building_code
      }));
    });
    console.log(this.buildingOptions)
  }

  // Função que pega os valores da tabela Environment
  loadEnvironments() {
    this.enviromentDrpService.getEnviroment().subscribe((environments: Enviroment[]) => {
      environments.map(data => this.environmentOptions.push({
        value: data.id_environment,
        label: data.environment_name
      }));
    });
  }

  // Função que pega os valores da tabela Area
  loadAreas() {
    this.areaDrpService.getArea().subscribe((areas: Area[]) => {
      areas.map(data => this.areaOptions.push({
        value: data.id_area,
        label: data.area_code
      }));
    });
  }
  


  loadData(equipmentId: string, userLogId: number) {
    console.log('socorro desgraça!')
    this.responsibleService.getResponsiblesByEquipment(0, 100, equipmentId).subscribe({
      next: (equipResponsible) => {
        //console.log('Equipamento:', equipResponsible); // Verifique os dados aqui
        //console.log('SOCORRO PRFV', equipResponsible[0].equipment.idEquipment);
        //this.vizualizarCadastro.patchValue(equipResponsible[0].equipment);
        this.vizualizarCadastro.controls.id_equipment.setValue(equipResponsible.id_equipment);
        this.vizualizarCadastro.controls.name_equipment.setValue(equipResponsible.name_equipment);
        this.vizualizarCadastro.controls.rfid.setValue(equipResponsible.rfid);
        this.vizualizarCadastro.controls.type.setValue(equipResponsible.type);
        this.vizualizarCadastro.controls.model.setValue(equipResponsible.model);
        this.vizualizarCadastro.controls.id_owner.setValue(equipResponsible.owner.id_owner);
        this.vizualizarCadastro.controls.validity.setValue(equipResponsible.validity);
        this.vizualizarCadastro.controls.admin_rights.setValue(equipResponsible.admin_rights);
        this.vizualizarCadastro.controls.observation.setValue(equipResponsible.observation);
        this.vizualizarCadastro.controls.constcenter.setValue(equipResponsible.owner.costCenter.constcenter);
        this.vizualizarCadastro.controls.id_building.setValue(equipResponsible.location.environment.raspberry.building.id_building);
        this.vizualizarCadastro.controls.id_environment.setValue(equipResponsible.location.environment.id_environment);
        this.vizualizarCadastro.controls.id_post.setValue(equipResponsible.location.post.post);
        this.vizualizarCadastro.controls.id_area.setValue(equipResponsible.location.environment.raspberry.area.id_area);
        
        const responsaveisArray = this.vizualizarCadastro.get('responsaveis') as FormArray;
        responsaveisArray.clear(); // Limpa o FormArray antes de adicionar novos responsáveis
   
       
        equipResponsible.responsibles.forEach((responsavel: Responsible) => {
          console.log('=+=+=+=++=======++++');
          console.log('Responsável:', responsavel);
          console.log('Nome:', responsavel.responsible);
          console.log('EDV:', responsavel.classes.classes);
       
          console.log('=+=+=+=++=======++++');
            const responsavelForm = this.fb.group({
                responsible: [{ value: responsavel.responsible, disabled: false }, [Validators.required, Validators.minLength(3)]],
                edv: [{ value: responsavel.edv, disabled: false }, [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]*$')]],
                enumCourse: [{ value: responsavel.classes.enumCourse, disabled: true }, [Validators.required]],
                classes: [{ value: responsavel.classes.classes, disabled: false }, [Validators.required, Validators.minLength(2), Validators.pattern('^[0-9]*$')]],
            });

            // Adiciona o FormGroup ao FormArray
            responsaveisArray.push(responsavelForm); // Adiciona o FormGroup ao FormArray
});
        
      
      
      

        // this.addResponsavel(equipResponsible[0].responsible);
        // const lastIndex = this.vizualizarCadastro.controls.responsaveis.length - 1;
        // this.vizualizarCadastro.controls.responsaveis.at(lastIndex).patchValue(this.responsibleService);

        console.log('SOCORRO PELO PAI DO GUARDA', this.vizualizarCadastro)
        console.log('VAI TOMAR NO MEIO DO ', this.returnFormArray.controls.values);
      },
      error: err => console.error('Erro ao carregar equipamento:', err)
    },
    );
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    console.log('Is Editing:', this.isEditing);
  
    if (this.isEditing) {
      this.vizualizarCadastro.enable(); // Habilita todos os controles do formulário
    } else {
      this.vizualizarCadastro.disable(); // Desabilita todos os controles do formulário
    }
  
    console.log('Is Editing:', this.isEditing); // Verifique o valor aqui
  }
  

  save() {
    // lógica para salvar os dados
    console.log(this.vizualizarCadastro.value); // Exemplo de onde você pode processar os dados
    this.toggleEdit();
  }

  cancel() {
    this.toggleEdit();
    // Lógica para fechar o modal
    // Exemplo:
    this.generalService.showFormlog = false; // Fechar o modal
  }

    //Form Array de FormGroup de Responsável
  get returnFormArray(): FormArray {
    return this.vizualizarCadastro.get('responsaveis') as FormArray;
  }



  addResponsavel(data: Responsible) {
    const responsavelForm = this.fb.group({
      responsible: [{ value: data.responsible, disabled: false }, [Validators.required, Validators.minLength(3)]],
      edv: [{ value: data.edv, disabled: false }, [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]*$')]],
      enumCourse: [{ value: data.classes.enumCourse, disabled: true }, [Validators.required]],
      classes: [{ value: data.classes.classes, disabled: false }, [Validators.required, Validators.minLength(2), Validators.pattern('^[0-9]*$')]],
    });

    this.returnFormArray.push(responsavelForm);
  }

  removeResponsavel(index: number) {
    this.returnFormArray.removeAt(index);
  }
}