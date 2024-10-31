import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { GeneralService } from '../../../services/general/general.service';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-no-results-popup',
  standalone: true,
  imports: [CommonModule,MatCommonModule,MatIconModule, TranslateModule],
  templateUrl: './no-results-popup.component.html',
  styleUrl: './no-results-popup.component.scss'
})
export class NoResultsPopupComponent {

 constructor( public generalService: GeneralService){}

}
