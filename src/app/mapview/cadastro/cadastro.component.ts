import { HeaderComponent } from '../header/header.component';
import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms'; // Criar formulários reativos
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    ReactiveFormsModule,
    MatIconModule, 
    FooterComponent
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {

  cadastroEquipamento!: FormGroup

  constructor(){
    this.cadastroEquipamento = new FormGroup({

    })
  }
  
}

