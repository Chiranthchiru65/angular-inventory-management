import { createReducer, on } from '@ngrx/store';
import {
  loadProducts,
  loadProductsSuccess,
  loadProductsFailure,
  deleteProduct,
  deleteProductSuccess,
  deleteProductFailure,
  createProduct,
  createProductSuccess,
  createProductFailure,
  updateProduct,
  updateProductSuccess,
  updateProductFailure,
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
  on(deleteProduct, (state, { id }) => ({
    ...state,
    deletingIds: [...state.deletingIds, id],
    error: null,
  })),

  on(deleteProductSuccess, (state, { id }) => ({
    ...state,
    products: state.products.filter((product) => product.id !== id),
    deletingIds: state.deletingIds.filter((deletingId) => deletingId !== id),
  })),

  on(deleteProductFailure, (state, { error, id }) => ({
    ...state,
    deletingIds: state.deletingIds.filter((deletingId) => deletingId !== id),
    error: `Failed to delete product: ${error}`,
  })),
  on(createProduct, (state) => ({
    ...state,
    creating: true,
    error: null,
  })),

  on(createProductSuccess, (state, { product }) => ({
    ...state,
    products: [product, ...state.products],
    creating: false,
  })),

  on(createProductFailure, (state, { error }) => ({
    ...state,
    creating: false,
    error: `Failed to create product: ${error}`,
  })),
  on(updateProduct, (state) => ({
    ...state,
    updating: true,
    error: null,
  })),

  on(updateProductSuccess, (state, { product }) => ({
    ...state,
    products: state.products.map((p) => (p.id === product.id ? product : p)),
    updating: false,
  })),

  on(updateProductFailure, (state, { error }) => ({
    ...state,
    updating: false,
    error: `Failed to update product: ${error}`,
  }))
);
