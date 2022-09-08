import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { Category } from '../../model/category';
import { Router } from '@angular/router';

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

  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  cancel(): void {
    this.router.navigate(['/products/list']);
  }

  save(): void {
    this.router.navigate(['/products/list']);
  }
}
