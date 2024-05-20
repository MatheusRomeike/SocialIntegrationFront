import { Component, OnInit } from '@angular/core';
import { Loading } from 'src/app/shared/decorators/loading.decorator';
import { AccountsService } from '../../accounts.service';

@Component({
  selector: 'app-accounts-configuration-root',
  templateUrl: './accounts-configuration-root.component.html',
  styleUrl: './accounts-configuration-root.component.scss',
})
export class AccountsConfigurationRootComponent implements OnInit {
  constructor(private accountsService: AccountsService) {}

  socialNetworks;

  async ngOnInit() {
    await this.load();
  }

  @Loading()
  async load() {
    let accounts = await this.accountsService.getAccountsAsync();

    this.socialNetworks = await this.accountsService.getSocialMediasAsync();

    this.socialNetworks = this.socialNetworks.map((socialNetwork) => {
      let account = accounts.find(
        (account) => account.socialMediaId === socialNetwork.id
      );

      return {
        ...socialNetwork,
        account,
      };
    });
  }
}
