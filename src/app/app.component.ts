import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./mapview/header/header.component";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mapview';

  constructor(private translate: TranslateService) {
    // Defina o idioma padrão
    this.translate.setDefaultLang('en');
    
    // Use um idioma ao inicializar
    this.translate.use('en');
  }
}
