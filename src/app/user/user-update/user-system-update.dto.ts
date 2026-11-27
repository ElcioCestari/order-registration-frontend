export interface UserSystemUpdateDto {
  id?: string;
  /** Blank keeps the current password (the API ignores it). */
  password: string;
  authorities: string[];
}
