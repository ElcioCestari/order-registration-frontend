import { Component, OnInit } from '@angular/core';
import { Product } from '../../../core/model/product';
import { Category } from '../../../core/model/category';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  product: Product = {
    name: 'celular',
    description: 'eletronico',
    unitPurchasePrice: 1000,
    unitPurchaseSale: 1100,
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
    this.service.save(this.product).subscribe({
      next: () => {
        this.snackBar.show(`Produto salvo!`);
        this.router.navigate(['/products/list']);
      },
      error: () => this.snackBar.show(`Algo deu errado!`)
    });
  }
}
