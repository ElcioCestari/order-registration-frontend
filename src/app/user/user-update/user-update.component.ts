import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { take } from 'rxjs';
import { SnackbarService } from '../../core/services/snackbar.service';
import { UserSystemUpdateDto } from './user-system-update.dto';
import { Role } from '../../core/model/role';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  readonly roles: string[] = Object.values(Role);
  username = '';
  user: UserSystemUpdateDto = {
    password: '',
    authorities: []
  };

  constructor(
    private readonly activeRoute: ActivatedRoute,
    private readonly service: UserService,
    private readonly snackBar: SnackbarService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.service
      .readById(this.activeRoute.snapshot.paramMap.get('id')!)
      .pipe(take(1))
      .subscribe({
        next: userSystem => {
          this.username = userSystem.username;
          this.user = { id: userSystem.id, password: '', authorities: userSystem.authorities };
        },
        error: err => {
          console.error(err);
          this.snackBar.showError(`usuário não encontrado`, err);
        }
      });
  }

  save() {
    this.service
      .update(this.user)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.snackBar.show('usuário atualizado');
          this.router.navigate(['/user/list']);
        },
        error: err => {
          console.error(err);
          this.snackBar.showError('ocorreu um erro', err);
        }
      });
  }

  cancel(): void {
    this.router.navigate(['/user/list']).then(() => this.snackBar.show('Operação Cancelada!'));
  }
}
