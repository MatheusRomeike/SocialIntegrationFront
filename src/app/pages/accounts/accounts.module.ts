import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsManageRootComponent } from './manage/accounts-manage-root/accounts-manage-root.component';
import { AccountsPublishRootComponent } from './publish/accounts-publish-root/accounts-publish-root.component';
import { InstagramPreviewComponent } from './publish/components/preview/instagram-preview/instagram-preview.component';

@NgModule({
  declarations: [
    AccountsPublishRootComponent,
    AccountsManageRootComponent,
    InstagramPreviewComponent,
  ],
  imports: [AccountsRoutingModule, SharedModule],
})
export class AccountsModule {}
