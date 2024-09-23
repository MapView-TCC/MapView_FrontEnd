import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms'; // Criar formulários reativos
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';  // Importar FormsModule
import { DropdowLocalComponent } from '../dropdow-local/dropdow-local.component';

import { BuildingDrp } from '../../models/BuldingDrp';
import { BuildingDrpService } from '../../services/dropdow-building/building-drp.service';
import { Enviroment } from '../../models/Enviroment';

@Component({
  selector: 'app-cadastro-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule, 
    FormsModule,
    DropdowLocalComponent

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

  cadastroEquipamento = this.fb.group({
    idEquipamento: new FormControl ('', Validators.required),
    rfid: new FormControl ('', Validators.required),
    tipoEquipamento: [{value: '', disabled: false}, Validators.required],
    modelo: new FormControl ('', Validators.required),
    idUsuario: new FormControl ('', Validators.required),
    centroCustos: new FormControl ('', Validators.required),
    dataSubstituicao: new FormControl ('', Validators.required),
    adminRights: new FormControl ('', Validators.required),
    observacao: new FormControl ('')  // Aqui não precisa de validador
  });

  cadastroLocalizacao = this.fb.group({
    id_building: new FormControl(0, Validators.required),
    id_enviroment: new FormControl(0, Validators.required),
    area: new FormControl ('', Validators.required),
    posto: new FormControl ('', Validators.required)
  });

  cadastroResponsavel = this.fb.group({
    nome_responsavel: new FormControl('',Validators.required),
    edv: new FormControl('',Validators.required),
    curso:[{value: '', disabled:false},Validators.required],
    turma: new FormControl ('',Validators.required)
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

  goToNextStep() {
    this.currentStep++;
    console.log("STEPS " + this.currentStep)
    if(this.currentStep >= 3){
      this.changeButton()
    }
    // if (this.currentStep < 2) { // Ajuste conforme o número de etapas
    // }
  }

  submitForm(){
    console.log('enviou!')
    this.goToNextStep();
    console.log(this.currentStep);
  }

  // Função para adicionar um novo responsável
  addResponsavel() {
    //this.responsaveis.push({});
    this.showForm = true;
 
  }
 
  removeResponsavel() {
    this.showForm = false;
  }

  
}

