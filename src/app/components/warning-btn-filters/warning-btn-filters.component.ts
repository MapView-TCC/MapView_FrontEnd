import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-warning-btn-filters',
  standalone: true,
  imports: [CommonModule, MatIcon, TranslateModule],
  templateUrl: './warning-btn-filters.component.html',
  styleUrl: './warning-btn-filters.component.scss'
})
export class WarningBtnFiltersComponent {
  
  @Output() warningSelected = new EventEmitter<string>();

  selectedRedWarning(){
    this.warningSelected.emit('RED');
  }

  selectedYellowWarning(){
    this.warningSelected.emit('YELLOW');
  }

  selectedGreenWarning(){
    this.warningSelected.emit('GREEN');
  }

}
