import { Injectable } from '@angular/core';
import { Product } from '../../core/model/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Page } from '../../core/model/page';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = `${environment.apiUrl}/products`;
  constructor(private readonly http: HttpClient) {}

  save(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}`, product);
  }

  /** @param page zero-based, as the API expects */
  read(size: number, page: number): Observable<Page<Product>> {
    return this.http.get<Page<Product>>(this.baseUrl, { params: { size, page } });
  }

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${product.id}`, product);
  }

  readById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  patch(id: string, product: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.baseUrl}/${id}`, product);
  }
}
