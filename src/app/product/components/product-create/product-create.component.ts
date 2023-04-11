import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {SnackbarService} from '../../../core/services/snackbar.service';
import {take} from 'rxjs';
import {FormBuilder, Validators} from "@angular/forms";
import ErrorMsgService from "../../services/error-msg-service";
import BaseFormComponent from "./base-form.component";
import {Category} from "../../../core/model/category";


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent extends BaseFormComponent implements OnInit {
  ngOnInit(): void {
  }

  constructor(
    private readonly router: Router,
    private readonly service: ProductService,
    private readonly snackBar: SnackbarService,
    fb: FormBuilder,
    errorMsgService: ErrorMsgService
  ) {
    super(
      fb,
      errorMsgService,
      fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        description: ['', [Validators.required, Validators.minLength(3)]],
        unitPurchasePrice: [0, [Validators.required, Validators.min(1)]],
        unitPurchaseSale: [0, [Validators.required, Validators.min(1)]],
        category: [Category.NOT_DEFINED],
        stock: [{quantity: 0}],
        registrationTime: [new Date(1970, 12, 31)],
        haveInStock: [false]
      })
    );
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

}
