import { Injectable } from '@angular/core';
import { Product } from '../../core/model/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../../core/model/page';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/products';
  constructor(private readonly http: HttpClient) {}

  save(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}`, product).pipe(p => p);
  }

  // read(size: number, page: number): Observable<Product[]> {
  //   return this.http.get<Product[]>(`${this.baseUrl}/all`);
  // }

  // todo - try to fix pagination
  read(size: number, page: number): Observable<Page> {
    const headers = new HttpHeaders({
      Authorization: `Basic: ${btoa('elcio:elcio')}`
    });
    return this.http.get<Page>(`${this.baseUrl}?size=${size}&page=${page}`, {headers});
  }

  update(product: Product): Observable<Product> {
    return this.http
      .put<Product>(`${this.baseUrl}/${product.id}`, product)
      .pipe(p => p);
  }

  readById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
