import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TranslateModule} from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { FilteredEquipment } from '../../../models/FilteredEquipment';

@Component({
  selector: 'app-search-popup',
  standalone: true,
  imports: [TranslateModule, CommonModule, MatIcon],
  templateUrl: './search-popup.component.html',
  styleUrl: './search-popup.component.scss'
})
export class SearchPopupComponent {
  @Input() equipment: FilteredEquipment[] = [];
  @Output() close = new EventEmitter<void>();


  closePopUp() {
    this.close.emit();
  }

}
