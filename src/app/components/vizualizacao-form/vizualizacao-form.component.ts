//Imports from Angular 
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

//Imports from our components 
import { GeneralService } from '../../services/general/general.service';

@Component({
  selector: 'app-vizualizacao-form',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './vizualizacao-form.component.html',
  styleUrls: ['./vizualizacao-form.component.scss']
})
export class VizualizacaoFormComponent implements OnInit {

  equipamentoForm!: FormGroup; // Adicione o operador de asserção

  constructor(private fb: FormBuilder, public generalService: GeneralService) {}

  ngOnInit(): void {
    // Criação do formulário com os campos
    this.equipamentoForm = this.fb.group({
      idEquipamento: [''],
      rfid: [''],
      tipoEquipamento: [''],
      modelo: [''],
      usuarioPrincipal: [''],
      idUsuarioPrincipal: [''],
      dataSubstituicao: [''],
      adminRights: [''],
      centroCusto: [''],
      observacao: [''],
      predio:[''],
      setor:[''],
      laboratorio:[''],
      posto:[''],
      nomedoresponsavel:[''],
      edv:[''],
      curso:[''],
      turma:['']
    });

    // Exemplo de dados pré-definidos (normalmente, esses dados vêm de uma API)
    this.loadDados();
  }

  loadDados(): void {
    // Simulação de dados que você obteria de uma API
    const data = {
      idEquipamento: 'JVL-C-0009X',
      rfid: '00000001234',
      tipoEquipamento: 'Notebook',
      modelo: 'Standard',
      usuarioPrincipal: 'Amber Cristina Forte',
      idUsuarioPrincipal: 'AAA1CA',
      dataSubstituicao: '2024.Q1',
      adminRights: 'RITM0123456789',
      centroCusto: '123456789',
      observacao: 'Em bom estado',
      predio:'Ca600',
      setor:'ETS',
      laboratorio:'Laboratório 4/5',
      posto:'PC 29',
      nomedoresponsavel:'Sarah Silva dos Santos',
      edv:'999999',
      curso:'Digital Solutions',
      turma:'08'
    };

    // Atualiza os valores do formulário com os dados recebidos
    this.equipamentoForm.patchValue(data);
  }
}
