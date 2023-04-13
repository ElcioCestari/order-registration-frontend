import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConfirmDialogComponent} from "./components/confirm-dialog/confirm-dialog.component";
import {SnackbarService} from "./services/snackbar.service";



@NgModule({
  declarations: [
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    SnackbarService
  ]
})
export class SharedModule { }
