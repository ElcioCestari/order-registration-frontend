import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCreateComponent } from './product/components/product-create/product-create.component';
import { ProductListComponent } from './product/components/product-list/product-list.component';
import { UserLoginComponent } from './user/components/user-login/user-login.component';
import { ProductUpdateComponent } from './product/components/product-update/product-update.component';
import { HomeComponent } from './home/home.component';
import { UserCreateComponent } from './user/components/user-create/user-create.component';
import { UserListComponent } from './user/components/user-list/user-list.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';
import { RoleGuard } from './core/guards/role.guard';
import { Role } from './core/model/role';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'products',
    canActivateChild: [RoleGuard],
    children: [
      { path: 'list', component: ProductListComponent, data: { roles: [Role.USER, Role.ADMIN] } },
      { path: 'create', component: ProductCreateComponent, data: { roles: [Role.ADMIN] } },
      { path: 'update/:id', component: ProductUpdateComponent, data: { roles: [Role.ADMIN] } }
    ]
  },
  {
    path: 'user/sign',
    component: UserLoginComponent
  },
  {
    path: 'user',
    canActivateChild: [RoleGuard],
    // inherited by the children (componentless parent)
    data: { roles: [Role.ADMIN] },
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
