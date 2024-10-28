import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GeneralService } from '../../services/general/general.service';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss'
})
export class ErrorMessageComponent {
 
  
  @Input() formGroup!: FormGroup; // Recebe o FormGroup do componente pai
  @Input() inputSelect!: string ; // Nome do campo (FormControl)
  @Input() errorType!: string; // Tipo de erro a ser verificado (ex: 'required')
  @Input() errorMessage!: string; // Mensagem de erro a ser exibida

  

}
