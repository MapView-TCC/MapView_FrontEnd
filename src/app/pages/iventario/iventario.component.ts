// Imports for Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

//Import for our components
import { GeneralService } from '../../services/general.service';
import { HeaderComponent } from '../../components/header/header.component';
import { VizualizacaoFormComponent } from '../../components/vizualizacao-form/vizualizacao-form.component';
import { ExcluirPopupComponent } from '../../components/excluir-popup/excluir-popup.component';


@Component({
  selector: 'app-iventario',
  standalone: true,
  imports: [HeaderComponent,ExcluirPopupComponent,CommonModule,VizualizacaoFormComponent],
  templateUrl: './iventario.component.html',
  styleUrl: './iventario.component.scss'
})
export class IventarioComponent  implements OnInit{

  constructor(public generalService: GeneralService){

  }

  ngOnInit(): void{

  }

}
