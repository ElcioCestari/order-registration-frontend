import { Injectable } from '@angular/core';
import { UserSystem } from '../../core/model/user-system';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = 'http://localhost:8080/users';
  constructor(private readonly http: HttpClient) {}

  login(user: UserSystem): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, user);
  }

  save(user: UserSystem): Observable<UserSystem> {
    return this.http.post<UserSystem>(`${this.baseUrl}`, user);
  }
}
