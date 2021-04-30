import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListUsersComponent } from './list-users/list-users.component';
import { ProfilComponent } from './profil/profil.component';
import { JobListComponent } from './job-list/job-list.component';

export const routes: Routes = [
  {
    path: 'users-list',
      component: ListUsersComponent,
    },

    {
      path: 'profil',
      component: ProfilComponent,
    },
    {
      path: 'job-list',
      component: JobListComponent,
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
