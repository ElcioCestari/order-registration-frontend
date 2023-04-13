import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {take} from 'rxjs';
import {SnackbarService} from '../../shared/services/snackbar.service';
import {UserSystem} from '../../core/model/user-system';
import {UserSystemUpdateDto} from "./user-system-update.dto";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  user: UserSystemUpdateDto = {
    password: '',
    authorities: ['']
  };
  constructor(
    private readonly activeRoute: ActivatedRoute,
    private readonly service: UserService,
    private readonly snackBar: SnackbarService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.service
      .readByUsername((this.activeRoute.snapshot.paramMap.get('id'))!)
      .pipe(take(1))
      .subscribe({
        next: userSystem => {
          this.user = userSystem;
        },
        error: err => {
          console.error(err);
          this.snackBar.show(`usuário não encontrado`, false);
        }
      });
  }

  save() {
    this.service.update(this.user)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.snackBar.show('usuário atualizado')
          this.router.navigate(['/user/list'])
        },
        error: err => {
          console.error(err)
          this.snackBar.show('ocorreu um erro', false)
        }
      })
  }

  cancel(): void {
    this.router
      .navigate(['/user/list'])
      .then(() => this.snackBar.show('Operação Cancelada!'));
  }
}
