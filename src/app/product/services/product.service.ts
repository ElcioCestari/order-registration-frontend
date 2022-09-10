import { Injectable } from '@angular/core';
import { Product } from '../../core/model/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/products';
  constructor(private readonly http: HttpClient) {}

  save(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}`, product).pipe(p => p);
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}`);
  }
}
