// src/app/products/products.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.state';

// Main selector to get the products feature state
export const selectProductsState =
  createFeatureSelector<ProductsState>('products');

// Kitchen assistant who answers: "What products do we have?"
export const selectAllProducts = createSelector(
  selectProductsState,
  (state: ProductsState) => state.products
);

// Kitchen assistant who answers: "Is someone getting supplies right now?"
export const selectProductsLoading = createSelector(
  selectProductsState,
  (state: ProductsState) => state.loading
);

// Kitchen assistant who answers: "Are there any supplier problems?"
export const selectProductsError = createSelector(
  selectProductsState,
  (state: ProductsState) => state.error
);

// Kitchen assistant who answers: "Do we have any products in stock?"
export const selectHasProducts = createSelector(
  selectAllProducts,
  (products) => products.length > 0
);
