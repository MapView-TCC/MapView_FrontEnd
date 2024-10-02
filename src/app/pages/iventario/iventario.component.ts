// Imports for Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventarioService } from '../../services/equipaments/inventario.service';
import { Equipment } from '../../models/Equipment';

//Import for our components
import { GeneralService } from '../../services/general/general.service';
import { HeaderComponent } from '../../components/header/header.component';
import { VizualizacaoFormComponent } from '../../components/vizualizacao-form/vizualizacao-form.component';
import { ExcluirPopupComponent } from '../../components/excluir-popup/excluir-popup.component';
import { LocationPopupComponent } from "../../components/location-popup/location-popup.component";
import { error } from 'console';




// interface item{
//   identificacao: string;
//   usuario: string;
//   laboratorio: string;
//   posto: string;
//   validade: string;
//   showOptions?: boolean // Controla a exibição do dropdown
// }

@Component({
  selector: 'app-iventario',
  standalone: true,
  imports: [HeaderComponent, ExcluirPopupComponent, CommonModule, VizualizacaoFormComponent, LocationPopupComponent],
  templateUrl: './iventario.component.html',
  styleUrl: './iventario.component.scss'
})
export class IventarioComponent  implements OnInit{
  equipment: Equipment[] =[]
generalService: any;
  constructor(private inventarioService: InventarioService){}

  ngOnInit(): void{
   this.loadItems();
  }

 

  loadItems(){
    this.inventarioService.getEquipments().subscribe(
      data => {
          this.equipment = data;
      },
     
  );
  }

}
