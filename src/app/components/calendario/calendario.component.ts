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
export class CalendarioComponent implements OnInit {

  // Armazena o mês atual sendo exibido no calendário
  currentMonth: moment.Moment;

  // Lista de dias para preencher o calendário no template
  days: moment.Moment[];

  // Armazena a data selecionada pelo usuário (opcional)
  selectedDate: moment.Moment | null = null;

  // Evento para enviar a data selecionada para o componente pai
  @Output() dateSelected = new EventEmitter<moment.Moment>();

  constructor() {
    // Inicializa o mês atual como o mês atual do sistema
    this.currentMonth = moment();

    // Inicializa a lista de dias vazia
    this.days = [];
  }

  // Método executado ao inicializar o componente
  ngOnInit(): void {
    this.generateCalendar();
  }

  // Gera os dias a serem exibidos no calendário para o mês atual
  generateCalendar(): void {
    // Calcula o primeiro dia a ser exibido no calendário (início da semana do primeiro dia do mês)
    let startOfMonth = this.currentMonth.clone().startOf('month').startOf('week');

    // Calcula o último dia a ser exibido no calendário (final da semana do último dia do mês)
    const endOfMonth = this.currentMonth.clone().endOf('month').endOf('week');

    // Cria uma cópia do dia de início para iterar
    let day = startOfMonth.clone();

    // Limpa a lista de dias antes de preenchê-la
    this.days = [];

    // Adiciona os dias até o final do mês (incluindo o intervalo de dias até o final da semana)
    while (day.isBefore(endOfMonth, 'day')) {
      this.days.push(day.clone());
      day.add(1, 'day');
    }
  }

  // Verifica se um dia corresponde à data de hoje
  isToday(day: moment.Moment): boolean {
    return day.isSame(moment(), 'day');
  }

  // Verifica se um dia corresponde à data selecionada
  isSelected(day: moment.Moment): boolean {
    return this.selectedDate ? day.isSame(this.selectedDate, 'day') : false;
  }

  // Define a data selecionada e emite o evento para o componente pai
  selectDate(day: moment.Moment): void {
    this.selectedDate = day;
    this.dateSelected.emit(this.selectedDate);
  }

  // Altera o mês exibido ao incrementar ou decrementar a quantidade de meses
  changeMonth(offset: number): void {
    this.currentMonth.add(offset, 'month');
    this.generateCalendar();
  }
}
