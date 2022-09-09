import { Component, OnInit } from '@angular/core';

interface UserSystem {
  username: string;
  password: string;
  authorities: string[];
}

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
  constructor() {}

  ngOnInit(): void {}
}
