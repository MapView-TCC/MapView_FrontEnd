import { Component } from '@angular/core';
import { TranslationService } from '../translation.service';
import { TranslateModule ,TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {

  constructor(private translationService: TranslationService) {}

  // Método para trocar o idioma usando o serviço de tradução
  changeLanguage(language: string) {
    this.translationService.changeLanguage(language);
  }

  toggleAccessibility() {
    console.log('Acessibilidade ativada/desativada');
  }

}
