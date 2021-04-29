import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AuthGuardService } from '../services/auth/AuthGuard.service';
import { MonProfileComponent } from './mon-profile/mon-profile.component';
import { MesOffresComponent } from './mes-offres/mes-offres.component';
import { MonCalendrierComponent } from './mon-calendrier/mon-calendrier.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'administration',
      loadChildren: () => import('./administration-management/administration-management.module')
        .then(m => m.AdministrationManagementModule),
    },
    {
      path: 'profile',
      component: MonProfileComponent,
    },
    {
      path: 'offres',
      component: MesOffresComponent,
    },
    {
      path: 'calendrier',
      component: MonCalendrierComponent,
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
