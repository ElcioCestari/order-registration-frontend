import {Component, OnInit} from '@angular/core';
import {Category} from '../../../core/model/category';
import {Router} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {SnackbarService} from '../../../core/services/snackbar.service';
import {take} from 'rxjs';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import ErrorMsgService from "../../services/error-msg-service";


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  formGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
    unitPurchasePrice: [0, [Validators.required, Validators.min(1)]],
    unitPurchaseSale: [0, [Validators.required, Validators.min(1)]],
    category: [Category.NOT_DEFINED],
    stock: [{quantity: 0}],
    registrationTime: [new Date(1970, 12, 31)],
    haveInStock: [false]
  })

  ngOnInit(): void {
  }

  constructor(
    private readonly router: Router,
    private readonly service: ProductService,
    private readonly snackBar: SnackbarService,
    private readonly fb: FormBuilder,
    private readonly errorMsgService: ErrorMsgService
  ) {
  }

  cancel(): void {
    this.snackBar.show(`Operação cancelada`);
    this.router.navigate(['/products/list']);
  }

  onSubmit() {
    this.service
      .save(this.formGroup.value)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.snackBar.show(`Produto salvo!`);
          this.router.navigate(['/products/list']);
        },
        error: () => this.snackBar.show(`Algo deu errado. Verifique os campos e tente novamente.`, false)
      });
  }

  getErrorMessage(control: AbstractControl | null): string | null {
    return this.errorMsgService.getErrorMessage(control)
  }

  onBlurFormControl(formControlName: string) {
    this.errorMsgService.onBlurFormControl(formControlName, this.formGroup)
  }
}
