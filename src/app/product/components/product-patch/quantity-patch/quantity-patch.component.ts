import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Choice } from '../../../../core/model/choice';
import { Product } from '../../../../core/model/product';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../shared/services/snackbar.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-quantity-patch',
  templateUrl: './quantity-patch.component.html',
  styleUrls: ['./quantity-patch.component.css']
})
export class QuantityPatchComponent {
  constructor(
    public dialogRef: MatDialogRef<QuantityPatchComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product,
    private readonly service: ProductService,
    private readonly router: Router,
    private readonly snackBar: SnackbarService
  ) {}

  ngOnInit(): void {}

  cancel() {
    this.dialogRef.close(Choice.OK);
  }

  update() {
    this.service
      .patch(this.product.id!, this.product)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.snackBar.show('Campo atualizado!');
          this.dialogRef.close(Choice.OK);
        },
        error: err => {
          console.error(err);
          this.snackBar.show('Algo deu errado!', false);
        }
      });
  }
}
