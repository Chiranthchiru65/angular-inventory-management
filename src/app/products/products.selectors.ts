import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.state';

export const selectProductsState =
  createFeatureSelector<ProductsState>('products');

export const selectAllProducts = createSelector(
  selectProductsState,
  (state: ProductsState) => state.products
);

export const selectProductsLoading = createSelector(
  selectProductsState,
  (state: ProductsState) => state.loading
);

export const selectProductsError = createSelector(
  selectProductsState,
  (state: ProductsState) => state.error
);

export const selectHasProducts = createSelector(
  selectAllProducts,
  (products) => products.length > 0
);
export const selectDeletingIds = createSelector(
  selectProductsState,
  (state: ProductsState) => state.deletingIds
);

export const selectIsProductDeleting = (productId: number) =>
  createSelector(selectDeletingIds, (deletingIds: number[]) =>
    deletingIds.includes(productId)
  );
export const selectIsCreating = createSelector(
  selectProductsState,
  (state: ProductsState) => state.creating
);
export const selectIsUpdating = createSelector(
  selectProductsState,
  (state: ProductsState) => state.updating
);
