import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GeneralService } from '../../services/general/general.service';


@Component({
  selector: 'app-vizualizacao-form',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  
  ],
  templateUrl: './vizualizacao-form.component.html',
  styleUrls: ['./vizualizacao-form.component.scss']
})
export class VizualizacaoFormComponent implements OnInit {
  vizualizarCadastro: FormGroup;
  isEditing = false;
  

  constructor(private fb: FormBuilder, public generalService: GeneralService) {
    this.vizualizarCadastro = this.fb.group({
      idEquipamento: [{ value: '', disabled: true }],
      rfid: [{ value: '', disabled: true }],
      tipoEquipamento: [{ value: '', disabled: true }],
      modelo: [{ value: '', disabled: true }],
      usuarioPrincipal: [{ value: '', disabled: true }],
      idUsuarioPrincipal: [{ value: '', disabled: true }],
      dataSubstituicao: [{ value: '', disabled: true }],
      adminRights: [{ value: '', disabled: true }],
      centrodecusto: [{ value: '', disabled: true }],
      observacao: [{ value: '', disabled: true }],
      predio: [{ value: '', disabled: true }],
      setor: [{ value: '', disabled: true }],
      laboratorio: [{ value: '', disabled: true }],
      posto: [{ value: '', disabled: true }],
      nomedoresponsavel: [{ value: '', disabled: true }],
      edv: [{ value: '', disabled: true }],
      curso: [{ value: '', disabled: true }],
      turma: [{ value: '', disabled: true }]
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.vizualizarCadastro.enable();
    } else {
      this.vizualizarCadastro.disable();
    }
  }

  save() {
    // lógica para salvar os dados
    console.log(this.vizualizarCadastro.value); // Exemplo de onde você pode processar os dados
    this.toggleEdit();
  }

  cancel() {
    this.toggleEdit();
    // Lógica para fechar o modal
    // Exemplo:
     this.generalService.showFormlog = false; // Fechar o modal
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const equipamentoData = {
      idEquipamento: '12345',
      rfid: 'RFID123456',
      tipoEquipamento: 'Tipo A',
      modelo: 'Modelo X',
      usuarioPrincipal: 'Usuário 1',
      idUsuarioPrincipal: 'ID001',
      dataSubstituicao: '2024-01-01',
      adminRights: 'Sim',
      centrodecusto: '1234',
      observacao: 'Observação exemplo',
      predio: 'Prédio A',
      setor: 'Setor 1',
      laboratorio: 'Laboratório 101',
      posto: 'Posto 2',
      nomedoresponsavel: 'Responsável 1',
      edv: 'EDV001',
      curso: 'Curso de Exemplo',
      turma: 'Turma 2024'
    };

    this.vizualizarCadastro.patchValue(equipamentoData);
  }


  

  
}
