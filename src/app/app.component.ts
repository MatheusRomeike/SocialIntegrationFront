import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'SocialIntegration';

  constructor(private translate: TranslateService) {
    const browserLang = window.navigator.language || 'en-US';
    const supportedLanguages = ['en-US', 'pt-BR'];
    const languageToUse = supportedLanguages.includes(browserLang)
      ? browserLang
      : 'en-US';
    this.translate.setDefaultLang(languageToUse);

    this.translate.use(languageToUse);
  }
}
