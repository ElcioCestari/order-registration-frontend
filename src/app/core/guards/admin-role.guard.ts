import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminRoleGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) {}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.isAuthorized();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.isAuthorized();
  }

  private isAuthorized() {
    const result = sessionStorage.getItem('authorities');
    console.log(result);
    const permission = result === 'ADMIN';
    if (!permission) {
      alert('não autorizado');
      this.router.navigate(['user/sign']);
    }
    return permission;
  }
}
