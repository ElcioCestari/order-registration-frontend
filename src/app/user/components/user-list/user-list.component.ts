import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserSystem } from '../../../core/model/user-system';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { take } from 'rxjs';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { Choice } from '../../../core/model/choice';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['username', 'authorities', 'actions'];
  list = new MatTableDataSource<UserSystem>([]);
  isMobile: boolean = false;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;

  constructor(
    private readonly router: Router,
    private readonly service: UserService,
    private readonly snackBar: SnackbarService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.load();
  }

  ngAfterViewInit(): void {
    this.list.paginator = this.paginator;
  }

  delete(userSystem: UserSystem) {
    this.openDialog(userSystem)
      .afterClosed()
      .pipe(take(1))
      .subscribe(userChoice => {
        if (userChoice === Choice.OK) {
          this.callServiceDelete(userSystem);
        }
      });
  }

  edit(userSystem: UserSystem) {
    this.router.navigate([`/user/update/${userSystem.id}`]);
  }

  newProduct() {
    this.router.navigate(['/user/create']);
  }

  pageNavigations($event: PageEvent) {}

  private load(): void {
    this.service
      .read()
      .pipe(take(1))
      .subscribe(list => (this.list.data = list));
  }

  openDialog(userSystem: UserSystem): MatDialogRef<any> {
    return this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        title: 'deletar',
        value: `${userSystem.username}?`,
        action: () => {
          console.log('ta indo');
        }
      }
    });
  }

  private callServiceDelete(userSystem: UserSystem) {
    this.service
      .delete(userSystem)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.snackBar.show('usuário deletado');
          this.load();
        },
        error: err => {
          console.error(err);
          this.snackBar.show('algo deu errado', false);
        }
      });
  }
}
