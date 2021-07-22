import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu" style="background-color: #ebebeb"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  roleUser:any;
  menu = MENU_ITEMS;
  constructor()
  {
    this.roleUser = localStorage.getItem("userRole");

    if(this.roleUser === "RH" ){

      console.log("----isRH------");
      this.menu=[];
      this.menu.push(MENU_ITEMS[0]);
      this.menu.push(MENU_ITEMS[1]);
      this.menu.push(MENU_ITEMS[3]);
      this.menu.push(MENU_ITEMS[4]);
    }
    else if(this.roleUser==="ADMINISTRATOR")
    {
      

      console.log("----isAdmin------");
      this.menu=MENU_ITEMS;
      this.menu.push(MENU_ITEMS[0]);
      this.menu.push(MENU_ITEMS[1]);
      this.menu.push(MENU_ITEMS[2]);
      this.menu.push(MENU_ITEMS[4]);
    }

  }
}
