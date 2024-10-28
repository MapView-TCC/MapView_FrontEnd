import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

//Imports from our componentes
import { TranslationService } from '../../services/translate/translation.service';

@Component({
  selector: 'app-traduzir',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatCommonModule, MatButtonModule, MatMenuModule, MatIconModule,],
  templateUrl: './traduzir.component.html',
  styleUrl: './traduzir.component.scss'
})
export class TraduzirComponent {

  constructor(private translationService: TranslationService) { }

  changeLanguage(language: string) {
    this.translationService.changeLanguage(language);
  }

}
