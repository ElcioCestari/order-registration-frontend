import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly snackBar: SnackbarService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Credentials only go to our API, never to other hosts
    const toApi = req.url.startsWith(environment.apiUrl);
    const session = this.auth.session;
    if (toApi && session && !req.headers.has('Authorization')) {
      req = req.clone({ setHeaders: { Authorization: session.authHeader } });
    }
    return next.handle(req).pipe(
      catchError((error: unknown) => {
        if (toApi && error instanceof HttpErrorResponse) {
          this.handleAuthError(error, req);
        }
        return throwError(() => error);
      })
    );
  }

  private handleAuthError(error: HttpErrorResponse, req: HttpRequest<any>): void {
    if (error.status === 401 && !req.url.endsWith('/users/login')) {
      // stored credentials are no longer valid (password changed, user removed...)
      this.auth.end();
      this.snackBar.show('Sua sessão não é mais válida, faça login novamente', false);
      this.router.navigate(['user/sign'], { queryParams: { returnUrl: this.router.url } });
    } else if (error.status === 403) {
      this.snackBar.show('Você não tem permissão para esta operação', false);
    }
  }
}
