import { Product } from '../../models/product.model';

export interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  filter: string;
  searchQuery: string;
}

export const initialProductState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  filter: '',
  searchQuery: '',
};
