import {Component, HostListener} from '@angular/core';
import {UserService} from '../../../user/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLogged: boolean;

  constructor(private readonly userService: UserService) {
    this.isLogged = !!sessionStorage.getItem('authorities');
  }

  logout() {
    this.userService.logout();
    this.isLogged = false;
  }

  @HostListener('window:storage', ['$event'])
  onStorageChange(event: StorageEvent) {
    if (event.storageArea === sessionStorage && event.key === 'authorities') {
      this.isLogged = event.newValue === 'true';
    }
  }
}
