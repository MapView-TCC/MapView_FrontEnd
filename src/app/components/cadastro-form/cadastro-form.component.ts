import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms'; // Criar formulários reativos
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';  // Importar FormsModule
import { DropdowLocalComponent } from '../dropdow-local/dropdow-local.component';

import { BuildingDrp } from '../../models/BuldingDrp';
import { BuildingDrpService } from '../../services/dropdow-building/building-drp.service';
import { Enviroment } from '../../models/Enviroment';
import { DropdowDynamicComponent } from "../dropdow-dynamic/dropdow-dynamic.component";
import { ErrorMessageComponent } from "../error-message/error-message.component";

@Component({
  selector: 'app-cadastro-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule,
    DropdowLocalComponent,
    DropdowDynamicComponent,
    ErrorMessageComponent
],
  templateUrl: './cadastro-form.component.html',
  styleUrl: './cadastro-form.component.scss'
})



export class CadastroFormComponent {
  constructor(private fb: FormBuilder, private buldingDrp: BuildingDrpService) {
    // Inicialize o FormGroup com os controles necessários
  }

  currentStep: number = 1; // Etapa inicial
  responsaveis: Array<any> = [{}]; // Inicia com um responsável

  //Form group equipamento
  cadastroEquipamento = this.fb.group({
    idEquipamento: new FormControl ('', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]),
    rfid: new FormControl ('', [Validators.required, Validators.minLength(16), Validators.maxLength(16),  Validators.pattern('^[0-9]*$')]),
    tipoEquipamento: [{value: '', disabled: false}, Validators.required],
    modelo: new FormControl ('', Validators.required),
    idUsuario: new FormControl ('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    centroCustos: new FormControl ('', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('^[0-9]*$')]), // Aceita apenas dígitos 0-9
    dataSubstituicao: new FormControl ('',  [Validators.required, Validators.minLength(7), Validators.maxLength(7)]),
    adminRights: new FormControl ('', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]),
    observacao: new FormControl ('')  // Aqui não precisa de validador
  });

  //Form Group localização
  cadastroLocalizacao = this.fb.group({
    id_building: [{value: '', disabled: false}, Validators.required],
    id_enviroment: [{value: '', disabled: false}, Validators.required],
    area: new FormControl ('', Validators.required),
    posto: new FormControl ('', [Validators.required, Validators.minLength(2), Validators.pattern('^[0-9]*$')])
  });

  //Form Group Responsável
  cadastroResponsavel = this.fb.group({
    nome_responsavel: new FormControl('', [Validators.required, Validators.minLength(3)]),
    edv: new FormControl('',[Validators.required, Validators.minLength(8), Validators.minLength(8), Validators.pattern('^[0-9]*$')]),
    curso:[{value: '', disabled:false},Validators.required],
    turma: new FormControl ('',[Validators.required, Validators.minLength(2), Validators.pattern('^[0-9]*$')])
  });


  showForm: boolean = false;

  buildingDrpList:Array<BuildingDrp>  = [];
  enviromentDrpList: Array<Enviroment> = [];

  ngOnInit(): void{
    this.buldingDrp.getBulding().subscribe({
      next: res => {
        this.buildingDrpList = res;
      },
      error: err => console.error(err)
    })
  }

  changeButton(){
    console.log('Dados do formulário:', this.cadastroEquipamento.value);
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
  //Função que verifica se todos os forms estão validos
  isFormGroupsValid(): boolean{
    if(this.cadastroEquipamento.valid && this.cadastroLocalizacao.valid && this.cadastroResponsavel.valid){
      return true;
    }else{
      return false;
    }
    
  }

  //método para passar pro proxímo formulário
  goToNextStep() {
    this.currentStep++;
    console.log("STEPS " + this.currentStep)
    if(this.currentStep >= 3){
      this.changeButton()
    }
  }

  //métodode envio do formulário
  submitForm(){
    console.log('enviou!')
    this.goToNextStep();
    console.log(this.currentStep);
  }

  // Função para adicionar um novo responsável
  addResponsavel() {
    const responsavelGroup = this.fb.group({
      nome_responsavel: new FormControl('', Validators.required),
      edv: new FormControl('', Validators.required),
      curso: [{ value: '', disabled: false }, Validators.required],
      turma: new FormControl('', Validators.required)
  });
  this.responsaveis.push(responsavelGroup);
  this.showForm = true;
 
  }

  // Função para remover
  removeResponsavel() {
    this.showForm = false;
  }

  
}

