import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from '@angular/material/dialog';
import { Choice } from '../../../../core/model/choice';
import { Product } from '../../../../core/model/product';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-quantity-patch',
  templateUrl: './quantity-patch.component.html',
  styleUrls: ['./quantity-patch.component.css']
})
export class QuantityPatchComponent {
  constructor(
    public dialogRef: MatDialogRef<QuantityPatchComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product,
    private readonly service: ProductService
  ) {}

  ngOnInit(): void {}

  cancel() {
    this.dialogRef.close(Choice.OK);
  }

  update() {
    this.service.patch(this.product.id!, this.product.stock.quantity);
  }
}
