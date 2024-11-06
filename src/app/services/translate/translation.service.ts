import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private localStorage: Storage | null;

  constructor(private translate: TranslateService, @Inject(DOCUMENT) private document: Document) {
    this.localStorage = this.document.defaultView?.localStorage || null;

    // Usa o idioma armazenado no localStorage, se disponível, ou define como português
    const storedLanguage = this.localStorage?.getItem('language') || 'pt';
    console.log('Idioma armazenado ao iniciar:', storedLanguage);
    this.translate.setDefaultLang('pt');
    this.translate.use(storedLanguage);
  }

  changeLanguage(language: string) {
    if (this.translate.currentLang !== language) {
      console.log('Mudando para o idioma:', language);
      this.translate.use(language).subscribe(() => {
        localStorage.setItem('language', language); // Atualiza o localStorage
        console.log(this.translate.instant('DISPOSITIVO_NAO_ENCONTRADO')); // Verifica a tradução após a mudança
      });
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
