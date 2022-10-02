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

  login(user: UserSystem): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(user.username + ':' + user.password)}`
    });
    console.log(headers.get('Authorization'));
    return this.http.post(`${this.baseUrl}/login`, user, { headers: headers });
  }

  save(user: UserSystem): Observable<UserSystem> {
    return this.http.post<UserSystem>(`${this.baseUrl}`, user);
  }

  read(): Observable<UserSystem[]> {
    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa('elcio:elcio')}`
    });
    return this.http.get<UserSystem[]>(`${this.baseUrl}`, { headers });
  }
}
