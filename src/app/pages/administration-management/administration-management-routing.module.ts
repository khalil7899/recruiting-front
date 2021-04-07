import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListUsersComponent } from './list-users/list-users.component';
import { ListGroupsComponent } from './list-groups/list-groups.component';

export const routes: Routes = [
  {
    path: 'users-list',
      component: ListUsersComponent,
    },


    {
      path: 'list-groups',
      component: ListGroupsComponent,
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
