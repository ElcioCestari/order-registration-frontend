import { Component, OnInit } from '@angular/core';
import { Product } from '../../../core/model/product';
import { Category } from '../../../core/model/category';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { SnackbarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  product: Product = {
    name: '',
    haveInStock: false,
    registrationTime: new Date(),
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
    this.service.readById(id!).subscribe({
      next: produt => (this.product = produt),
      error: () => this.snackBar.show(`Produto com id ${id} não encontrado`)
    });
  }

  cancel(): void {
    this.router
      .navigate(['/products/list'])
      .then(() => this.snackBar.show('Operação Cancelada!'));
  }

  update(): void {
    this.service.update(this.product).subscribe({
      next: () => {
        this.snackBar.show('Produto salvo!');
        this.router.navigate(['/products/list']);
      },
      error: () => this.snackBar.show('Erro ao atualizar produto')
    });
  }
}
