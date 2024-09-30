import { Injectable } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private translate: TranslateService) {}

  getCurrentLanguage(): string {
    return this.translate.currentLang || this.translate.getDefaultLang();
  }

  setCurrentLanguage(lang: string): void {
    this.translate.use(lang);
  }

  onLanguageChange(callback: (lang: string) => void): Subscription {
    // Return the Subscription so the caller can manage it
    return this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      callback(event.lang);
    });
  }
}
