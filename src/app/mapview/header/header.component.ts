import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { ProfileCardComponent } from '../../profile-card/profile-card.component';
import { TranslateLoader, TranslateModule,TranslateService  } from '@ngx-translate/core';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,MatIconModule,ProfileCardComponent,TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showProfileCard = false;

  toggleProfileCard() {
    this.showProfileCard = !this.showProfileCard;
  }

  selectedItem: string = 'Ambientes'; // Item padrão selecionado

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateSelectedItem();
    });
  }

  private updateSelectedItem() {
    const currentRoute = this.router.url;
    if (currentRoute.includes('ambiente')) {
      this.selectedItem = 'Ambientes';
    } else if (currentRoute.includes('cadastro')) {
      this.selectedItem = 'Cadastro';
    } else if (currentRoute.includes('historico')) {
      this.selectedItem = 'Historico';
    } else if (currentRoute.includes('iventario')) {
      this.selectedItem = 'Iventario';
    }
  }

  onAmbiente() {
    this.router.navigate(['/mapview/ambiente']);
  }

  onCadastro() {
    this.router.navigate(['/mapview/cadastro']);
  }

  onHistorico() {
    this.router.navigate(['/mapview/historico']);
  }

  onIventario() {
    this.router.navigate(['/mapview/iventario']);
  }
}

