import { Component, Input, OnInit, input } from '@angular/core';
import { Equipment } from '../../../models/Equipment';
import { GeneralService } from '../../../services/general/general.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent implements OnInit{

  @Input() equipment: any; // Recebe o equipamento do componente pai

  close(){
    
  }

  constructor(public generalService:GeneralService){}
  
  ngOnInit(): void {}

}
