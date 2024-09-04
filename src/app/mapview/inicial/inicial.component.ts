import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, NavigationEnd } from '@angular/router';
import { ProfileCardComponent } from '../../profile-card/profile-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { TraduzirComponent } from '../traduzir/traduzir.component';

@Component({
  selector: 'app-inicial',
  standalone: true,
  imports: [MatIconModule,CommonModule, TranslateModule,TraduzirComponent
],
  templateUrl: './inicial.component.html',
  styleUrl: './inicial.component.scss'
})
export class InicialComponent {
  router: any;

  showCard = false;

  toggleCard() {
    this.showCard = !this.showCard;
  }


  onInicial() {
    this.router.navigate(['']);
  }

}
