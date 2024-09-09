import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ExcluirPopupComponent } from '../excluir-popup/excluir-popup.component';
import { GeneralService } from '../services/general.service';
import { CommonModule } from '@angular/common';
import { VizualizacaoFormComponent } from '../vizualizacao-form/vizualizacao-form.component';


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
