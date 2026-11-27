import { Component, OnInit } from '@angular/core';
import { Product } from '../../../core/model/product';
import { Category } from '../../../core/model/category';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  readonly categories: string[] = Object.values(Category);
  product: Product = {
    name: '',
    haveInStock: false,
    category: Category.NOT_DEFINED,
    stock: { quantity: 0 },
    description: '',
    unitPurchaseSale: 0,
    unitPurchasePrice: 0
  };

  constructor(
    private readonly router: Router,
    private readonly service: ProductService,
    private readonly snackBar: SnackbarService,
    private readonly activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.service
      .readById(id!)
      .pipe(take(1))
      .subscribe({
        // the category select is bound to product.category, so it shows the saved value
        next: product => (this.product = product),
        error: err => this.snackBar.showError(`Produto com id ${id} não encontrado`, err)
      });
  }

  cancel(): void {
    this.router
      .navigate(['/products/list'])
      .then(() => this.snackBar.show('Operação Cancelada!'));
  }

  update(): void {
    this.service
      .update(this.product)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.snackBar.show('Produto salvo!');
          this.router.navigate(['/products/list']);
        },
        error: err => this.snackBar.showError('Erro ao atualizar produto', err)
      });
  }
}
