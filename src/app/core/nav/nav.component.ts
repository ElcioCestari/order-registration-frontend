import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  opened: boolean = false;
  phone: string | undefined = undefined;
  constructor(private readonly responsive: BreakpointObserver) {}

  ngOnInit(): void {
    this.responsive.observe(Breakpoints.HandsetPortrait).subscribe(result => {
      if (result.matches) {
        this.opened = false;
        this.phone = undefined;
      } else {
        this.opened = true;
        this.phone = 'cell-phone';
      }
    });
  }
}
