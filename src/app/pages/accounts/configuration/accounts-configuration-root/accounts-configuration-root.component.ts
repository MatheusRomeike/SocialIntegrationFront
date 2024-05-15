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
    // let socialNetworks = await this.accountsService.getSocialNetworksAsync();
    // let socialNetworksConfigurated =
    //   await this.accountsService.getSocialNetworksConfiguratedAsync();

    // socialNetworks = socialNetworks.map((x) => {
    //   if (!socialNetworksConfigurated.includes((y) => (y.id = x.id))) return x;
    // });

    //this.socialNetworks = [...socialNetworks, ...socialNetworksConfigurated];

    this.socialNetworks = [
      {
        id: 1,
        name: 'Instagram',
        url: 'https://www.instagram.com',
      },
    ];
  }
}
