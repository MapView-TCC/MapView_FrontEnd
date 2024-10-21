import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss'
})

export class AutocompleteComponent {
  @Input() stateForm!: FormGroup;
  @Input() options: string[] = [];
  filteredOptions: string[] = [];
  showOptions = false;

  @Output() optionSelected = new EventEmitter<string>();


  constructor(private fb: FormBuilder) {
    this.stateForm = this.fb.group({
      stateGroup: ['']
    });
  }

  // Exibe todas as opções ao focar no input
  onFocus() {
    this.filteredOptions = this.options; // Mostra todas as opções ao focar
    this.showOptions = true;
  }

  // Filtra as opções enquanto o usuário digita
  onInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.filteredOptions = this.options.filter(option =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  selectOption(option: string) {
    this.stateForm.patchValue({ stateGroup: option });
    this.showOptions = false;
    this.optionSelected.emit(option);//Emite a opção escolhida para o pai
    this.showOptions = false;
  }

  onBlur() {
    setTimeout(() => {
      this.showOptions = false;
    }, 100); // Delay para permitir o clique nas opções
  }
}
