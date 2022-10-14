import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCreateComponent } from './product/components/product-create/product-create.component';
import { ProductListComponent } from './product/components/product-list/product-list.component';
import { UserLoginComponent } from './user/components/user-login/user-login.component';
import { ProductUpdateComponent } from './product/components/product-update/product-update.component';
import { HomeComponent } from './home/home.component';
import { UserCreateComponent } from './user/components/user-create/user-create.component';
import { UserListComponent } from './user/components/user-list/user-list.component';
import { UserRoleGuard } from './core/guards/user-role.guard';
import { AdminRoleGuard } from './core/guards/admin-role.guard';
import {UserUpdateComponent} from "./user/user-update/user-update.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'products',
    canActivateChild: [UserRoleGuard],
    children: [
      { path: 'list', component: ProductListComponent },
      { path: 'create', component: ProductCreateComponent },
      { path: 'update/:id', component: ProductUpdateComponent }
    ]
  },
  {
    path: 'user/sign',
    component: UserLoginComponent
  },
  {
    path: 'user',
    canActivateChild: [AdminRoleGuard],
    children: [
      {
        path: 'create',
        component: UserCreateComponent
      },
      {
        path: 'list',
        component: UserListComponent
      },
      {
        path: 'update/:id',
        component: UserUpdateComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
