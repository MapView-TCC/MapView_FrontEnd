import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import moment from 'moment';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, MatIconModule, TranslateModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss'
})
export class CalendarioComponent implements OnInit{
  currentMonth: moment.Moment;
  days: moment.Moment[];
  selectedDate: moment.Moment | null = null;

  // Emissor de evento para a data selecionada
  @Output() dateSelected = new EventEmitter<moment.Moment>();


  constructor(){
    this.currentMonth = moment();
    this.days = [];
  }

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar(): void {

    // Use o método startOf corretamente
    let startOfMonth = this.currentMonth.clone().startOf('month').startOf('week');
    const endOfMonth = this.currentMonth.clone().endOf('month').endOf('week')
    
    let day = startOfMonth.clone();
    this.days = [];

    while (day.isBefore(endOfMonth, 'day')){
      this.days.push(day.clone());
      day.add(1, 'day');
    }
  }

  isToday(day: moment.Moment): boolean {
    return day.isSame(moment(), 'day');
  }

  isSelected(day: moment.Moment): boolean {
    return this.selectedDate ? day.isSame(this.selectedDate, 'day') : false;
  }

  selectDate(day: moment.Moment): void {
    this.selectedDate = day;
    // Emitindo a data selecionada para o componente pai
    this.dateSelected.emit(this.selectedDate);
  }

  changeMonth(offset: number): void {
    this.currentMonth.add(offset, 'month');
    this.generateCalendar();
  }

}
