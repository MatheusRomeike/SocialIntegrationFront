import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsConfigurationRootComponent } from './configuration/accounts-configuration-root/accounts-configuration-root.component';
import { SocialNetworkCardComponent } from './configuration/components/social-network-card/social-network-card.component';
import { AccountsPublishRootComponent } from './publish/accounts-publish-root/accounts-publish-root.component';
import { InstagramPreviewComponent } from './publish/components/preview/instagram-preview/instagram-preview.component';

@NgModule({
  declarations: [
    AccountsPublishRootComponent,
    InstagramPreviewComponent,
    AccountsConfigurationRootComponent,
    SocialNetworkCardComponent,
  ],
  imports: [AccountsRoutingModule, SharedModule],
})
export class AccountsModule {}
