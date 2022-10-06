import { Injectable } from '@angular/core';
import { UserSystem } from '../../core/model/user-system';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = 'http://localhost:8080/users';

  constructor(private readonly http: HttpClient) {}

  login(user: UserSystem): Observable<UserSystem> {
    const basicAuth = `Basic ${btoa(user.username + ':' + user.password)}`;
    const headers = new HttpHeaders({
      Authorization: basicAuth
    });
    return this.http
      .post<UserSystem>(`${this.baseUrl}/login`, user, { headers: headers })
      .pipe(source => {
        sessionStorage.setItem('username', user.username);
        sessionStorage.setItem('authorities', user.authorities.join(','));
        sessionStorage.setItem('auth', basicAuth);
        return source;
      });
  }

  save(user: UserSystem): Observable<UserSystem> {
    return this.http.post<UserSystem>(`${this.baseUrl}`, user);
  }

  read(): Observable<UserSystem[]> {
    return this.http.get<UserSystem[]>(`${this.baseUrl}`);
  }
}
