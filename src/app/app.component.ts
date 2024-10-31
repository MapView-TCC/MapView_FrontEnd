import { Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import {  TranslateModule, TranslateService } from '@ngx-translate/core';
import {  HttpClientModule } from '@angular/common/http';
import { HomeComponent} from "./pages/home/home.component";
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    HeaderComponent, 
    HttpClientModule, 
    TranslateModule,
    CommonModule,
    HomeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  title = 'mapview';

  constructor(private translate: TranslateService) {
    // Defina o idioma padrão
    this.translate.setDefaultLang('pt');
    // Use um idioma ao inicializar
    this.translate.use('pt');
  }

}
