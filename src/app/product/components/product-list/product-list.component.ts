import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../core/model/product';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../core/components/confirm-dialog/confirm-dialog.component';
import { Choice } from '../../../core/model/choice';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { QuantityPatchComponent } from '../product-patch/quantity-patch/quantity-patch.component';
import { take } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  list = new MatTableDataSource<Product>([]);
  displayedColumns: string[] = ['name', 'category', 'buy', 'sell', 'available', 'actions'];
  isMobile = false;
  readonly isAdmin$ = this.auth.isAdmin$;

  // server-side pagination (page index is zero-based, like the API)
  pageIndex = 0;
  pageSize = 10;
  totalElements = 0;

  constructor(
    private readonly router: Router,
    private readonly service: ProductService,
    private readonly snackBar: SnackbarService,
    private readonly dialog: MatDialog,
    private readonly responsive: BreakpointObserver,
    private readonly auth: AuthService
  ) {}

  ngOnInit(): void {
    this.load();
    this.responsive.observe(Breakpoints.HandsetPortrait).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  newProduct(): void {
    this.router.navigate(['/products/create']);
  }

  load(): void {
    this.service
      .read(this.pageSize, this.pageIndex)
      .pipe(take(1))
      .subscribe({
        next: page => {
          // the last item of the last page was removed: show the previous page
          if (page.empty && this.pageIndex > 0) {
            this.pageIndex--;
            this.load();
            return;
          }
          this.list.data = page.content;
          this.totalElements = page.totalElements;
        },
        error: err => this.snackBar.showError('Não foi possível carregar os produtos', err)
      });
  }

  pageNavigations(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.load();
  }

  edit(product: Product): void {
    this.router.navigate([`/products/update/${product.id}`]);
  }

  patchProduct(product: Product): void {
    this.openDialogPatchQuantity(product)
      .afterClosed()
      .pipe(take(1))
      .subscribe(choice => {
        if (choice === Choice.OK) {
          this.load();
        }
      });
  }

  delete(product: Product): void {
    this.openDialog(product)
      .afterClosed()
      .pipe(take(1))
      .subscribe(userChoice => {
        if (userChoice === Choice.OK) {
          this.callServiceDelete(product);
        }
      });
  }

  private callServiceDelete(product: Product) {
    this.service
      .delete(product.id!)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.snackBar.show('item deletado!');
          this.load();
        },
        error: err => this.snackBar.showError('Algo deu errado!', err)
      });
  }

  openDialog(product: Product): MatDialogRef<any> {
    return this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: { title: 'deletar', value: `${product.name}?` }
    });
  }

  openDialogPatchQuantity(product: Product): MatDialogRef<QuantityPatchComponent> {
    // the dialog edits a copy, so the table only changes after a successful save
    return this.dialog.open(QuantityPatchComponent, {
      width: '450px',
      data: { ...product, stock: { ...product.stock } }
    });
  }
}
