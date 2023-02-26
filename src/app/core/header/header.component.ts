import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogged = false;
  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {}

  logout() {
    this.userService.logout();
  }
}
