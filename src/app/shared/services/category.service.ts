import { Injectable } from '@angular/core';
import { Category } from '../../core/model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor() {}

  public getByKey(category: string): Category {
    return <Category>Category[category as keyof typeof Category];
  }

  public getByValue(category: string): Category {
    const result = this.getKeys()[this.getValues().indexOf(category)];
    return this.getByKey(result);
  }

  public getKeys(): string[] {
    return Object.keys(Category);
  }
  public getValues(): string[] {
    return Object.values(Category);
  }
}
