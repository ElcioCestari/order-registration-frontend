import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConfirmDialogComponent} from "./components/confirm-dialog/confirm-dialog.component";
import {SnackbarService} from "./services/snackbar.service";
import ErrorMsgService from "./services/error-msg-service";
import {CategoryService} from "./services/category.service";
import {AuthInterceptorService} from "./services/auth-interceptor.service";
import { InputComponent } from './components/input/input.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";



@NgModule({
  declarations: [
    ConfirmDialogComponent,
    InputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  exports: [
    InputComponent
  ],
  providers: [
    SnackbarService,
    ErrorMsgService,
    CategoryService,
    AuthInterceptorService
  ]
})
export class SharedModule { }
