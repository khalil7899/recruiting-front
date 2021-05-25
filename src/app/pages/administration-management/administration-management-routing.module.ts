import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListUsersComponent } from './list-users/list-users.component';
import { ProfilComponent } from './profil/profil.component';
import { JobListComponent } from './job-list/job-list.component';
import { DetailsOffreComponent } from './details-offre/details-offre.component';
import { StageListComponent } from './stage-list/stage-list.component';
import { MesOffresComponent } from './mes-offres/mes-offres.component';

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
    {
    path: 'stages-list',
    component: StageListComponent,
    },
    {
      path: 'job-details',
      component: DetailsOffreComponent,
    },
    {
      path: 'mes-offres',
      component: MesOffresComponent,
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
