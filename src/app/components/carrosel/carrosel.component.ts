import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../services/general/general.service';
import { PrevDirective } from '../../services/carrosel/prev.directive';
import { NextDirective } from '../../services/carrosel/next.directive';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { EquipamentoService } from '../../services/equipamento carrosel/equipamento.service';

@Component({
  selector: 'app-carrosel',
  standalone: true,
  imports: [PrevDirective, NextDirective, MatIconModule, CommonModule],
  templateUrl: './carrosel.component.html',
  styleUrls: ['./carrosel.component.scss'] 
})
export class CarroselComponent implements OnInit {
  equipamentos: any[] = [];

  constructor(private equipmentService: EquipamentoService, public generalService: GeneralService) {}

  ngOnInit() {
    this.equipmentService.getEquipamentos().subscribe({
      next: (data) => {
        this.equipamentos = data;
        console.log('Dados recebidos:', this.equipamentos); // Verifique os dados
      },
      error: (err) => {
        console.error("Erro ao buscar equipamentos:", err);
      }
    });
  }
}