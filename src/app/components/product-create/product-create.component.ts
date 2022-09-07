import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { Category } from '../../model/category';

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

  constructor() {}

  ngOnInit(): void {}
}
