import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { LoggedInGuard } from './auth/_guards/loggedin.guard';
import { LoggedOutGuard } from './auth/_guards/loggedout.guard';

import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { RegisterComponent } from './auth/register/register.component';

import { HomeComponent } from './core/home/home.component';
import { SettingsComponent } from './core/settings/settings.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent, canActivate: [LoggedOutGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard] },
  { path: 'logout', component: LogoutComponent, canActivate: [LoggedInGuard] },
  { path: 'notauthorised', redirectTo:'login', pathMatch:'full' },
  { path: '', component: HomeComponent, canActivate: [LoggedInGuard]},
  { path: 'settings', component: SettingsComponent, canActivate: [LoggedInGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
