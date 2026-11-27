import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { UserSystem } from '../../../core/model/user-system';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  user: UserSystem = {
    username: '',
    password: '',
    authorities: ['USER']
  };
  constructor(
    private readonly service: UserService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly snackBar: SnackbarService
  ) {}

  ngOnInit(): void {}

  login() {
    this.service
      .login(this.user)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.snackBar.show('sucesso!');
          // back to the page that required the login, if any
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigateByUrl(returnUrl || '/');
        },
        error: (err) => {
          console.error(err);
          this.snackBar.show(err.status === 401 ? 'usuário ou senha inválidos' : 'algo deu errado.', false);
        }
      });
  }
}
