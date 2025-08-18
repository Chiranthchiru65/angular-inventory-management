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
// Kitchen assistant who answers: "Which products are being removed right now?"
export const selectDeletingIds = createSelector(
  selectProductsState,
  (state: ProductsState) => state.deletingIds
);

// Kitchen assistant who answers: "Is this specific product being deleted?"
export const selectIsProductDeleting = (productId: number) =>
  createSelector(selectDeletingIds, (deletingIds: number[]) =>
    deletingIds.includes(productId)
  );
// Kitchen assistant who answers: "Are we currently adding a new product?"
export const selectIsCreating = createSelector(
  selectProductsState,
  (state: ProductsState) => state.creating
);
// Kitchen assistant who answers: "Are we currently updating a product?"
export const selectIsUpdating = createSelector(
  selectProductsState,
  (state: ProductsState) => state.updating
);
