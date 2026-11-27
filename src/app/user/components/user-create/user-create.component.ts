import { Component, OnInit } from '@angular/core';
import { UserSystem } from '../../../core/model/user-system';
import { UserService } from '../../service/user.service';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  user: UserSystem = {
    username: '',
    password: '',
    authorities: ['CUSTOMER']
  };
  constructor(
    private readonly service: UserService,
    private readonly snackBar: SnackbarService,
    private readonly router: Router
  ) {}
  ngOnInit(): void {}

  save() {
    this.service
      .save(this.user)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.snackBar.show('usuário salvo!');
          this.router.navigate(['/user/list']);
        },
        error: err => {
          console.error(err);
          // 409: the API rejects duplicate usernames
          this.snackBar.showError(err.status === 409 ? 'esse usuário já existe' : 'algo deu errado', err);
        }
      });
  }
}
