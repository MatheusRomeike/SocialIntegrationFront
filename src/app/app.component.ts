import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { supportedLanguages } from 'src/assets/i18n/supported-language';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'SocialIntegration';

  constructor(private translate: TranslateService) {
    const browserLang = window.navigator.language || 'en-US';
    const languageToUse = supportedLanguages.includes(browserLang)
      ? browserLang
      : 'en-US';
    this.translate.setDefaultLang(languageToUse);

    this.translate.use(languageToUse);
  }
}
