import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private readonly snackBar: MatSnackBar) {}

  public show(msg: string) {
    this.snackBar.open(msg, `X`, {
      panelClass: ['snackBar'],
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}
