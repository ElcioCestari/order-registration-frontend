import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../core/model/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  list: Product[] = [];
  displayedColumns: string[] = [
    'name',
    'buy',
    'sell',
    'available',
    'registrationDate',
    'actions'
  ];
  constructor(
    private readonly router: Router,
    private readonly service: ProductService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  newProduct(): void {
    this.router.navigate(['/products/create']);
  }

  load(): void {
    this.service.read().subscribe(list => (this.list = list));
  }

  edit(product: Product): void {
    this.router.navigate([`/products/update/${product.id}`]);
  }

  delete() {}
}
