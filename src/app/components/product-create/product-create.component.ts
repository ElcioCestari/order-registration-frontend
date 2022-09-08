import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { Category } from '../../model/category';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

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
    private readonly service: ProductService
  ) {}

  ngOnInit(): void {}

  cancel(): void {
    this.router.navigate(['/products/list']);
  }

  save(): void {
    this.service.save(this.product).subscribe();
    this.router.navigate(['/products/list']);
  }
}
