import {FormGroup} from "@angular/forms";
import {Product} from "../../core/model/product";
import {Injectable} from "@angular/core";

export interface ProductMapper {
  mapToProduct(form: FormGroup): Product;

  mapToForm(product: Product, formGroup: FormGroup): void;
}

@Injectable()
export class ProductMapper implements ProductMapper {
  mapToForm(product: Product, formGroup: FormGroup): void {
    formGroup.patchValue(product);
  }

  mapToProduct(formGroup: FormGroup): Product {
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
