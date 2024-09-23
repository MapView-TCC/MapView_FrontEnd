// Imports for Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

//Import for our components
import { GeneralService } from '../../services/general/general.service';
import { HeaderComponent } from '../../components/header/header.component';
import { VizualizacaoFormComponent } from '../../components/vizualizacao-form/vizualizacao-form.component';
import { ExcluirPopupComponent } from '../../components/excluir-popup/excluir-popup.component';



interface item{
  usuario: string;
  laboratorio: string;
  posto: string;
  validade: string
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
    {usuario: 'Joao joao', laboratorio: 'Laboratorio 01', posto: 'Mesa 31', validade: '02/05/2025' },
    {usuario: 'Joao joao', laboratorio: 'Laboratorio 01', posto: 'Mesa 31', validade: '02/05/2025'}
  ]
  constructor(public generalService: GeneralService){

  }

  ngOnInit(): void{
   
  }

}
