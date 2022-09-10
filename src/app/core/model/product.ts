import { Stock } from './stock';
import { Category } from './category';

export interface Product {
  id?: string;
  name: string;
  description: string;
  unitPurchasePrice: number;
  unitPurchaseSale: number;
  category: Category;
  stock: Stock;
  registrationTime: Date;
  haveInStock?: boolean;
}
