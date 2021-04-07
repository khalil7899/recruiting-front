import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Acceuil',
    icon: 'home-outline',
    link: '/recruiting/dashboard',
    home: true,
  },
  {
    title: 'Administration',
    icon: 'settings-2-outline',
    children: [
      {
        title: 'Utilisateurs',
        link: '/recruiting/administration/users-list',
        icon: 'people-outline',
      },
      
    ],

  },
  

];
