import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { GeneralService } from '../../services/general/general.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-filter-popup',
  standalone: true,
  imports: [CommonModule,MatCommonModule,MatIconModule,],
  templateUrl: './filter-popup.component.html',
  styleUrl: './filter-popup.component.scss'
})
export class FilterPopupComponent {

 constructor( public generalService: GeneralService){}

}
