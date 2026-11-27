import { Injectable } from '@angular/core';
import { UserSystem } from '../../core/model/user-system';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserSystemUpdateDto } from '../user-update/user-system-update.dto';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = `${environment.apiUrl}/users`;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly auth: AuthService
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
          this.auth.start({
            username: result.username,
            authorities: result.authorities,
            authHeader: basicAuth
          });
          return result;
        })
      );
  }

  logout() {
    this.auth.end();
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

  readById(id: string): Observable<UserSystem> {
    return this.http.get<UserSystem>(`${this.baseUrl}/${id}`);
  }
}
