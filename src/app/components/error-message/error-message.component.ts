import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss'
})
export class ErrorMessageComponent {


  @Input() formGroup!: FormGroup; // Recebe o FormGroup do componente pai
  @Input() inputSelect!: string; // Recebe o nome do campo (formControl) do componente pai
  @Input() errorType!: string; // Tipo de erro a ser verificado (ex: 'required')
  @Input() errorMessage!: string; // Mensagem de erro a ser exibida



}
