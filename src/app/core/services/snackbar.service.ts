import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private readonly snackBar: MatSnackBar) {}

  public show(msg: string, success = true) {
    this.snackBar.open(msg, `X`, {
      panelClass: success ? ['snackBar'] : ['snackBarError'],
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}
