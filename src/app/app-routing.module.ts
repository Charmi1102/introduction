import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentCrudComponent } from './student-crud/student-crud.component';
import { UserCrudComponent } from './user-crud/user-crud.component';

const routes: Routes = [
  {
    path: 'student-crud',
    component : StudentCrudComponent
  },
  {
    path: 'user-crud',
    loadChildren: () => import('./user-crud/user-crud.module').then(x => x.UserCrudModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
