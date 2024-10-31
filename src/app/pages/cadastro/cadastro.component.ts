import { Component, NgModule, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormEquipamentComponent } from '../../components/forms/form-equipament/form-equipament.component';
import { FormLocationComponent } from "../../components/forms/form-location/form-location.component";
import { CommonModule } from '@angular/common';
import { FormResponsibleComponent } from "../../components/forms/form-responsible/form-responsible.component";
import { Register } from '../../models/Register';
import { RegisterService } from '../../services/cadastro/register.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { capitalize } from 'vue';
import { EnvironmentService } from '../../services/location_popup/environment.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, FormEquipamentComponent, FormLocationComponent, FormResponsibleComponent, ReactiveFormsModule, TranslateModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit {

  cadastroResponsavelArray: FormGroup;

  constructor(private fb: FormBuilder, private registerService: RegisterService, private snackBar: MatSnackBar, private environmentService: EnvironmentService) {
    this.cadastroResponsavelArray = this.fb.group({
      items: this.fb.array([])
    });
  }

  currentStep: number = 1; // Etapa inicial

  ngOnInit() {
    this.addCadastroResponsavel()
    
    //Carrea o valor do predio e da area relacionada ao ambiente selecionado no dropdown
    this.cadastroLocalizacao.get('id_environment')?.valueChanges.subscribe(id_environment => {
      const idEnvironment = Number(id_environment); // Converte para número
      if(idEnvironment){
        this.environmentService.getEnvironmentById(idEnvironment, 1).subscribe(
          environment => {
            //Atualiza os campos com os dados do ambiente retornando da API
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

  //Form group equipamento
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

  //Form Group localização
  cadastroLocalizacao = this.fb.group({
    building_code: [{ value: '', disabled: true }, Validators.required],
    id_environment: [{ value: '', disabled: false }, Validators.required],
    area_code: [{ value: '', disabled: true }, Validators.required],
    post: new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  //Form Array de FormGroup de Responsável
  get returnFormArray(): FormArray {
    return this.cadastroResponsavelArray.get('items') as FormArray
  }

  get returnFormGroups(): FormGroup[] {
    return this.returnFormArray.controls as FormGroup[];
  }

  // Método para adicionar mais um responsável
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

  //Método para remover o respónsável da lista através do index
  removerResponsavel(index: number) {
    this.returnFormArray.removeAt(index);
  }


  //método para passar pro proxímo formulário
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


  //Função que verifica se os formsGroups estão validos
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



  //métodode envio do formulário
  cadastroConcluido: boolean = false;
  submitForm() {
    console.log('Etapa válida:', this.isCurrentStepValid());

    // Exibe no console o valor dos formulários preenchidos
    console.log("Etapa Atual:", this.currentStep);
    console.log("Dados do Formulário de Equipamento:", this.cadastroEquipamento.value);
    console.log("Dados do Formulário de Localização:", this.cadastroLocalizacao.value);
    console.log("Dados do Formulário de Responsáveis:", this.cadastroResponsavelArray.value);

    //Verifica se a etapa atual é valida, caso não seja, o método é encerrado (com o return)
    if (!this.isCurrentStepValid()) {
      return; //impede o envio de dados inválidos.
    }

    //Objeto do tipo Register com os dados dos formulários
    const registerData = new Register();

    //Passando dados dos controls para o objeto
    registerData.id_equipment = this.cadastroEquipamento.get('id_equipment')?.value?.toUpperCase() || '';
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

    // Obtendo dados dos responsáveis
    registerData.dataResponsible = this.returnFormArray.controls.map(control => ({
      responsible_name: control.get('responsible_name')?.value || '',
      edv: control.get('edv')?.value || '',
      enumCourse: control.get('enumCourse')?.value || '',
      name_classes: control.get('name_classes')?.value || ''
    }));


    //Executando o POST
    this.registerService.postRegister(1, registerData).subscribe({
      next: (response) => {
        console.log('Registro enviado com sucesso:', response);
        this.cadastroConcluido = true;
        // Atraso de 3 segundos (3000 ms) antes de recarregar a página
        setTimeout(() => {
          window.location.reload();
        }, 2000); // 2000 milissegundos = 2 segundos

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



