import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
//
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Product } from '../../models/product.model';
import { loadProducts } from '../../products/products.actions';
import {
  selectAllProducts,
  selectProductsError,
  selectProductsLoading,
  selectHasProducts,
} from '../../products/products.selectors';
@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatChipsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <div class="products-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>
            <mat-icon>inventory</mat-icon>
            Inventory Management
          </mat-card-title>
          <mat-card-subtitle>Product Inventory</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <!-- Refresh Button -->
          <div class="actions">
            <button
              mat-raised-button
              color="primary"
              (click)="loadProducts()"
              [disabled]="loading$ | async"
            >
              <mat-icon>refresh</mat-icon>
              Refresh Inventory
            </button>
          </div>

          <!-- Loading State -->
          <div *ngIf="loading$ | async" class="loading-container">
            <mat-spinner diameter="50"></mat-spinner>
            <p>Loading products from supplier...</p>
          </div>

          <!-- Error State -->
          <div *ngIf="error$ | async as error" class="error-container">
            <mat-icon color="warn">error</mat-icon>
            <p>{{ error }}</p>
            <button mat-button color="primary" (click)="loadProducts()">
              Try Again
            </button>
          </div>

          <!-- Products Table -->
          <div
            *ngIf="
              !(loading$ | async) && !(error$ | async) && (hasProducts$ | async)
            "
            class="table-container"
          >
            <table
              mat-table
              [dataSource]="(products$ | async) || []"
              class="products-table"
            >
              <!-- ID Column -->
              <ng-container matColumnDef="id">
                <th mat-header-cell *matHeaderCellDef>ID</th>
                <td mat-cell *matCellDef="let product">{{ product.id }}</td>
              </ng-container>

              <!-- Name Column -->
              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef>Product Name</th>
                <td mat-cell *matCellDef="let product">{{ product.name }}</td>
              </ng-container>

              <!-- Price Column -->
              <ng-container matColumnDef="price">
                <th mat-header-cell *matHeaderCellDef>Price</th>
                <td mat-cell *matCellDef="let product">
                  {{ product.price | currency }}
                </td>
              </ng-container>

              <!-- Quantity Column -->
              <ng-container matColumnDef="quantity">
                <th mat-header-cell *matHeaderCellDef>Quantity</th>
                <td mat-cell *matCellDef="let product">
                  {{ product.quantity }}
                </td>
              </ng-container>

              <!-- Category Column -->
              <ng-container matColumnDef="category">
                <th mat-header-cell *matHeaderCellDef>Category</th>
                <td mat-cell *matCellDef="let product">
                  {{ product.category }}
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
            </table>
          </div>

          <!-- Empty State -->
          <div
            *ngIf="
              !(loading$ | async) &&
              !(error$ | async) &&
              !(hasProducts$ | async)
            "
            class="empty-state"
          >
            <mat-icon>inventory_2</mat-icon>
            <p>No products in inventory</p>
            <button mat-button color="primary" (click)="loadProducts()">
              Load Products
            </button>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .products-container {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
      }

      mat-card {
        margin-bottom: 2rem;
      }

      mat-card-header {
        margin-bottom: 1rem;
      }

      mat-card-title {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .actions {
        margin-bottom: 2rem;
      }

      .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem;
        gap: 1rem;
      }

      .error-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem;
        gap: 1rem;
        color: #f44336;
      }

      .table-container {
        overflow-x: auto;
      }

      .products-table {
        width: 100%;
        margin-top: 1rem;
      }

      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 3rem;
        gap: 1rem;
        color: #666;
      }

      .empty-state mat-icon {
        font-size: 4rem;
        width: 4rem;
        height: 4rem;
      }

      @media (max-width: 768px) {
        .products-container {
          padding: 1rem;
        }
      }
    `,
  ],
})
export class Products implements OnInit {
  // Observables for reactive UI
  products$: Observable<Product[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  hasProducts$: Observable<boolean>;

  // Define which columns to display in the table
  displayedColumns: string[] = ['id', 'name', 'price', 'quantity', 'category'];

  constructor(private store: Store) {
    // Subscribe to kitchen assistants for real-time updates
    this.products$ = this.store.select(selectAllProducts);
    this.loading$ = this.store.select(selectProductsLoading);
    this.error$ = this.store.select(selectProductsError);
    this.hasProducts$ = this.store.select(selectHasProducts);
  }

  ngOnInit(): void {
    // When component loads, customer says: "Show me all products!"
    this.loadProducts();
  }

  loadProducts(): void {
    // Dispatch the "check inventory" order to the kitchen
    this.store.dispatch(loadProducts());
  }
}
