import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormEquipamentComponent } from '../../components/forms/form-equipament/form-equipament.component';
import { FormLocationComponent } from "../../components/forms/form-location/form-location.component";
import { CommonModule } from '@angular/common';
import { FormResponsibleComponent } from "../../components/forms/form-responsible/form-responsible.component";
import { Register } from '../../models/Register';
import { RegisterService } from '../../services/register/register.service';
import { TranslateModule } from '@ngx-translate/core';
import { EnvironmentService } from '../../services/environment/environment.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, FormEquipamentComponent, FormLocationComponent, FormResponsibleComponent, ReactiveFormsModule, TranslateModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponet implements OnInit {

  currentStep: number = 1; // Etapa inicial
  cadastroConcluido: boolean = false; // Flag para controle de conclusão do cadastro

  // Form Group responsável
  cadastroResponsavelArray: FormGroup;

  constructor(private fb: FormBuilder, private registerService: RegisterService, private snackBar: MatSnackBar, private environmentService: EnvironmentService) {
    this.cadastroResponsavelArray = this.fb.group({
      items: this.fb.array([])  // Inicializa como um FormArray
    });
  }

  //Inicializa o FormGroup para equipamento
  cadastroEquipamento = this.fb.group({
    id_equipment: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]),
    name_equipment: new FormControl('', [Validators.required, Validators.minLength(4)]),
    rfid: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern('^[0-9]*$')]),
    type: [{ value: '', disabled: false }, Validators.required],
    model: new FormControl('', Validators.required),
    id_owner: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    costCenter_name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('^[0-9]*$')]), // Aceita apenas dígitos 0-9
    validity: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]),
    admin_rights: new FormControl('', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]),
    observation: new FormControl('')  // Aqui não precisa de validador
  });

  //Inicializa o FormGroup para localização
  cadastroLocalizacao = this.fb.group({
    building_code: [{ value: '', disabled: true }, Validators.required],
    id_environment: [{ value: '', disabled: false }, Validators.required],
    area_code: [{ value: '', disabled: true }, Validators.required],
    post: new FormControl('', [Validators.required, Validators.minLength(2)])
  });


  ngOnInit() {
    // Adiciona o primeiro responsável ao iniciar o componente
    this.addCadastroResponsavel()

    // Carrega dados do ambiente relacionado ao prédio quando o valor do dropdown muda
    this.cadastroLocalizacao.get('id_environment')?.valueChanges.subscribe(id_environment => {
      const idEnvironment = Number(id_environment); // Converte para número
      if (idEnvironment) {
        this.environmentService.getEnvironmentById(idEnvironment, 1).subscribe(
          environment => {
            // Atualiza os campos com os dados do ambiente retornados da API
            this.cadastroLocalizacao.patchValue({
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


  // Getter para o FormArray de responsáveis
  get returnFormArray(): FormArray {
    return this.cadastroResponsavelArray.get('items') as FormArray
  }

  // Getter para acessar os FormGroups dentro do FormArray
  get returnFormGroups(): FormGroup[] {
    return this.returnFormArray.controls as FormGroup[];
  }


  // Método para adicionar um novo responsável
  addCadastroResponsavel(): void {
    if (this.returnFormArray.length < 2) {
      this.returnFormArray.push(
        this.fb.group({
          responsible_name: ['', [Validators.required, Validators.minLength(3)]],
          edv: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]*$')]],
          enumCourse: [{ value: '', disabled: false }, [Validators.required]],
          name_classes: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[0-9]*$')]]
        })
      );
      console.log(this.returnFormGroups);
    }
    else {
      console.log('Limite de responsáveis atingido. Apenas dois responsáveis podem ser adicionados.');
    }
  }

  //Método para remover o respónsável da lista através do índice
  removerResponsavel(index: number) {
    this.returnFormArray.removeAt(index);
  }

  // Método para passar para o próximo formulário
  goToNextStep() {
    if (this.currentStep == 1 && this.cadastroEquipamento.invalid) {
      this.cadastroEquipamento.markAllAsTouched();
      return;
    } else if (this.currentStep == 2 && this.cadastroLocalizacao.invalid) {
      this.cadastroLocalizacao.markAllAsTouched();
      return;
    } else if (this.currentStep == 3 && this.cadastroResponsavelArray.invalid) {
      this.cadastroResponsavelArray.markAllAsTouched();
      return;
    }

    this.currentStep++;
    console.log("STEPS " + this.currentStep);
    if (this.currentStep >= 3) {
      console.log("Chegou na última etapa!")
    }
  }


  // Função que verifica se os FormGroups estão válidos
  isCurrentStepValid(): boolean {
    if (this.currentStep == 1) {
      return this.cadastroEquipamento.valid;
    } else if (this.currentStep == 2) {
      if (this.cadastroLocalizacao.get('id_environment')?.value == "notEnviroment") {
        return this.cadastroLocalizacao.invalid;
      }
      return this.cadastroLocalizacao.valid;
    } else if (this.currentStep == 3) {
      return this.cadastroResponsavelArray.valid;
    } else if (this.currentStep >= 4) {
      return this.cadastroEquipamento.valid && this.cadastroLocalizacao.valid && this.cadastroResponsavelArray.valid
    }
    return false;
  }


  // Método de envio do formulário
  submitForm() {
    console.log('Etapa válida:', this.isCurrentStepValid());

    // Exibe no console o valor dos formulários preenchidos
    console.log("Etapa Atual:", this.currentStep);
    console.log("Dados do Formulário de Equipamento:", this.cadastroEquipamento.value);
    console.log("Dados do Formulário de Localização:", this.cadastroLocalizacao.value);
    console.log("Dados do Formulário de Responsáveis:", this.cadastroResponsavelArray.value);

    // Verifica se a etapa atual é válida; caso não seja, encerra o método
    if (!this.isCurrentStepValid()) {
      return; //impede o envio de dados inválidos.
    }

    // Cria objeto do tipo Register com os dados dos formulários
    const registerData = new Register();

    // Passa dados dos controls para o objeto
    registerData.code = this.cadastroEquipamento.get('id_equipment')?.value?.toUpperCase() || '';
    registerData.name_equipment = this.cadastroEquipamento.get('name_equipment')?.value || '';
    registerData.rfid = Number(this.cadastroEquipamento.get('rfid')?.value || 0);
    registerData.type = this.cadastroEquipamento.get('type')?.value || '';
    registerData.model = this.cadastroEquipamento.get('model')?.value || '';
    registerData.validity = this.cadastroEquipamento.get('validity')?.value || '';
    registerData.admin_rights = this.cadastroEquipamento.get('admin_rights')?.value?.toUpperCase() || '';
    registerData.observation = this.cadastroEquipamento.get('observation')?.value?.toLowerCase() || '';
    registerData.id_environment = Number(this.cadastroLocalizacao.get('id_environment')?.value || 0);
    registerData.post = this.cadastroLocalizacao.get('post')?.value || '';
    registerData.id_owner = this.cadastroEquipamento.get('id_owner')?.value?.toUpperCase() || '';
    registerData.costCenter_name = this.cadastroEquipamento.get('costCenter_name')?.value || '';

    // Obtém dados dos responsáveis
    registerData.dataResponsible = this.returnFormArray.controls.map(control => ({
      responsible_name: control.get('responsible_name')?.value || '',
      edv: control.get('edv')?.value || '',
      enumCourse: control.get('enumCourse')?.value || '',
      name_classes: control.get('name_classes')?.value || ''
    }));


    // Envia os dados para o backend através do serviço
    this.registerService.postRegister(1, registerData).subscribe({
      next: (response) => {
        console.log('Dados enviados com sucesso!', response);
        this.cadastroConcluido = true; // Atualiza a flag de conclusão
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        this.goToNextStep();
      },
      error: (error) => {
        console.error('Erro ao enviar registro:', error);

        // Exibe o alerta em caso de erro
        this.showErrorAlert('Não foi possível realizar o cadastro.');
      },
      complete: () => {
        console.log('Envio de registro concluído.');
      }
    });
  }

  //Método para a mensagem de erro de cadastro
  showErrorAlert(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: ['alert-error']
    });
  }
}



