import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConfirmDialogComponent} from "./components/confirm-dialog/confirm-dialog.component";
import {SnackbarService} from "./services/snackbar.service";
import ErrorMsgService from "./services/error-msg-service";
import {CategoryService} from "./services/category.service";
import {AuthInterceptorService} from "./services/auth-interceptor.service";



@NgModule({
  declarations: [
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    SnackbarService,
    ErrorMsgService,
    CategoryService,
    AuthInterceptorService
  ]
})
export class SharedModule { }
