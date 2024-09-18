import { Component, Input, Output, EventEmitter, EnvironmentInjector} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildingDrpService } from '../../services/dropdow-building/building-drp.service';
import { BuildingDrp } from '../../models/BuldingDrp';

@Component({
  selector: 'app-dropdow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdow.component.html',
  styleUrl: './dropdow.component.scss'
})


export class DropdowComponent {
  
  constructor(private buldingDrp: BuildingDrpService){ }
  
  @Input() id: string = '';
  @Input() options: Array<BuildingDrp> = []; // Array de opções
  @Input() selectedValue: string = ''; // Valor selecionado inicialmente, pode ser vazio ou predefinido
  @Input() table: string=''; //passar qual tabela ele puxa do banco 

  @Output() selectedValueChange: EventEmitter<string> = new EventEmitter<string>(); 

  
  onChange(event:Event): void{
    const selectElement = event.target as HTMLSelectElement;
    this.selectedValue = selectElement.value;
  }

  
  //Área de DropDow
 


}
