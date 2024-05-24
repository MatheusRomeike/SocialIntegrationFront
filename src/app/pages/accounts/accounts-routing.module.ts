import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsConfigurationRootComponent } from './configuration/accounts-configuration-root/accounts-configuration-root.component';
import { DisconnectRootComponent } from './oauth/disconnect-root/disconnect-root.component';
import { RedirectRootComponent } from './oauth/redirect-root/redirect-root.component';
import { AccountsPublishRootComponent } from './publish/accounts-publish-root/accounts-publish-root.component';

const routes: Routes = [
  { path: 'publish', component: AccountsPublishRootComponent },
  { path: 'configuration', component: AccountsConfigurationRootComponent },
  { path: 'oauthredirect/:socialMediaName', component: RedirectRootComponent },
  { path: 'disconnect/:socialMediaName', component: DisconnectRootComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsRoutingModule {}
