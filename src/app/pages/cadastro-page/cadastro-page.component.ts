import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { CadastroFormComponent } from "../../components/cadastro-form/cadastro-form.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormEquipamentComponent } from '../../components/forms/form-equipament/form-equipament.component';
import { FormLocationComponent } from "../../components/forms/form-location/form-location.component";
import { CommonModule } from '@angular/common';
import { BuildingDrp } from '../../models/BuldingDrp';
import { Enviroment } from '../../models/Enviroment';
import { Area } from '../../models/Area';
import { FormResponsibleComponent } from "../../components/forms/form-responsible/form-responsible.component";

@Component({
  selector: 'app-cadastro-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, CadastroFormComponent, FooterComponent, FormEquipamentComponent, FormLocationComponent, FormResponsibleComponent],
  templateUrl: './cadastro-page.component.html',
  styleUrl: './cadastro-page.component.scss'
})
export class CadastroPageComponent {
  constructor(private fb: FormBuilder) {
    // Inicialize o FormGroup com os controles necessários
  }

  currentStep: number = 1; // Etapa inicial

  //Form group equipamento
  cadastroEquipamento = this.fb.group({
    idEquipamento: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]),
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
    area: new FormControl('', Validators.required),
    posto: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern('^[0-9]*$')])
  });

  //Form Group Responsável
  cadastroResponsavel = this.fb.group({
    nome_responsavel: new FormControl('', [Validators.required, Validators.minLength(3)]),
    edv: new FormControl('', [Validators.required, Validators.minLength(8), Validators.minLength(8), Validators.pattern('^[0-9]*$')]),
    curso: [{ value: '', disabled: false }, Validators.required],
    turma: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern('^[0-9]*$')])
  });

  //método para passar pro proxímo formulário
  goToNextStep() {
    this.currentStep++;
    console.log("STEPS " + this.currentStep)
    if (this.currentStep >= 3) {
      console.log("Chegou na última etapa!")
    }
  }   


  //Função que verifica se todos os forms estão validos
  isFormGroupsValid(): boolean {
    if (this.cadastroEquipamento.valid && this.cadastroLocalizacao.valid && this.cadastroResponsavel.valid) {
      return true;
    } else {
      return false;
    }
  }

  //Função que verifica se os formsGroups estão validos
  isCurrentStepValid(): boolean {
    if(this.currentStep==1){
      return this.cadastroEquipamento.valid;
    }else if (this.currentStep == 2){
      return this.cadastroLocalizacao.valid;
    }else if (this.currentStep == 3){
      return this.cadastroResponsavel.valid;
    }
    return false;
  }

  //métodode envio do formulário
  submitForm() {
    // if (!this.isFormGroupsValid()) {
    //   console.log('Formulário inválido')
    // } else {
    //   this.goToNextStep();
    //   console.log(this.currentStep);

    // }
    this.goToNextStep();
    console.log(this.currentStep);
  }

}
