import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { EquipmentResponsible } from '../../../models/EquipmentResponsible';
import { FilteredEquipment } from '../../../models/Equipment';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [TranslateModule, CommonModule, MatIcon],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.scss'
})
export class PopUpComponent {
  @Input() equipment: FilteredEquipment[] = [];
  @Output() close = new EventEmitter<void>();


  closePopUp() {
    this.close.emit();
  }

}
