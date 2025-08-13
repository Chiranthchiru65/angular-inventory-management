// src/app/products/products.reducer.ts

import { createReducer, on } from '@ngrx/store';
import {
  loadProducts,
  loadProductsSuccess,
  loadProductsFailure,
} from './products.actions';
import { ProductsState, initialState } from './products.state';

export const productsReducer = createReducer(
  initialState,

  // When chef hears "loadProducts": Put up "Checking inventory..." sign
  on(loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null, // Clear any previous errors
  })),

  // When driver returns with products: Update inventory board, remove sign
  on(loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false,
    error: null,
  })),

  // When driver returns with error: Put up "Supplier unavailable" sign
  on(loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    products: [], // Clear products on error
  }))
);
