import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

//Imports from our componentes
import { TranslationService } from '../../../services/translate/translation.service';

@Component({
  selector: 'app-translate-card',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatCommonModule, MatButtonModule, MatMenuModule, MatIconModule,],
  templateUrl: './translate-card.component.html',
  styleUrl: './translate-card.component.scss'
})
export class TranslateCardComponent {

  constructor(private translationService: TranslationService) { }

  changeLanguage(language: string) {
    this.translationService.changeLanguage(language);
  }

}
