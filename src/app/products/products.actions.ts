import { createAction, props } from '@ngrx/store';
import { Product } from '../models/product.model';

export const loadProducts = createAction('[Products] Load Products');

export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: string }>()
);
// Customer says: "Remove this expired product from inventory"
export const deleteProduct = createAction(
  '[Products] Delete Product',
  props<{ id: number }>()
);

// Delivery driver returns: "Product removed successfully from supplier!"
export const deleteProductSuccess = createAction(
  '[Products] Delete Product Success',
  props<{ id: number }>()
);

// Delivery driver returns: "Couldn't remove product from supplier!"
export const deleteProductFailure = createAction(
  '[Products] Delete Product Failure',
  props<{ error: string; id: number }>()
);

// Customer says: "Add this new product to our inventory!"
export const createProduct = createAction(
  '[Products] Create Product',
  props<{ product: Omit<Product, 'id'> }>()
);

// Delivery driver returns: "New product added to supplier successfully!"
export const createProductSuccess = createAction(
  '[Products] Create Product Success',
  props<{ product: Product }>()
);

// Delivery driver returns: "Couldn't add new product to supplier!"
export const createProductFailure = createAction(
  '[Products] Create Product Failure',
  props<{ error: string }>()
);
// Customer says: "Update this product information!"
export const updateProduct = createAction(
  '[Products] Update Product',
  props<{ id: number; product: Product }>()
);

// Delivery driver returns: "Product updated successfully!"
export const updateProductSuccess = createAction(
  '[Products] Update Product Success',
  props<{ product: Product }>()
);

// Delivery driver returns: "Couldn't update product!"
export const updateProductFailure = createAction(
  '[Products] Update Product Failure',
  props<{ error: string }>()
);
