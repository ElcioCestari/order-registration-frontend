import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserCreateComponent} from "./components/user-create/user-create.component";
import {MaterialModule} from "../material/material.module";
import {FormsModule} from "@angular/forms";
import {UserUpdateComponent} from "./user-update/user-update.component";
import {UserLoginComponent} from "./components/user-login/user-login.component";
import {UserListComponent} from "./components/user-list/user-list.component";



@NgModule({
  declarations: [
    UserUpdateComponent,
    UserCreateComponent,
    UserLoginComponent,
    UserListComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ]
})
export class UserModule { }
