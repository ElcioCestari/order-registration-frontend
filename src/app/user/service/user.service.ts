import { Injectable } from '@angular/core';
import { UserSystem } from '../../core/model/user-system';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = `${environment.apiUrl}/users`;

  constructor(private readonly http: HttpClient) {}

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

  save(user: UserSystem): Observable<UserSystem> {
    return this.http.post<UserSystem>(`${this.baseUrl}`, user);
  }

  read(): Observable<UserSystem[]> {
    return this.http.get<UserSystem[]>(`${this.baseUrl}`);
  }
}
