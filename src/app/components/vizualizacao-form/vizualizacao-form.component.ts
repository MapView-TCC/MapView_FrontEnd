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
import { Responsible } from '../../models/DataResponsible';
import e from 'express';
import { RegisterService } from '../../services/cadastro/register.service';
import { RegisterUpdate } from '../../models/Register';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    { value: 'Notebook', label: 'Notebook' },
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
    private buildingDrpService: BuildingDrpService,
    private enviromentDrpService: EnviromentDrpService,
    private areaDrpService: AreaDrpService,
    private registerService: RegisterService,
    private snackBar: MatSnackBar
  ) {}

//Validação dos campos do formulário
  vizualizarCadastro = this.fb.group({
    id_equipment: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
    name_equipment: [{ value: '', disabled: false }, [Validators.required, Validators.minLength(4)]],
    rfid: [{ value: 0, disabled: false }, [Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern('^[0-9]*$')]],
    type: [{ value: '', disabled: true }, [Validators.required]],
    model: [{ value: '', disabled: true }, [Validators.required]],
    id_owner: [{ value: '', disabled: false }, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
    constcenter: [{ value: '', disabled: false }, [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('^[0-9]*$')]], // Aceita apenas dígitos 0-9
    validity: [{ value: '', disabled: false }, [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
    admin_rights: [{ value: '', disabled: false }, [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
    observation: [{ value: '', disabled: false }, []],
    id_building: [{ value: 0, disabled: true }, Validators.required],
    id_environment: [{ value: 0, disabled: true }, Validators.required],
    id_area: [{ value: 0, disabled: true }, Validators.required],
    id_post: [{ value: '', disabled: false }, [Validators.required, Validators.minLength(2), Validators.pattern('^[0-9]*$')]],
    responsaveis: this.fb.array([])
  });

  ngOnInit(): void {
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

  //Form Array de FormGroup de Responsável
  get returnFormArray(): FormArray {
    return this.vizualizarCadastro.get('responsaveis') as FormArray
  }

  get returnFormGroups(): FormGroup[] {
    return this.returnFormArray.controls as FormGroup[];
  }


  //Pegar os dados da api para apresentar no vizualizar
  loadData(equipmentId: string, userLogId: number) {
    this.responsibleService.getResponsiblesByEquipment(0, 100, equipmentId).subscribe({
      next: (equipResponsible) => {

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

        equipResponsible.responsibles.forEach((responsavel: Responsible) => {
          this.returnFormArray.push(this.fb.group({
            responsible: [{ value: responsavel.responsible, disabled: false }, [Validators.required, Validators.minLength(3)]],
            edv: [{ value: responsavel.edv, disabled: false }, [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]*$')]],
            enumCourse: [{ value: responsavel.classes.enumCourse, disabled: true }, [Validators.required]],
            classes: [{ value: responsavel.classes.classes, disabled: false }, [Validators.required, Validators.minLength(2), Validators.pattern('^[0-9]*$')]],
          }));

        });

      },
      error: err => console.error('Erro ao carregar equipamento:', err)
    },
    );
  }

  //Função que faz a troca de metodo de vizualizar para editar do formulário
  toggleEdit() {
    this.isEditing = !this.isEditing;
    console.log('Is Editing:', this.isEditing);

    if (this.isEditing) {
      this.vizualizarCadastro.enable(); // Habilita todos os controles do formulário
      this.vizualizarCadastro.controls.id_equipment.disable();
    } else {
      this.vizualizarCadastro.disable(); // Desabilita todos os controles do formulário
    }
    console.log(this.vizualizarCadastro)
    console.log('Is Editing:', this.isEditing); // Verifique o valor aqui
  }

   // lógica para salvar os dados e fazer o update do cadastro
  save() {
    console.log(this.vizualizarCadastro.value); 

    const id = this.vizualizarCadastro.controls.id_equipment.value || '';
    console.log('Id do equipamento selecionado ', id);

    const updateData = new RegisterUpdate();

    updateData.id_equipment = this.vizualizarCadastro.get('id_equipment')?.value?.toUpperCase() || '';
    updateData.name_equipment = this.vizualizarCadastro.get('name_equipment')?.value || '';
    updateData.rfid = Number(this.vizualizarCadastro.get('rfid')?.value || 0);
    updateData.type = this.vizualizarCadastro.get('type')?.value || '';
    updateData.model = this.vizualizarCadastro.get('model')?.value || '';
    updateData.validity = this.vizualizarCadastro.get('validity')?.value || '';
    updateData.admin_rights = this.vizualizarCadastro.get('admin_rights')?.value?.toUpperCase() || '';
    updateData.observation = this.vizualizarCadastro.get('observation')?.value?.toLowerCase() || '';
    updateData.id_environment = Number(this.vizualizarCadastro.get('id_environment')?.value || 0);
    updateData.post = this.vizualizarCadastro.get('id_post')?.value || '';
    updateData.id_owner = this.vizualizarCadastro.get('id_owner')?.value?.toUpperCase() || '';
    updateData.costCenter_name = this.vizualizarCadastro.get('constcenter')?.value || '';

    // Obtendo dados dos responsáveis
    updateData.dataResponsible = this.returnFormArray.controls.map(control => ({
      responsible_name: control.get('responsible')?.value || '',
      edv: control.get('edv')?.value || '', 
      enumCourse: control.get('enumCourse')?.value || '',
      name_classes: control.get('classes')?.value || ''
    }));


    this.registerService.putRegister(1, id, updateData).subscribe({
      next: (response) => {
        console.log('Registro enviado com sucesso:', response);
        this.showErrorAlert('Atualização realizada com sucesso!');
        setTimeout(() => {
          window.location.reload();
        }, 1000); // 1000 milissegundos = 1 segundos, para fechar o popup
        
      },
      error: (error) => {
        console.error('Erro ao enviar registro:', error);
        this.showErrorAlert('Não foi possível realizar a atualização.');

    
      },
      complete: () => {
        console.log('Envio de registro concluído.');
      }
    })

  }

  cancel() {
    this.toggleEdit();
    this.generalService.showFormlog = false; // Fechar o modal
  }

  //permite add um responsável na lista 
  addResponsavel() {
    if (this.returnFormArray.length < 2) {
      this.returnFormArray.push(
        this.fb.group({
          responsible: ['', [Validators.required, Validators.minLength(3)]],
          edv: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]*$')]],
          enumCourse: [{ value: '', disabled: false }, [Validators.required]],
          classes: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[0-9]*$')]]
        })
      );
      console.log(this.returnFormGroups);
    }
    else {
      console.log('Limite de responsáveis atingido. Apenas dois responsáveis podem ser adicionados.');
    }
  }

  //remove o responsavel escolhido da lista
  removeResponsavel(index: number) {
    this.returnFormArray.removeAt(index);
  }

  //Método para a mensagem de erro de cadastro
  showErrorAlert(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: ['alert-error']
    });
  }

}