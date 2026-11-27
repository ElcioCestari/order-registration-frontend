import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Role } from '../model/role';

export interface Session {
  username: string;
  authorities: string[];
  /** Value sent in the Authorization header. */
  authHeader: string;
}

// Same keys as before, so a session opened before this change keeps working
const USERNAME_KEY = 'username';
const AUTHORITIES_KEY = 'authorities';
const AUTH_KEY = 'auth';

/**
 * Single source of truth for the logged-in user. Components and guards read the
 * observables, so the header, menus and guards react to login/logout immediately.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly session$ = new BehaviorSubject<Session | null>(AuthService.restore());

  readonly isLoggedIn$: Observable<boolean> = this.session$.pipe(map(session => !!session));
  readonly isAdmin$: Observable<boolean> = this.session$.pipe(
    map(session => !!session && session.authorities.includes(Role.ADMIN))
  );

  get session(): Session | null {
    return this.session$.value;
  }

  start(session: Session): void {
    sessionStorage.setItem(USERNAME_KEY, session.username);
    sessionStorage.setItem(AUTHORITIES_KEY, session.authorities.join(','));
    sessionStorage.setItem(AUTH_KEY, session.authHeader);
    this.session$.next(session);
  }

  end(): void {
    sessionStorage.removeItem(USERNAME_KEY);
    sessionStorage.removeItem(AUTHORITIES_KEY);
    sessionStorage.removeItem(AUTH_KEY);
    this.session$.next(null);
  }

  /** True when logged in and holding at least one of the roles (any role when the list is empty). */
  hasAnyRole(roles: string[]): boolean {
    const session = this.session;
    return !!session && (roles.length === 0 || roles.some(role => session.authorities.includes(role)));
  }

  private static restore(): Session | null {
    const username = sessionStorage.getItem(USERNAME_KEY);
    const authHeader = sessionStorage.getItem(AUTH_KEY);
    if (!username || !authHeader) {
      return null;
    }
    const authorities = sessionStorage.getItem(AUTHORITIES_KEY);
    return { username, authHeader, authorities: authorities ? authorities.split(',') : [] };
  }
}
