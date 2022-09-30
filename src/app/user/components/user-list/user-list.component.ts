import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserSystem } from '../../../core/model/user-system';
import {MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['username', 'authorities', 'ações'];
  list = new MatTableDataSource<UserSystem>([]);
  isMobile: boolean = false;
  @ViewChild(MatPaginator)private paginator!: MatPaginator;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.list.paginator = this.paginator;
  }

  delete(element: UserSystem) {}

  edit(element: UserSystem) {}

  newProduct() {}

  pageNavigations($event: PageEvent) {}
}
