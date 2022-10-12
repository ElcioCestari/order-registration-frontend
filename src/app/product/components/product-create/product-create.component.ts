import { Component, OnInit } from '@angular/core';
import { Product } from '../../../core/model/product';
import { Category } from '../../../core/model/category';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  product: Product = {
    name: '',
    description: '',
    unitPurchasePrice: 0,
    unitPurchaseSale: 0,
    category: Category.NOT_DEFINED,
    stock: { quantity: 0 },
    registrationTime: new Date(1970, 12, 31),
    haveInStock: false
  };

  constructor(
    private readonly router: Router,
    private readonly service: ProductService,
    private readonly snackBar: SnackbarService
  ) {}

  ngOnInit(): void {}

  cancel(): void {
    this.snackBar.show(`Operação cancelada`);
    this.router.navigate(['/products/list']);
  }

  save(): void {
    this.service
      .save(this.product)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.snackBar.show(`Produto salvo!`);
          this.router.navigate(['/products/list']);
        },
        error: () => this.snackBar.show(`Algo deu errado!`)
      });
  }
}
