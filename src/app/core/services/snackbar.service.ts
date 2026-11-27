import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
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

  /**
   * Shows an error message, except for 401/403: the auth interceptor already told the
   * user about those, and a generic message here would replace the more useful one.
   */
  public showError(msg: string, error?: unknown) {
    if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403)) {
      return;
    }
    this.show(msg, false);
  }
}
