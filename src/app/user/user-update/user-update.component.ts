import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';
import { take } from 'rxjs';
import { SnackbarService } from '../../core/services/snackbar.service';
import { UserSystem } from '../../core/model/user-system';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  private user: UserSystem = {
    username: '',
    password: '',
    authorities: ['']
  };
  constructor(
    private readonly activeRoute: ActivatedRoute,
    private readonly service: UserService,
    private readonly snackBar: SnackbarService
  ) {}

  ngOnInit(): void {
    const username = this.activeRoute.snapshot.paramMap.get('id');
    this.service
      .readByUsername(username!)
      .pipe(take(1))
      .subscribe({
        next: userSystem => {
          this.user = userSystem;
        },
        error: err => {
          console.error(err);
          this.snackBar.show(`usuário ${username} não encontrado`, false);
        }
      });
  }
}
