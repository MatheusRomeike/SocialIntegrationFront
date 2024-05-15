import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsConfigurationRootComponent } from './configuration/accounts-configuration-root/accounts-configuration-root.component';
import { AccountsPublishRootComponent } from './publish/accounts-publish-root/accounts-publish-root.component';

const routes: Routes = [
  { path: 'publish', component: AccountsPublishRootComponent },
  { path: 'configuration', component: AccountsConfigurationRootComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsRoutingModule {}
