import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-excluir-popup',
  standalone: true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './excluir-popup.component.html',
  styleUrl: './excluir-popup.component.scss'
})
export class ExcluirPopupComponent implements OnInit{

  constructor(public generalService:GeneralService){}

  ngOnInit(): void{

  }

}
