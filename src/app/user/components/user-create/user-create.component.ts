import { Component, OnInit } from '@angular/core';
import { UserSystem } from '../../../core/model/user-system';
import { UserService } from '../../service/user.service';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  user: UserSystem = {
    username: '',
    password: '',
    authorities: ['USER']
  };
  constructor(
    private readonly service: UserService,
    private readonly snackBar: SnackbarService,
    private readonly router: Router
  ) {}
  ngOnInit(): void {}

  save() {
    this.service.save(this.user).subscribe({
      next: () => {
        this.snackBar.show('usuário salvo!');
        this.router.navigate(['/product/list']);
      },
      error: err => {
        console.log(err);
        this.snackBar.show('algo deu errado');
      }
    });
  }
}
