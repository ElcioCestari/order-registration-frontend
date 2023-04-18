import {Component, OnInit} from '@angular/core';
import {Category} from '../../../core/model/category';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {SnackbarService} from '../../../shared/services/snackbar.service';
import {CategoryService} from '../../../shared/services/category.service';
import {take} from 'rxjs';
import {FormBuilder, Validators} from "@angular/forms";
import ErrorMsgService from "../../../shared/services/error-msg-service";

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  categories: string[] = this.categoryService.getValues();

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly service: ProductService,
    private readonly snackBar: SnackbarService,
    private readonly activeRoute: ActivatedRoute,
    private readonly categoryService: CategoryService,
    private readonly errorMsgService: ErrorMsgService,
  ) {
  }

  formGroup = this.fb.group({
    id: [{value: this.activeRoute.snapshot.paramMap.get('id'), disabled: true}],
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    haveInStock: [false, [Validators.required]],
    quantity: [0, [Validators.required, Validators.min(0)]],
    registrationTime: [new Date(), [Validators.required]],
    category: [Category.NOT_DEFINED, [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    unitPurchaseSale: [0, [Validators.required, Validators.min(1)]],
    unitPurchasePrice: [0, [Validators.required, Validators.min(1)]],
  })

  selectedCategory: Category = Category.NOT_DEFINED;

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.service
      .readById(id!)
      .pipe(take(1))
      .subscribe({
        next: product => (this.formGroup = this.service.buildForm(product, this.formGroup)),
        error: () => this.snackBar.show(`Produto com id ${id} não encontrado`, false)
      });
  }

  cancel(): void {
    this.router
      .navigate(['/products/list'])
      .then(() => this.snackBar.show('Operação Cancelada!'));
  }

  update(): void {

    const product = this.service.buildProduct(this.formGroup);
    console.warn(product)
    this.service
      .update(product)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.snackBar.show('Produto salvo!');
          this.router.navigate(['/products/list']);
        },
        error: () => this.snackBar.show('Erro ao atualizar produto')
      });
  }

  getErrorMsg(name: string) {
    return this.errorMsgService.getErrorMessage(this.formGroup.get(name))
  }
}
