import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  //userMenu = [ { title: 'Profile'}, { title: 'Log out' } ];
  userMenu = [ { title: 'Déconnecter' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private router: Router) {
                this.menuService.onItemClick().subscribe(( event ) => {
                  this.onItemSelection(event.item.title);
                })
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;


    this.user= this.userService.getCurrentUser();
    let firstName=localStorage.getItem("userFirstName");
    let firstLastName=localStorage.getItem("userLastName");
    this.user.name= firstName+" "+ firstLastName 
    let picture=localStorage.getItem("picture");
    if(picture != undefined && picture != null && picture != ""){
        this.user.picture=localStorage.getItem("picture");
    }

  //  this.userService.getUsers()
    //  .pipe(takeUntil(this.destroy$))
      //.subscribe((users: any) => this.user = users.feriel);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
  onItemSelection(item)
  {
    
    if(item==="Déconnecter")
    {
      this.router.navigateByUrl("/auth/login");
      localStorage.removeItem('token');
      localStorage.removeItem('userFirstName');
      localStorage.removeItem('userFirstName');
      localStorage.removeItem('roles');
      localStorage.removeItem('picture')
    }
  }
  
}
