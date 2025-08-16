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
