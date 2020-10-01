import { NgModule } from '@angular/core';

/*
* As I understand it, we import modules that will be used across our app into this SharedModule, and re-export these modules.
* Now any module that imports SharedModule has access to all the modules imported into SharedModule!
* For instance, I have now removed 'import NgModule' and 'import CommonModule' from the auth and core modules, because they now import SharedModule.
*/

// The basics for an Angular Module.
import { CommonModule } from '@angular/common';

// Using this for resizing divs.
import { AngularDraggableModule } from 'angular2-draggable';

// New module for resizing stuff

// Using this for drag and drop div behaviour.
import { DragDropModule } from '@angular/cdk/drag-drop';

// I moved the following form-modules from AuthModule to SharedModule, as most likely we will be using reactive forms across our app.
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Materials UI
// Moved from NavbarModule to SharedModule, we will most likely be using Materials across the application.
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';

// I don't know what we use this for but you added it so I moved it to shared.
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    AngularDraggableModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatMenuModule,
    BrowserAnimationsModule,
    RouterModule
  ]
})
export class SharedModule { }
