import {Injectable} from '@angular/core';
import {Product} from '../../core/model/product';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = `${environment.apiUrl}/products`;

  constructor(private readonly http: HttpClient) {
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

  buildForm(product: Product, formGroup: FormGroup): FormGroup {
    formGroup.get('name')?.setValue(product.name)
    formGroup.get('category')?.setValue(product.category)
    formGroup.get('description')?.setValue(product.description)
    formGroup.get('stock')?.setValue(product.stock)
    formGroup.get('haveInStock')?.setValue(product.haveInStock)
    formGroup.get('registrationTime')?.setValue(product.registrationTime)
    formGroup.get('unitPurchasePrice')?.setValue(product.unitPurchasePrice)
    formGroup.get('unitPurchasePrice')?.setValue(product.unitPurchasePrice)
    formGroup.get('unitPurchaseSale')?.setValue(product.unitPurchaseSale)
    return formGroup;
  }

  buildProduct(formGroup: FormGroup): Product {
    return {
      'id': formGroup.get('id')?.value,
      'name': formGroup.get('name')?.value,
      'stock': {'quantity': formGroup.get('quantity')?.value},
      'category': formGroup.get('category')?.value,
      'description': formGroup.get('description')?.value,
      'unitPurchaseSale': formGroup.get('unitPurchaseSale')?.value,
      'registrationTime': formGroup.get('registrationTime')?.value,
      'unitPurchasePrice': formGroup.get('unitPurchasePrice')?.value,
    };
  }
}
