import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-warning-btn-filters',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './warning-btn-filters.component.html',
  styleUrl: './warning-btn-filters.component.scss'
})
export class WarningBtnFiltersComponent {

  @Output() warningSelected = new EventEmitter<string>(); //Emite o botão selecionado para o componenente pai

  // Emite a opção RED
  selectedRedWarning() {
    this.warningSelected.emit('RED');
  }

  // Emite a opção YELLOW
  selectedYellowWarning() {
    this.warningSelected.emit('YELLOW');
  }

  // Emite a opção GREEN
  selectedGreenWarning() {
    this.warningSelected.emit('GREEN');
  }

}
