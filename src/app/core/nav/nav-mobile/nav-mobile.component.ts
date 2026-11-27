import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-mobile',
  templateUrl: './nav-mobile.component.html',
  styleUrls: ['./nav-mobile.component.css']
})
export class NavMobileComponent implements OnInit {
  @Input() opened = false;
  readonly isAdmin$ = this.auth.isAdmin$;

  constructor(private readonly auth: AuthService) {}

  ngOnInit(): void {}
}
