import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/product.model';

// Load Products
export const loadProducts = createAction('[Product] Load Products');
export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: Product[] }>()
);
export const loadProductsFailure = createAction(
  '[Product] Load Products Failure',
  props<{ error: string }>()
);

// Load Single Product
export const loadProduct = createAction(
  '[Product] Load Product',
  props<{ id: number }>()
);
export const loadProductSuccess = createAction(
  '[Product] Load Product Success',
  props<{ product: Product }>()
);

// Create Product
export const createProduct = createAction(
  '[Product] Create Product',
  props<{ product: Omit<Product, 'id'> }>()
);
export const createProductSuccess = createAction(
  '[Product] Create Product Success',
  props<{ product: Product }>()
);
export const createProductFailure = createAction(
  '[Product] Create Product Failure',
  props<{ error: string }>()
);

// Update Product
export const updateProduct = createAction(
  '[Product] Update Product',
  props<{ id: number; product: Partial<Product> }>()
);
export const updateProductSuccess = createAction(
  '[Product] Update Product Success',
  props<{ product: Product }>()
);

// Delete Product
export const deleteProduct = createAction(
  '[Product] Delete Product',
  props<{ id: number }>()
);
export const deleteProductSuccess = createAction(
  '[Product] Delete Product Success',
  props<{ id: number }>()
);

// Filter Products
export const filterProducts = createAction(
  '[Product] Filter Products',
  props<{ filter: string }>()
);

// Search Products
export const searchProducts = createAction(
  '[Product] Search Products',
  props<{ query: string }>()
);
