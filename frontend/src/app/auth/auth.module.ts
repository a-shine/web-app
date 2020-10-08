import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { HttpClientModule } from '@angular/common/http';

// Angular Material
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { AuthService } from './auth.service';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [ RegisterComponent, LoginComponent, LogoutComponent ],
  imports: [
    SharedModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatStepperModule,
    MatFormFieldModule,
  ],
  exports: [ LogoutComponent, RegisterComponent, LoginComponent ],
  providers: [ AuthService ]
})
export class AuthModule { }
