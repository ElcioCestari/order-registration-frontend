import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isMobileSize = false;
  phone: string | undefined = undefined;
  readonly isAdmin$ = this.auth.isAdmin$;

  constructor(
    private readonly responsive: BreakpointObserver,
    private readonly auth: AuthService
  ) {}

  ngOnInit(): void {
    this.responsive.observe(Breakpoints.HandsetPortrait).subscribe(result => {
      if (result.matches) {
        this.isMobileSize = true;
        this.phone = undefined;
      } else {
        this.isMobileSize = false;
        this.phone = 'cell-phone';
      }
    });
  }
}
