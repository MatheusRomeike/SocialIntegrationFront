import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsManageRootComponent } from './manage/accounts-manage-root/accounts-manage-root.component';
import { AccountsPublishRootComponent } from './publish/accounts-publish-root/accounts-publish-root.component';

const routes: Routes = [
  { path: 'publish', component: AccountsPublishRootComponent },
  { path: 'manage', component: AccountsManageRootComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsRoutingModule {}
