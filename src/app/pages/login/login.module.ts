import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginRootComponent } from './login-root/login-root.component';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  declarations: [LoginRootComponent],
  imports: [LoginRoutingModule, SharedModule],
})
export class LoginModule {}
