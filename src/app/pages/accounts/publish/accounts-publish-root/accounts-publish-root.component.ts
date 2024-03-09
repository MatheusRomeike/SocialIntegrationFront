import { Component } from '@angular/core';
import { TestService } from '../test.service';

@Component({
  selector: 'app-accounts-publish-root',
  templateUrl: './accounts-publish-root.component.html',
  styleUrl: './accounts-publish-root.component.scss',
})
export class AccountsPublishRootComponent {
  constructor(private testService: TestService) {}

  publish() {
    this.testService.postTwitter();
  }
}
