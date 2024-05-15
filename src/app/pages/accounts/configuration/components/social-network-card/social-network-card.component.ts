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
    this.accountsService.initiateAuth();
  }
}
