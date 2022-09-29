export interface Page {
  content: any[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  empty: boolean;
}
export interface Pageable {
  pageNumber: number;
  pageSize: number;
}
export interface Stock {
  id: any;
  quantity: number;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
