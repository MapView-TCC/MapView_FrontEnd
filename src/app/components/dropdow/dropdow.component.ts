import { Component, Input, Output, EventEmitter, EnvironmentInjector} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildingDrpService } from '../../services/dropdow-building/building-drp.service';
import { BuildingDrp } from '../../models/BuldingDrp';
import { EnviromentDrpService } from '../../services/dropdow-enviroment/enviroment-drp.service';
import { Enviroment } from '../../models/Enviroment';

@Component({
  selector: 'app-dropdow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdow.component.html',
  styleUrl: './dropdow.component.scss'
})


export class DropdowComponent {
  
  @Input() id: string = '';
  @Input() options: Array<BuildingDrp> | Array<Enviroment> = []; // Array de opções
  @Input() selectedValue: string = ''; // Valor selecionado inicialmente, pode ser vazio ou predefinido
  @Input() table: string= ''; //passar qual tabela ele puxa do banco 

  @Output() selectedValueChange: EventEmitter<string> = new EventEmitter<string>(); 
  
  
  constructor(
    private buildingDrpService: BuildingDrpService,
    private enviromentDrpService: EnviromentDrpService
  ){}
  
  ngOnInit():void{
    if (this.table === 'building'){
      this.fetchBuildingOptions();
      
    } else if (this.table === 'enviroment'){
      this.fetchEnviromentOptions();
    }else if (this.table === 'equipament'){

    }else if (this.table === 'course'){

    }
  }

    // Método para buscar prédios (Building)
  fetchBuildingOptions(): void {
    this.buildingDrpService.getBulding().subscribe((data: BuildingDrp[]) => {
      // Sem alterar a estrutura, apenas atribui diretamente se for compatível
      this.options = data;
    });
  }

  // Método para buscar ambientes (Enviroments)
  fetchEnviromentOptions(): void {
    this.enviromentDrpService.getEnviroment().subscribe((data: Enviroment[]) => {
      // Sem alterar a estrutura, apenas atribui diretamente se for compatível
      this.options = data;
    });
  }

  setEquipamentOptions(): void {
    // Defina aqui as opções locais para o dropdown
    this.options = [
      {id: 'Desktop', name: 'Desktop'},
      {id: 'Notebook', name: 'Notebook'}, 
      {id: 'Outro', name: 'Outro'}
    ];
  }

  setCourseOptions():void{
    this.options = [

    ]
  }

  
  onChange(event:Event): void{
    const selectElement = event.target as HTMLSelectElement;
    this.selectedValue = selectElement.value;
  }


  
  //Área de DropDow
 


}
