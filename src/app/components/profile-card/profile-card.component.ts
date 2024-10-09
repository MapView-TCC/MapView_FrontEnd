import { Component } from '@angular/core';
import { TranslateModule ,} from '@ngx-translate/core';
import { MatCommonModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import {MatButtonModule}from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

//Imports from our components
import { TranslationService } from '../../services/translate/translation.service';


@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [TranslateModule,MatCommonModule,MatButtonModule,MatMenuModule,CommonModule,MatIconModule],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {

  constructor(private translationService: TranslationService) {}

  changeLanguage(language: string) {
    this.translationService.changeLanguage(language);
  }
}

