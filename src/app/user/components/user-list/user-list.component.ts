import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserSystem } from '../../../core/model/user-system';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { take } from 'rxjs';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../core/components/confirm-dialog/confirm-dialog.component';
import { Choice } from '../../../core/model/choice';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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
    private readonly dialog: MatDialog,
    private readonly responsive: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.load();
    this.responsive.observe(Breakpoints.HandsetPortrait).subscribe(result => {
      this.isMobile = result.matches;
    });
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

  newUser() {
    this.router.navigate(['/user/create']);
  }

  private load(): void {
    this.service
      .read()
      .pipe(take(1))
      .subscribe({
        next: list => (this.list.data = list),
        error: err => this.snackBar.showError('Não foi possível carregar os usuários', err)
      });
  }

  openDialog(userSystem: UserSystem): MatDialogRef<any> {
    return this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: { title: 'deletar', value: `${userSystem.username}?` }
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
          this.snackBar.showError('algo deu errado', err);
        }
      });
  }
}
