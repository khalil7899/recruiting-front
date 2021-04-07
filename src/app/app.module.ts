import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import { AuthGuardService } from './services/auth/AuthGuard.service';
import { AuthServiceService } from './services/auth/auth-service.service';
import { InterceptService } from './services/auth/InterceptService.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, SharedModule } from 'primeng/api';
//import { AuthServiceService } from './services/auth-service.service';
//import { AuthGuardService } from './services/AuthGuard.service';
//import { InterceptService } from './services/auth/InterceptService.service';



@NgModule({
  declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        NgbModule,
        ProgressSpinnerModule,
        NbSidebarModule.forRoot(),
        NbMenuModule.forRoot(),
        NbDatepickerModule.forRoot(),
        NbDialogModule.forRoot(),
        NbWindowModule.forRoot(),
        NbToastrModule.forRoot(),
        CoreModule.forRoot(),
        ThemeModule.forRoot(),
        FormsModule,
       
    ],
    providers:[
      AuthGuardService,
      AuthServiceService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: InterceptService,
        multi: true
      },
  
    ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
