/** Page returned by the API's paged endpoints (Spring Data Page). */
export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  /** zero-based page index */
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
