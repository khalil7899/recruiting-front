import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAlertModule, NbButtonModule, NbCheckboxModule, NbIconModule, NbInputModule } from '@nebular/theme';

import { NgxLoginComponent } from './login/login.component'; // <---
import { NbThemeModule, NbLayoutModule, NbSidebarModule } from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,
    NbIconModule,
    NbThemeModule,
    NbLayoutModule,
    NbSidebarModule,

  ],
  declarations: [
    NgxLoginComponent, // <---
  ],
})
export class NgxAuthModule {
}