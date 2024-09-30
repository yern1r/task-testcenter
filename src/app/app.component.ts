import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { environment } from './environments/environment';
import { LanguageService } from './services/language.service';
import { MetallSearcherComponent } from './metall-searcher/metall-searcher.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MetallSearcherComponent,CommonModule,TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'test-task';

  constructor(
    private translateService: TranslateService,
    private languageService: LanguageService
  ){
    translateService.setDefaultLang('ru');
  }

  ngOnInit(): void {
    this.translateService.use(environment.defaultLocale);
    this.languageService.getCurrentLanguage();
  }
}
