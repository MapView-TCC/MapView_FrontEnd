// Imports for Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

//Import for our components
import { GeneralService } from '../../services/general/general.service';
import { HeaderComponent } from '../../components/header/header.component';
import { VizualizacaoFormComponent } from '../../components/vizualizacao-form/vizualizacao-form.component';
import { ExcluirPopupComponent } from '../../components/excluir-popup/excluir-popup.component';



interface item{
  identificacao: string;
  usuario: string;
  laboratorio: string;
  posto: string;
  validade: string;
  showOptions?: boolean // Controla a exibição do dropdown
}

@Component({
  selector: 'app-iventario',
  standalone: true,
  imports: [HeaderComponent,ExcluirPopupComponent,CommonModule,VizualizacaoFormComponent],
  templateUrl: './iventario.component.html',
  styleUrl: './iventario.component.scss'
})
export class IventarioComponent  implements OnInit{
  itens: item[] =[
    {identificacao: 'JVL-C-OOO9X',usuario: 'CT67CA', laboratorio: 'Laboratorio 01', posto: 'PC 01', validade: '2027.Q1',showOptions: false },
    {identificacao: 'JVL-C-OOO9X',usuario: 'CT67CA', laboratorio: 'Laboratorio 01', posto: 'PC 01', validade: '2027.Q1', showOptions: false}
  ]
  constructor(public generalService: GeneralService){

  }

  ngOnInit(): void{
   
  }

}
