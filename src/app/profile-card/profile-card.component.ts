import { Component } from '@angular/core';
import { TranslationService } from '../translation.service';
import { TranslateModule ,TranslateService } from '@ngx-translate/core';
import { MatCommonModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import {MatButtonModule}from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

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
    console.log('Mudando idioma para:', language); // Adicione log para depuração
    this.translationService.changeLanguage(language);
  }
}

