import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
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

@Injectable()
export class ProductsEffects {
  private actions$ = inject(Actions);
  private productService = inject(ProductService);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),

      switchMap(() =>
        this.productService.getProducts().pipe(
          map((products) => loadProductsSuccess({ products })),

          catchError((error) =>
            of(
              loadProductsFailure({
                error: error.message || 'Failed to load products',
              })
            )
          )
        )
      )
    )
  );
  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProduct),

      switchMap(({ id }) =>
        this.productService.deleteProduct(id).pipe(
          map(() => deleteProductSuccess({ id })),

          catchError((error) =>
            of(
              deleteProductFailure({
                error: error.message || 'Failed to delete product',
                id,
              })
            )
          )
        )
      )
    )
  );
  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createProduct),

      switchMap(({ product }) =>
        this.productService.createProduct(product).pipe(
          map((newProduct) => createProductSuccess({ product: newProduct })),

          catchError((error) =>
            of(
              createProductFailure({
                error: error.message || 'Failed to create product',
              })
            )
          )
        )
      )
    )
  );
  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProduct),

      switchMap(({ id, product }) =>
        this.productService.updateProduct(id, product).pipe(
          map((updatedProduct) =>
            updateProductSuccess({ product: updatedProduct })
          ),

          catchError((error) =>
            of(
              updateProductFailure({
                error: error.message || 'Failed to update product',
              })
            )
          )
        )
      )
    )
  );
}
