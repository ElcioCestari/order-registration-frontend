import { Stock } from './stock';
import { Category } from './category';

export interface Product {
  name: string;
  description: string;
  unitPurchasePrice: number;
  unitPurchaseSale: number;
  category: Category;
  stock: Stock;
  registrationTime: Date;
  haveInStock?: boolean;
}
