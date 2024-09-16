import { HeaderComponent } from '../header/header.component';
import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms'; // Criar formulários reativos
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';  // Importar FormsModule

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
      idEquipamento: ['', Validators.required],
      rfid: ['', Validators.required],
      tipoEquipamento: ['', Validators.required],
      modelo: ['', Validators.required],
      idUsuario: ['', Validators.required],
      centroCustos: ['', Validators.required],
      dataSubstituicao: ['', Validators.required],
      adminRights: ['', Validators.required],
      observacao: ['']
    });
  }

  goToNextStep() {
    this.currentStep++;
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
}

