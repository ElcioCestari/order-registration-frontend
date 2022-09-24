import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../core/model/product';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../core/components/confirm-dialog/confirm-dialog.component';
import { Choice } from '../../../core/model/choice';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
  list = new MatTableDataSource<Product>([]);
  displayedColumns: string[] = [
    'name',
    'buy',
    'sell',
    'available',
    'registrationDate',
    'actions'
  ];
  isMobile = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly router: Router,
    private readonly service: ProductService,
    private readonly snackBar: SnackbarService,
    private readonly dialog: MatDialog,
    private readonly responsive: BreakpointObserver
  ) {}

  ngAfterViewInit(): void {
    this.list.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.load();
    this.responsive.observe(Breakpoints.HandsetPortrait).subscribe(result => {
      if (result.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  newProduct(): void {
    this.router.navigate(['/products/create']);
  }

  load(): void {
    this.service.read().subscribe(list => (this.list.data = list));
  }

  edit(product: Product): void {
    this.router.navigate([`/products/update/${product.id}`]);
  }

  delete(product: Product): void {
    this.openDialog(product)
      .afterClosed()
      .subscribe(userChoice => {
        if (userChoice === Choice.OK) {
          this.callServiceDelete(product);
        }
      });
  }

  private callServiceDelete(product: Product) {
    this.service.delete(product.id!).subscribe({
      next: () => {
        this.snackBar.show('item deletado!');
        this.load();
      },
      error: () => {
        this.snackBar.show('Algo deu errado!', false);
      }
    });
  }

  openDialog(product: Product): MatDialogRef<any> {
    return this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        title: 'deletar',
        value: `${product.name}?`,
        action: () => {
          console.log('ta indo');
        }
      }
    });
  }
}
