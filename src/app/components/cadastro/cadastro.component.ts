import { HeaderComponent } from '../header/header.component';
import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms'; // Criar formulários reativos
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';  // Importar FormsModule

import { DropdowComponent } from '../dropdow/dropdow.component';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    ReactiveFormsModule,
    MatIconModule, 
    FooterComponent,
    FormsModule,
    DropdowComponent
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})



export class CadastroComponent {

  currentStep: number = 1; // Etapa inicial
  responsaveis: Array<any> = [{}]; // Inicia com um responsável
  // responsaveis: { nome: string, edv: string, curso: string, turma: string }[] = []
  cadastroEquipamento: FormGroup;
  showForm: boolean = false;

  constructor(private fb: FormBuilder) {
    // Inicialize o FormGroup com os controles necessários
    this.cadastroEquipamento = this.fb.group({
      idEquipamento: new FormControl ('', Validators.required),
      rfid: new FormControl ('', Validators.required),
      // tipoEquipamento: new FormControl ('', Validators.required),
      modelo: new FormControl ('', Validators.required),
      idUsuario: new FormControl ('', Validators.required),
      centroCustos: new FormControl ('', Validators.required),
      dataSubstituicao: new FormControl ('', Validators.required),
      adminRights: new FormControl ('', Validators.required),
      observacao: new FormControl ('')  // Aqui não precisa de validador
    });
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
 
  // Função para adicionar um novo responsável
  addResponsavel() {
    //this.responsaveis.push({});
    this.showForm = true;
 
  }
 
  removeResponsavel() {
    this.showForm = false;
  }

  
  


  //Área de DropDow
  equipamentOptions = [
    {value: 'Desktop', label: 'Desktop'},
    {value: 'Notebook', label: 'Notebook'}, 
    {value: 'Outro', label: 'Outro'}
  ];

  //Valor selecionado 
  selectedEquipament: string = '';

  buldingOptions =[
    {value: 1, label: 'Ca300'},
    {value: 2, label: 'Ca400'}, 
    {value: 3, label: 'Ca600'},
    {value: 3, label: 'Ca700'}
  ];
  selectedBulding: string = '';

  environmentOptions =[
    {value: 1, label: 'Laboratório 01'},
    {value: 2, label: 'Laboratório 02'}, 
    {value: 3, label: 'Laboratório 03'},
    {value: 3, label: 'Laboratório 04'}
  ];
  selectedEnvironment: string = '';

  courseOptions =[
    {value: 1, label: 'Administração'},
    {value: 2, label: 'Digital Solutions'}, 
    {value: 3, label: 'Manufatura Digital'},
    {value: 3, label: 'Mecatrônica'}
  ];
  selectedCourse: string = '';
  
}

