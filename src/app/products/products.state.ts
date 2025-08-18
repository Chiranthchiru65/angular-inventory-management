import { Product } from '../models/product.model';

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  deletingIds: number[];
  creating: boolean;
  updating: boolean;
}

export const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  deletingIds: [],
  creating: false,
  updating: false,
};
