import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../core/model/product';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../core/components/confirm-dialog/confirm-dialog.component';
import { Choice } from '../../../core/model/choice';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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

  @Input() pageSize!: number;
  size: number = 0;

  constructor(
    private readonly router: Router,
    private readonly service: ProductService,
    private readonly snackBar: SnackbarService,
    private readonly dialog: MatDialog,
    private readonly responsive: BreakpointObserver
  ) {}

  ngAfterViewInit(): void {
    this.list.paginator = this.paginator;
    this.paginator.length = 0;
  }

  ngOnInit(): void {
    this.load();
    this.responsive.observe(Breakpoints.HandsetPortrait).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  newProduct(): void {
    this.router.navigate(['/products/create']);
  }

  load(size: number = 10, page: number = 1): void {
    this.service.read(size, page).subscribe(list => {
      this.list.data = list;
      // this.size = list.totalElements;
      // this.list.data = list.content;
      // this.list.paginator!.length = list.totalElements;
      // console.log(this.pageSize);
      // this.size = list.totalElements;
      // console.log(`size: ${this.size} total: ${list.totalElements}`)
    });
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

  pageNavigations(event?: PageEvent) {
    this.load(event?.pageSize, event?.pageIndex);
    // console.log(`event = size: ${this.size} total: ${event}`)
  }
}
