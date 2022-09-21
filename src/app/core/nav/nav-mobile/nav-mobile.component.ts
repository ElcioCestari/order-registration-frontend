import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-mobile',
  templateUrl: './nav-mobile.component.html',
  styleUrls: ['./nav-mobile.component.css']
})
export class NavMobileComponent implements OnInit {
  @Input() opened: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
