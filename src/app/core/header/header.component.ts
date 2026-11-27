import { Component } from '@angular/core';
import { UserService } from '../../user/service/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  readonly isLoggedIn$ = this.auth.isLoggedIn$;
  readonly isAdmin$ = this.auth.isAdmin$;

  constructor(
    private readonly userService: UserService,
    private readonly auth: AuthService
  ) {}

  logout() {
    this.userService.logout();
  }
}
