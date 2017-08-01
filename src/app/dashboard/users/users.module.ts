import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserFormComponent } from './user-form/user-form.component';

import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  imports: [
    UsersRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [],
  declarations: [UsersComponent, UsersListComponent, UserFormComponent],
  providers: [],
})
export class UsersModule { }
