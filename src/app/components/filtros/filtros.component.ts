import { Component } from '@angular/core';
import { TranslateModule ,} from '@ngx-translate/core';
import { MatCommonModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import {MatButtonModule}from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { GeneralService } from '../../services/general/general.service';


@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [MatCommonModule,MatButtonModule,MatMenuModule,CommonModule,MatIconModule,TranslateModule],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.scss'
})
export class FiltrosComponent {

  
  activeButton: string = '';

  setActive(button: string) {
    this.activeButton = button;
  }

  constructor(public generalService:GeneralService){}

  

}
