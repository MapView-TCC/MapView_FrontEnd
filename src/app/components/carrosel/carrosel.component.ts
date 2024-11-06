import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../services/general/general.service';
import { PrevDirective } from '../../services/carrosel/prev.directive';
import { NextDirective } from '../../services/carrosel/next.directive';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { WrongLocation } from '../../models/WrongLocation';
import { Equipment } from '../../models/Equipment';
import { CarrosselService } from '../../services/carrossel/carrossel.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-carrosel',
  standalone: true,
  imports: [PrevDirective, NextDirective, MatIconModule, CommonModule, TranslateModule],
  templateUrl: './carrosel.component.html',
  styleUrls: ['./carrosel.component.scss'] 
})
export class CarroselComponent implements OnInit {
 equipamentos: WrongLocation[] = [];

 constructor(private carrosselService: CarrosselService, public generalService: GeneralService) {}

  ngOnInit() {
    this.carrosselService.getEquipamentos().subscribe({
   next: (data: WrongLocation[]) => {
  this.equipamentos = data;
    console.log('Dados recebidos:', this.equipamentos); // Verifique os dados
     },
  error: (err:any) => {
        console.error("Erro ao buscar equipamentos:", err);
    }
   });
 }
  }
