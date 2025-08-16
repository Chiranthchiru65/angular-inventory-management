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
      // Driver listens for "deleteProduct" orders over the radio
      ofType(deleteProduct),

      // Driver goes to supplier to remove the product
      switchMap(({ id }) =>
        this.productService.deleteProduct(id).pipe(
          // If successful: Driver confirms "product removed!"
          map(() => deleteProductSuccess({ id })),

          // If failed: Driver reports "couldn't remove product"
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
}
