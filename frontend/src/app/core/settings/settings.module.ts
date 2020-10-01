import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings.component';

import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [SettingsComponent],
  imports: [
    SharedModule,
  ],
  exports: [SettingsComponent]
})
export class SettingsModule { }
