import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private translate: TranslateService, @Inject(DOCUMENT) private document: Document) {
    const localStorage = this.document.defaultView?.localStorage as Storage;
    const storedLanguage = localStorage?.getItem('language') || 'pt';
    this.translate.setDefaultLang('pt');
    this.translate.use(storedLanguage);
    console.log('Idioma inicial:', this.translate.currentLang);
  }

  changeLanguage(language: string) {
    // Verifica se o idioma é diferente do atual antes de mudar
    if (this.translate.currentLang !== language) {
      console.log('Mudando para o idioma:', language);
      this.translate.use(language);
      localStorage.setItem('language', language); // Atualiza o localStorage
    }
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang;
  }

  isCurrentLanguage(language: string): boolean {
    return this.translate.currentLang === language;
  }

  translateText(key: string): string {
    return this.translate.instant(key);
  }
}
