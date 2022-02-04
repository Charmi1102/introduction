import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserCrudRoutingModule } from './user-crud-routing.module';
import { UserCrudComponent } from './user-crud.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserCrudComponent
  ],
  imports: [
    CommonModule,
    UserCrudRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserCrudModule { }
