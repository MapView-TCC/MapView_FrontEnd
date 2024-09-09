import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GeneralService } from '../services/general.service';

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
      observacao: ['']
    });

    // Exemplo de dados pré-definidos (normalmente, esses dados vêm de uma API)
    this.loadDados();
  }

  loadDados(): void {
    // Simulação de dados que você obteria de uma API
    const data = {
      idEquipamento: '12345',
      rfid: 'RF123456',
      tipoEquipamento: 'Computador',
      modelo: 'Dell XPS 13',
      usuarioPrincipal: 'Ana Maria',
      idUsuarioPrincipal: '67890',
      dataSubstituicao: '2024-09-01',
      adminRights: 'Sim',
      centroCusto: 'Centro A',
      observacao: 'Em bom estado'
    };

    // Atualiza os valores do formulário com os dados recebidos
    this.equipamentoForm.patchValue(data);
  }
}
