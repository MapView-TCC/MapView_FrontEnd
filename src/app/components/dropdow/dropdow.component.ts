import { Component, Input, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdow.component.html',
  styleUrl: './dropdow.component.scss'
})


export class DropdowComponent {
  @Input() id: string = '';
  @Input() options: { value: number | string; label: string }[] = []; // Array de opções
  @Input() selectedValue: string = ''; // Valor selecionado inicialmente, pode ser vazio ou predefinido

  // Output para emitir mudanças no valor selecionado
  @Output() selectedValueChange: EventEmitter<string> = new EventEmitter<string>(); 
 
  onChange(event:Event): void{
    const selectElement = event.target as HTMLSelectElement;
    this.selectedValue = selectElement.value;
  }
}
