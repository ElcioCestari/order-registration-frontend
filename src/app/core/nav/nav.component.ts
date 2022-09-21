import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isMobileSize: boolean = false;
  phone: string | undefined = undefined;
  constructor(private readonly responsive: BreakpointObserver) {}

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
