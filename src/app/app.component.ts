import { Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import {  TranslateModule, TranslateService } from '@ngx-translate/core';
import {  HttpClientModule } from '@angular/common/http';
import { InicialComponent } from "./pages/inicial/inicial.component";
import { CommonModule } from '@angular/common';
import { TranslationService } from './services/translate/translation.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    HeaderComponent, 
    HttpClientModule, 
    TranslateModule,
    InicialComponent, CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  title = 'mapview';

  constructor(private translate: TranslateService, private translation: TranslationService) {
    // Defina o idioma padrão
    // this.translate.setDefaultLang('pt');
    // Use um idioma ao inicializar
    this.translate.use(this.translation.getCurrentLanguage());

    console.log(this.translate.currentLang);
  }

}
