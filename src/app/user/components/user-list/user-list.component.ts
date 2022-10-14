import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserSystem } from '../../../core/model/user-system';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['username', 'authorities', 'actions'];
  list = new MatTableDataSource<UserSystem>([]);
  isMobile: boolean = false;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;

  constructor(
    private readonly router: Router,
    private readonly service: UserService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  ngAfterViewInit(): void {
    this.list.paginator = this.paginator;
  }

  delete(element: UserSystem) {}

  edit(element: UserSystem) {}

  newProduct() {
    this.router.navigate(['/user/create'])
  }

  pageNavigations($event: PageEvent) {}

  private load(): void {
    this.service
      .read()
      .pipe(take(1))
      .subscribe(list => (this.list.data = list));
  }
}
