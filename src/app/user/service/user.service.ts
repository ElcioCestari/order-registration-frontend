import { Injectable } from '@angular/core';
import { UserSystem } from '../../core/model/user-system';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserSystemUpdateDto } from '../user-update/user-system-update.dto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = `${environment.apiUrl}/users`;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  login(user: UserSystem): Observable<UserSystem> {
    const basicAuth = `Basic ${btoa(user.username + ':' + user.password)}`;
    const headers = new HttpHeaders({
      Authorization: basicAuth
    });
    return this.http
      .post<UserSystem>(`${this.baseUrl}/login`, user, { headers: headers })
      .pipe(
        map(result => {
          sessionStorage.setItem('username', result.username);
          sessionStorage.setItem('authorities', result.authorities.join(','));
          sessionStorage.setItem('auth', basicAuth);
          return result;
        })
      );
  }

  logout() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('authorities');
    sessionStorage.removeItem('auth');
    this.router.navigate(['/']);
  }

  save(user: UserSystem): Observable<UserSystem> {
    return this.http.post<UserSystem>(`${this.baseUrl}`, user);
  }

  read(): Observable<UserSystem[]> {
    return this.http.get<UserSystem[]>(`${this.baseUrl}`);
  }

  delete(userSystem: UserSystem): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${userSystem.id}`);
  }

  update(userSystem: UserSystemUpdateDto): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${userSystem.id}`, userSystem);
  }

  readByUsername(username: string): Observable<UserSystem> {
    return this.http.get<UserSystem>(`${this.baseUrl}/${username}`);
  }
}
