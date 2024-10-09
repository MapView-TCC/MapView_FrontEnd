import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TranslateLoader, TranslateModule,TranslateService  } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Equipment } from '../../../models/Equipment';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [TranslateModule, CommonModule, MatIcon],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.scss'
})
export class PopUpComponent {
  @Input() equipment: Equipment[]=[];
  @Output() close = new EventEmitter<void>();

  closePopUp(){
    this.close.emit();
  }

}
