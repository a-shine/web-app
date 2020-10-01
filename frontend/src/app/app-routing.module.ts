import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { LoggedInGuard } from './auth/_guards/loggedin.guard';
import { LoggedOutGuard } from './auth/_guards/loggedout.guard';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { SettingsComponent } from './core/settings/settings.component';


const routes: Routes = [
  //{ path: '', redirectTo:'dash', pathMatch:'full' },

  { path: 'notauthorised', redirectTo:'login', pathMatch:'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard] },
  { path: 'signup', component: RegisterComponent, canActivate: [LoggedOutGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [LoggedInGuard] },


  //{ path: '**', redirectTo:'dash' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
