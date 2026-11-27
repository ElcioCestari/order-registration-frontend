import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../services/snackbar.service';

/**
 * Allows a route when the user is logged in and has one of the roles in `data.roles`
 * (any logged-in user when it is empty). This is only UX: the API enforces the rules.
 */
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanActivateChild {
  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly snackBar: SnackbarService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    return this.check(route, state.url);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    return this.check(childRoute, state.url);
  }

  private check(route: ActivatedRouteSnapshot, url: string): boolean | UrlTree {
    const roles: string[] = route.data['roles'] ?? [];
    if (!this.auth.session) {
      this.snackBar.show('Faça login para continuar', false);
      return this.router.createUrlTree(['user/sign'], { queryParams: { returnUrl: url } });
    }
    if (this.auth.hasAnyRole(roles)) {
      return true;
    }
    this.snackBar.show('Você não tem permissão para acessar esta página', false);
    return this.router.createUrlTree(['/']);
  }
}
