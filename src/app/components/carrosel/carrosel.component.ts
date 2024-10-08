import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../services/general/general.service';
import { PrevDirective } from '../../services/carrosel/prev.directive';
import { NextDirective } from '../../services/carrosel/next.directive';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Track_History } from '../../models/Track_History';
import { Equipment } from '../../models/Equipment';
import { trackhistoryService } from '../../services/equipamento carrosel/trackhistory.service';



@Component({
  selector: 'app-carrosel',
  standalone: true,
  imports: [PrevDirective, NextDirective, MatIconModule, CommonModule],
  templateUrl: './carrosel.component.html',
  styleUrls: ['./carrosel.component.scss'] 
})
export class CarroselComponent implements OnInit {
 equipamentos: Track_History[] = [];

 constructor(private trackhistoryService: trackhistoryService, public generalService: GeneralService) {}

  ngOnInit() {
    this.trackhistoryService.getEquipamentos().subscribe({
   next: (data: Track_History[]) => {
  this.equipamentos = data;
    console.log('Dados recebidos:', this.equipamentos); // Verifique os dados
     },
  error: (err:any) => {
        console.error("Erro ao buscar equipamentos:", err);
    }
   });
 }
  }
