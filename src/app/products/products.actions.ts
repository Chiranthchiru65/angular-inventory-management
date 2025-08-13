// src/app/products/products.actions.ts

import { createAction, props } from '@ngrx/store';
import { Product } from '../models/product.model';

// Customer says: "Show me what products you have"
export const loadProducts = createAction('[Products] Load Products');

// Delivery driver returns: "Here's the inventory list!"
export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: Product[] }>()
);

// Delivery driver returns: "Supplier is down, sorry!"
export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: string }>()
);
