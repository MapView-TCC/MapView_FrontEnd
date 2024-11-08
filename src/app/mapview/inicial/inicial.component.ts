import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { TraduzirComponent } from '../traduzir/traduzir.component';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-inicial',
  standalone: true,
  imports: [MatIconModule,CommonModule, TranslateModule,TraduzirComponent
],
  templateUrl: './inicial.component.html',
  styleUrl: './inicial.component.scss'
})
export class InicialComponent implements OnInit {
  router: any;

  showCard = false;

  toggleCard() {
    this.showCard = !this.showCard;
  }


  onInicial() {
    this.router.navigate(['']);
  }

  constructor(private translator: TranslationService){}

  ngOnInit(): void {
    this.translator.getCurrentLanguage();
    console.log(this.translator.getCurrentLanguage());
  }

}
