import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { AuthenticationComponent } from './authentication.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    SharedModule,
    AuthenticationRoutingModule,
    CommonModule
  ],
  declarations: [
    AuthenticationComponent,
    LoginComponent,
    RegisterComponent
  ],
  providers: [],
})
export class AuthenticationModule { }
