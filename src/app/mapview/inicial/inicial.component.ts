import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, NavigationEnd } from '@angular/router';
import { ProfileCardComponent } from '../../profile-card/profile-card.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-inicial',
  standalone: true,
  imports: [MatIconModule,CommonModule , ProfileCardComponent, TranslateModule
],
  templateUrl: './inicial.component.html',
  styleUrl: './inicial.component.scss'
})
export class InicialComponent {
  router: any;

  showProfileCard = false;

  toggleProfileCard() {
    this.showProfileCard = !this.showProfileCard;
  }


  onInicial() {
    this.router.navigate(['']);
  }

}
