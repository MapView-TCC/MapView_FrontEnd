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

@Component({
  selector: 'app-cadastro-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, FormEquipamentComponent, FormLocationComponent, FormResponsibleComponent, ReactiveFormsModule, TranslateModule],
  templateUrl: './cadastro-page.component.html',
  styleUrl: './cadastro-page.component.scss'
})
export class CadastroPageComponent implements OnInit {

  cadastroResponsavelArray: FormGroup;

  constructor(private fb: FormBuilder, private registerService: RegisterService, private snackBar: MatSnackBar) {
    this.cadastroResponsavelArray = this.fb.group({
      items: this.fb.array([])
    });
  }

  currentStep: number = 1; // Etapa inicial

  ngOnInit() {
    this.addCadastroResponsavel()
  }

  //Form group equipamento
  cadastroEquipamento = this.fb.group({
    id_equipment: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]),
    name_equipment: new FormControl('', [Validators.required, Validators.minLength(4)]),
    rfid: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern('^[0-9]*$')]),
    tipoEquipamento: [{ value: '', disabled: false }, Validators.required],
    modelo: new FormControl('', Validators.required),
    idUsuario: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    centroCustos: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('^[0-9]*$')]), // Aceita apenas dígitos 0-9
    dataSubstituicao: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]),
    adminRights: new FormControl('', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]),
    observacao: new FormControl('')  // Aqui não precisa de validador
  });

  //Form Group localização
  cadastroLocalizacao = this.fb.group({
    id_building: [{ value: '', disabled: false }, Validators.required],
    id_environment: [{ value: '', disabled: false }, Validators.required],
    area: [{ value: '', disabled: false }, Validators.required],
    posto: new FormControl('', [Validators.required, Validators.minLength(2)])
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
          nome_responsavel: ['', [Validators.required, Validators.minLength(3)]],
          edv: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]*$')]],
          curso: [{ value: '', disabled: false }, [Validators.required]],
          turma: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[0-9]*$')]]
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
    registerData.type = this.cadastroEquipamento.get('tipoEquipamento')?.value || '';
    registerData.model = this.cadastroEquipamento.get('modelo')?.value || '';
    registerData.validity = this.cadastroEquipamento.get('dataSubstituicao')?.value || '';
    registerData.admin_rights = this.cadastroEquipamento.get('adminRights')?.value?.toUpperCase() || '';
    registerData.observation = this.cadastroEquipamento.get('observacao')?.value?.toLowerCase() || '';
    registerData.id_building = Number(this.cadastroLocalizacao.get('id_building')?.value || 0);
    registerData.id_environment = Number(this.cadastroLocalizacao.get('id_environment')?.value || 0);
    registerData.post = this.cadastroLocalizacao.get('posto')?.value || '';
    registerData.id_owner = this.cadastroEquipamento.get('idUsuario')?.value?.toUpperCase() || '';
    registerData.costCenter_name = this.cadastroEquipamento.get('centroCustos')?.value || '';

    // Obtendo dados dos responsáveis
    registerData.dataResponsible = this.returnFormArray.controls.map(control => ({
      responsible_name: control.get('nome_responsavel')?.value || '',
      edv: control.get('edv')?.value || '',
      enumCourse: control.get('curso')?.value || '',
      name_classes: control.get('turma')?.value || ''
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



