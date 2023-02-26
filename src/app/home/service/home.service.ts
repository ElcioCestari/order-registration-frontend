import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private readonly baseUrl = `${environment.apiUrl}/home`;

  constructor(private readonly http: HttpClient) {}

  public getMessage(): Observable<string> {
    return this.http.get<string>(this.baseUrl);
  }
}
