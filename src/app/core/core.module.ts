import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'shared/shared.module';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([]),
    NgbModule
  ],
  declarations: [
    NavbarComponent,
    LoginComponent,
    HomeComponent
  ],
  exports: [
    NavbarComponent
  ]
})
export class CoreModule { }
