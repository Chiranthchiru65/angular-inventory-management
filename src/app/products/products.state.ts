import { Product } from '../models/product.model';

export interface ProductsState {
  products: Product[]; // The actual inventory items
  loading: boolean; // "Is driver out getting supplies?"
  error: string | null; // "Any problems with supplier?"
}

export const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};
