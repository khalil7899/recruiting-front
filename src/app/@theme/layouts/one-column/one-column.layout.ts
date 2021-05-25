import { Component } from '@angular/core';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout windowMode>
    <nb-layout-header fixed style="background-color: #0b2089; margin-left: 35px;margin-right: 35px;width: auto;">
    <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-sidebar *ngIf="isAdmin" class="menu-sidebar" tag="menu-sidebar" responsive style="background-color:#ebebeb; margin-left: 35px;">
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>


    </nb-layout>
  `,
})
export class OneColumnLayoutComponent {
  //isCondidat=false;
  isAdmin:boolean=true;
  roleUser:any;
  constructor(){
    this.roleUser = localStorage.getItem("userRole");

    if(this.roleUser === "CANDIDATE" ||this.roleUser === "TRAINEE"){

      this.isAdmin=false;
      console.log("----isAdmin------");
      console.log(this.isAdmin);
    }
    else
    {

      this.isAdmin=true;
      console.log("----isAdmin------");
      console.log(this.isAdmin);
    }
  }
}