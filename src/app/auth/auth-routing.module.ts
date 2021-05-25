import {  NgxRegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgxLoginComponent } from './login/login.component'; // <---

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'auth/login',
        component: NgxLoginComponent,
      },
      {
        path: 'auth/register',
        component: NgxRegisterComponent,
      },

    ],
  },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}