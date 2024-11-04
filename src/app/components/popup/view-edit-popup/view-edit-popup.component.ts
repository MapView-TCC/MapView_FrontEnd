import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AbstractControl, FormControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { GeneralService } from '../../../services/general/general.service';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorMessageComponent } from '../../error-message/error-message.component';
import { Enviroment } from '../../../models/Enviroment';
import { DrpApiComponent } from '../../inputs/drp-api/drp-api.component';
import { ResponsibleByEquipmentService} from '../../../services/responsiblesById/responsible-by-id.service';
import { RegisterService } from '../../../services/register/register.service';
import { Register } from '../../../models/Register';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EnvironmentService } from '../../../services/environment/environment.service';
import { DrpStaticComponent } from '../../inputs/drp-static/drp-static.component';
import { Responsibles } from '../../../models/Responsibles';

@Component({
  selector: 'app-view-edit-popup',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
    ErrorMessageComponent,
    DrpStaticComponent,
    DrpApiComponent,
  ],
  templateUrl: './view-edit-popup.component.html',
  styleUrls: ['./view-edit-popup.component.scss'],
})
export class ViewEditPopupComponent implements OnInit {

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
    private responsibleService: ResponsibleByEquipmentService,
    private environmentService: EnvironmentService,
    private enviromentDrpService: EnvironmentService,
    private registerService: RegisterService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const userLogId = 1;
    this.loadEnvironments();
    this.loadData(this.equipmentId);

    //Carrea o valor do predio e da area relacionada ao ambiente selecionado no dropdown
    this.vizualizarCadastro.get('id_environment')?.valueChanges.subscribe(id_environment => {
      const idEnvironment = Number(id_environment); // Converte para número
      if (idEnvironment) {
        this.environmentService.getEnvironmentById(idEnvironment, 1).subscribe(
          environment => {
            //Atualiza os campos com os dados do ambiente retornando da API
            this.vizualizarCadastro.patchValue({
              building_code: environment.raspberry.building.building_code,
              area_code: environment.raspberry.area.area_code
            })
          },
          error => {
            console.error('Erro ao carregar ambiente', error);
          }
        )
      }
    })
    
  }

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
    building_code: [{ value: '', disabled: true }, Validators.required],
    id_environment: [{ value: 0, disabled: true }, Validators.required],
    area_code: [{ value: '', disabled: true }, Validators.required],
    post: [{ value: '', disabled: false }, [Validators.required, Validators.minLength(2), Validators.pattern('^[0-9]*$')]],
    responsaveis: this.fb.array([])
  });


  // Função que pega os valores da tabela Environment
  loadEnvironments() {
    this.enviromentDrpService.getEnviroment().subscribe((environments: Enviroment[]) => {
      environments.map(data => this.environmentOptions.push({
        value: data.id_environment,
        label: data.environment_name
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
  loadData(equipmentId: string) {
    this.responsibleService.getResponsiblesByEquipment(equipmentId).subscribe({
      next: (equipResponsible) => {

        this.vizualizarCadastro.controls.id_equipment.setValue(equipResponsible.code);
        this.vizualizarCadastro.controls.name_equipment.setValue(equipResponsible.name_equipment);
        this.vizualizarCadastro.controls.rfid.setValue(equipResponsible.rfid);
        this.vizualizarCadastro.controls.type.setValue(equipResponsible.type);
        this.vizualizarCadastro.controls.model.setValue(equipResponsible.model);
        this.vizualizarCadastro.controls.id_owner.setValue(equipResponsible.owner.id_owner);
        this.vizualizarCadastro.controls.validity.setValue(equipResponsible.validity);
        this.vizualizarCadastro.controls.admin_rights.setValue(equipResponsible.admin_rights);
        this.vizualizarCadastro.controls.observation.setValue(equipResponsible.observation);
        this.vizualizarCadastro.controls.constcenter.setValue(equipResponsible.owner.costCenter.costCenter);
        this.vizualizarCadastro.controls.building_code.setValue(equipResponsible.location.environment.raspberry.building.building_code);
        this.vizualizarCadastro.controls.id_environment.setValue(equipResponsible.location.environment.id_environment);
        this.vizualizarCadastro.controls.post.setValue(equipResponsible.location.post.post);
        this.vizualizarCadastro.controls.area_code.setValue(equipResponsible.location.environment.raspberry.area.area_code);

        //Condição para que mesmo que a lista de responsaveis venha vazia ele apresentre os campos do input para vizualização e edição
        if(equipResponsible.responsibles && equipResponsible.responsibles.length === 0){
          this.addResponsavel()
        }else{
          equipResponsible.responsibles.forEach((responsavel: Responsibles) => {
            this.returnFormArray.push(this.fb.group({
              responsible: [{ value: responsavel.responsible, disabled: false }, [Validators.required, Validators.minLength(3)]],
              edv: [{ value: responsavel.edv, disabled: false }, [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]*$')]],
              enumCourse: [{ value: responsavel.classes.enumCourse, disabled: true }, [Validators.required]],
              classes: [{ value: responsavel.classes.classes, disabled: false }, [Validators.required, Validators.minLength(2), Validators.pattern('^[0-9]*$')]],
            }));
  
          });
        }
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
      this.vizualizarCadastro.controls.building_code.disable();
      this.vizualizarCadastro.controls.area_code.disable();

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

    const updateData = new Register();

    updateData.code = this.vizualizarCadastro.get('id_equipment')?.value || '';
    updateData.name_equipment = this.vizualizarCadastro.get('name_equipment')?.value || '';
    updateData.rfid = Number(this.vizualizarCadastro.get('rfid')?.value || 0);
    updateData.type = this.vizualizarCadastro.get('type')?.value || '';
    updateData.model = this.vizualizarCadastro.get('model')?.value || '';
    updateData.validity = this.vizualizarCadastro.get('validity')?.value || '';
    updateData.admin_rights = this.vizualizarCadastro.get('admin_rights')?.value || '';
    updateData.observation = this.vizualizarCadastro.get('observation')?.value || '';
    updateData.id_environment = Number(this.vizualizarCadastro.get('id_environment')?.value || 0);
    updateData.post = this.vizualizarCadastro.get('post')?.value || '';
    updateData.id_owner = this.vizualizarCadastro.get('id_owner')?.value || '';
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