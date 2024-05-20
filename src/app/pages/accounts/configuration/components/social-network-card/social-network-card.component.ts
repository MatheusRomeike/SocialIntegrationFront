import { Component, Input } from '@angular/core';
import { AccountsService } from '../../../accounts.service';

@Component({
  selector: 'app-social-network-card',
  templateUrl: './social-network-card.component.html',
  styleUrl: './social-network-card.component.scss',
})
export class SocialNetworkCardComponent {
  @Input() data;

  constructor(private accountsService: AccountsService) {}

  openConfiguration() {
    let configuration = this.data.socialMediaConfiguration;
    let url = `${configuration.authorizationUrl}?client_id=${
      configuration.clientId
    }&redirect_uri=${encodeURIComponent(
      configuration.redirectUri
    )}&response_type=${configuration.responseType}&scope=${encodeURIComponent(
      configuration.scope
    )}`;

    console.log(url);

    window.open(url, '_blank');
  }
}
