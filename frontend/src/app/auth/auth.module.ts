import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './auth.service';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [ RegisterComponent, LoginComponent, LogoutComponent ],
  imports: [
    SharedModule,
    HttpClientModule
  ],
  exports: [ LogoutComponent, RegisterComponent, LoginComponent ],
  providers: [ AuthService ]
})
export class AuthModule { }
