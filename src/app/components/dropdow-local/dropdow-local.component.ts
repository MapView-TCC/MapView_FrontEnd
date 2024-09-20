import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dropdow-local',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dropdow-local.component.html',
  styleUrl: './dropdow-local.component.scss'
})
export class DropdowLocalComponent {
  //Parametros do dropdow
  @Input() id: string = '';
  @Input() options: {value: number | string; label: string}[] = [];
  @Input() selectedValue: string = '';
  @Input() table: string = '';
  @Input() control!: FormControl;

  @Output() selectedValueChange: EventEmitter<string> = new EventEmitter<string>(); 

  ngOnInit(): void{
    if(this.table === 'typeEquipament'){
      this.options = this.typeEquipamentOptions;
    }
    else if(this.table === 'course'){
      this.options = this.course;
    }
  }

  
  onSelectionChange() {
    console.log(this.control.value)
    this.selectedValue = this.control.value;
    this.selectedValueChange.emit(this.control.value); // Emite o valor selecionado
    
  }

  typeEquipamentOptions = [
    {value: 'Desktop', label: 'Desktop'},
    {value: 'Notebook', label: 'Notebook'},
    {value: 'Outro', label: 'Outro'}
  ]
  
  course = [
    {value: 'ADMINISTRACAO', label: 'Administração'},
    {value: 'DIGITAL_SOLUTIONS', label: 'Digital Solutions'},
    {value: 'MANUFATURA_DIGITAL', label: 'Manufatura Digital'},
    {value: 'MECATRONICA', label: 'Mecatrônica'}
  ]
}
