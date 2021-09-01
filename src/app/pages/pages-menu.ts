import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Acceuil',
    icon: 'home-outline',
    //link: '/recruiting/administration/statistic',
    home: true,
  },
  {
    title: 'Liste des annonces',
    icon: 'people-outline',
    children: [
      {
        title: 'Stages',
        link: '/recruiting/administration/stages-list',
        icon: 'layers-outline',
      },
      {//changed
        title: 'Emplois',
        link: '/recruiting/administration/job-list',
        icon: 'layers-outline',
      },


    ],

  },
  {
    title: 'Utilisateurs',
    icon: 'people-outline',
    children: [
      {
        title: 'Employés RH',
        link: '/recruiting/administration/users-list',
        icon: 'people-outline',
      },

    ],

  },
  {
    title: 'Utilisateurs',
    icon: 'people-outline',
    children: [

      {
        title: 'Candidats',
        link: '/recruiting/administration/candidat-list',
        icon: 'people-outline',
      },
      {
        title: 'Stagiaire',
        link: '/recruiting/administration/trainee-list',
        icon: 'people-outline',
      },

    ],

  },
  {
    title: 'Dashboard',
    icon: 'people-outline',
    children: [
      {
        title: 'Offre par domaine',
        link: '/recruiting/administration/statistic-offre-par-domain',
        icon: 'layers-outline',
      },
      {
        title: 'candidat par offre',
        link: '/recruiting/administration/statistic-candidat-par-offre',
        icon: 'layers-outline',
      },
      {
        title: 'candidat par domaine',
        link: '/recruiting/administration/statistic-candidat-par-domain',
        icon: 'layers-outline',
      },

      

    ],

  },
  

];
