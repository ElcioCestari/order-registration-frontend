import {Injectable} from '@angular/core';
import {Product} from '../../core/model/product';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {FormGroup} from "@angular/forms";
import {ProductMapper} from "../mappers/product.mapper";

@Injectable()
export class ProductService {
  private baseUrl = `${environment.apiUrl}/products`;

  constructor(private readonly http: HttpClient,
              private readonly mapper: ProductMapper) {
  }

  save(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}`, product).pipe(p => p);
  }

  read(size: number, page: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/all`);
  }

  // todo - try to fix pagination
  // read(size: number, page: number): Observable<Page> {
  //   const headers = new HttpHeaders({
  //     Authorization: sessionStorage.getItem('auth')!
  //   });
  //   return this.http.get<Page>(`${this.baseUrl}?size=${size}&page=${page}`, {headers});
  // }

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

  //TODO -define return type
  patch(id: string, product: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.baseUrl}/${id}`, product);
  }

  mergeProductInForm(product: Product, formGroup: FormGroup): void {
    this.mapper.mapToForm(product, formGroup);
  }

  buildProduct(formGroup: FormGroup): Product {
    return this.mapper.mapToProduct(formGroup);
  }
}
