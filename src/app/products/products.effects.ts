// src/app/products/products.effects.ts

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import {
  loadProducts,
  loadProductsSuccess,
  loadProductsFailure,
} from './products.actions';

@Injectable()
export class ProductsEffects {
  private actions$ = inject(Actions);
  private productService = inject(ProductService);

  // The delivery driver effect
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      // Driver listens for "loadProducts" orders over the radio
      ofType(loadProducts),

      // Driver goes to supplier warehouse (API call)
      switchMap(() =>
        this.productService.getProducts().pipe(
          // If successful: Driver brings back products and says "loadProductsSuccess"
          map((products) => loadProductsSuccess({ products })),

          // If supplier is closed: Driver returns and says "loadProductsFailure"
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
}
