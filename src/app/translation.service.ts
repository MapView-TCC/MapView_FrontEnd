import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@Injectable({
  providedIn: 'root' // Isso faz com que o serviço seja injetado em toda a aplicação
})
export class TranslationService {

  constructor(private translate: TranslateService) {
    // Define o idioma padrão como português
    this.translate.setDefaultLang('pt');
    this.translate.use('pt'); // Ou qualquer outro idioma padrão
  }

  // Método para trocar o idioma
  changeLanguage(language: string) {
    this.translate.use(language);
  }

  // Método para obter o idioma atual
  getCurrentLanguage(): string {
    return this.translate.currentLang;
  }

  // Método para verificar se um idioma específico está ativo
  isCurrentLanguage(language: string): boolean {
    return this.translate.currentLang === language;
  }

  // Método para traduzir um texto programaticamente (opcional)
  translateText(key: string): string {
    return this.translate.instant(key);
  }
}
