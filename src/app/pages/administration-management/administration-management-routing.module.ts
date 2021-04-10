import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListUsersComponent } from './list-users/list-users.component';

export const routes: Routes = [
  {
    path: 'users-list',
      component: ListUsersComponent,
    },



];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationManagementRoutingModule {
}
