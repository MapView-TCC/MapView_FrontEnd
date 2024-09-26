import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BuildingDrpService } from '../../services/dropdow-building/building-drp.service';
import { EnviromentDrpService } from '../../services/dropdow-enviroment/enviroment-drp.service';
import { BuildingDrp } from '../../models/BuldingDrp';
import { Enviroment } from '../../models/Enviroment';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AreaDrpService } from '../../services/dropdow-area/area-drp.service';
import { Area } from '../../models/Area';

@Component({
  selector: 'app-dropdow-dynamic',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dropdow-dynamic.component.html',
  styleUrl: './dropdow-dynamic.component.scss'
})
export class DropdowDynamicComponent implements OnInit{

  constructor(private buldingDrp: BuildingDrpService, private enviromentDrop: EnviromentDrpService, private areaDrp: AreaDrpService) {}

  @Input() options: {value: number | string, label: string}[] = [];
  @Input() selectedValue: string = '';
  @Input() table: string = '';
  @Input() control!: FormControl;

  @Output() selectedValueChange = new EventEmitter<number | string>();

  buildingOptions: { value: number, label: string }[] = [];
  enviromentOptions: { value: number, label: string }[] = [];
  areaOptions: {value: number, label: string}[] = [];


  ngOnInit(){
    if(this.table === 'building'){
      this.loadBuildings();
    }
    else if(this.table === 'enviroment'){
      this.loadEnviroments()
    }
    else if(this.table === 'area'){
      this.loadAreas()
    }

    if(!this.options || !this.options.length){
      console.error('Dropdown options are required');
    }
  }

  onSelect() {
    console.log(this.control.value)
    this.selectedValue = this.control.value;
    this.selectedValueChange.emit(this.control.value);
  }

  // Lembre-se de que o HTML de um <select> não pode conter elementos que não sejam <option>. 
  //Portanto, o botão não pode ser colocado dentro do dropdown. O botão é colocado fora do dropdown e é exibido apenas quando a opção "Custom Option" é selecionada.
  onCustomAction() {
    // Lógica para o botão dentro da opção
    console.log('Custom action triggered!');
  }

  // Função que pega os valores da tabela Bulding 
  loadBuildings(){
    this.buldingDrp.getBulding().subscribe((buildings: BuildingDrp[]) =>{
      this.buildingOptions = buildings.map(data => ({
        value: data.id_building,
        label: data.building_code
      }))
      this.options = this.buildingOptions;
    })
  }
  // Função que pega os valores da tabelaEnviroments 
  loadEnviroments(){
    this.enviromentDrop.getEnviroment().subscribe((enviroments: Enviroment[]) => {
      this.enviromentOptions = enviroments.map(data =>({
        value: data.id_enviroment,
        label: data.environment_name
      }))
      this.options = this.enviromentOptions;
    })
  }

   // Função que pega os valores da tabela Area
   loadAreas(){
    this.areaDrp.getArea().subscribe((areas: Area[]) => {
      this.areaOptions = areas.map(data =>({
        value: data.id_area,
        label: data.area_code
      }))
      this.options = this.areaOptions;
    })
  }
  
}
