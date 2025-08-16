import { createReducer, on } from '@ngrx/store';
import {
  loadProducts,
  loadProductsSuccess,
  loadProductsFailure,
  deleteProduct,
  deleteProductSuccess,
  deleteProductFailure,
} from './products.actions';
import { ProductsState, initialState } from './products.state';

export const productsReducer = createReducer(
  initialState,

  on(loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false,
    error: null,
  })),

  on(loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    products: [],
  })),
  // When chef hears "deleteProduct": Add product ID to "being removed" list
  on(deleteProduct, (state, { id }) => ({
    ...state,
    deletingIds: [...state.deletingIds, id],
    error: null, // Clear any previous errors
  })),

  // When driver confirms deletion: Remove product from inventory board
  on(deleteProductSuccess, (state, { id }) => ({
    ...state,
    products: state.products.filter((product) => product.id !== id),
    deletingIds: state.deletingIds.filter((deletingId) => deletingId !== id),
  })),

  // When driver fails to delete: Remove from "being removed" list, show error
  on(deleteProductFailure, (state, { error, id }) => ({
    ...state,
    deletingIds: state.deletingIds.filter((deletingId) => deletingId !== id),
    error: `Failed to delete product: ${error}`,
  }))
);
