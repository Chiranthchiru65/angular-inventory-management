import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Store } from '@ngrx/store';
import { Observable, take, Subscription } from 'rxjs';
import { Product } from '../../models/product.model';
import {
  loadProducts,
  deleteProduct,
  createProduct,
  updateProduct,
} from '../../products/products.actions';
import {
  selectAllProducts,
  selectProductsError,
  selectProductsLoading,
  selectHasProducts,
  selectDeletingIds,
  selectIsCreating,
  selectIsUpdating,
} from '../../products/products.selectors';
import { AddProductDialog } from '../../components/add-product-dialog/add-product-dialog';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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
    MatTooltipModule,
    AddProductDialog,
  ],
  templateUrl: './products.html',
  styles: [],
})
export class Products implements OnInit {
  // observables for reactive UI
  products$: Observable<Product[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  hasProducts$: Observable<boolean>;
  isCreating$: Observable<boolean>;
  isUpdating$: Observable<boolean>;

  searchTerm: string = '';
  filteredProducts: Product[] = [];
  paginatedProducts: Product[] = [];
  currentPage: number = 1;
  pageSize: number = 20;
  selectedCategory: string = 'all';
  selectedStatus: string = 'all';
  showEditDialog: boolean = false;
  editingProduct?: Product;
  // Modal state
  showAddProductDialog: boolean = false;
  private subscriptions = new Subscription();
  displayedColumns: string[] = [
    'id',
    'name',
    'price',
    'stock',
    'category',
    'supplier',
    'actions',
  ];

  constructor(private store: Store) {
    // subscribe to products for real time updates
    this.isUpdating$ = this.store.select(selectIsUpdating);

    this.products$ = this.store.select(selectAllProducts);
    this.loading$ = this.store.select(selectProductsLoading);
    this.error$ = this.store.select(selectProductsError);
    this.hasProducts$ = this.store.select(selectHasProducts);
    this.isCreating$ = this.store.select(selectIsCreating);

    this.products$.subscribe((products) => {
      console.log('Products from the store:', products);
    });

    this.subscriptions.add(
      this.isUpdating$.subscribe((isUpdating) => {
        if (!isUpdating && this.showEditDialog) {
          this.showEditDialog = false;
          this.editingProduct = undefined;
        }
      })
    );
  }

  ngOnInit(): void {
    this.loadProducts();

    this.products$.subscribe((products) => {
      this.applyFilters(products);
    });
    this.subscriptions.add(
      this.isCreating$.subscribe((isCreating) => {
        if (!isCreating && this.showAddProductDialog) {
          // If we were creating and now we're not, close the dialog
          this.showAddProductDialog = false;
        }
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  loadProducts(): void {
    this.store.dispatch(loadProducts());
  }

  // Modal methods
  openAddProductDialog(): void {
    this.showAddProductDialog = true;
  }

  closeAddProductDialog(): void {
    this.showAddProductDialog = false;
  }

  // search query
  onSearch(): void {
    this.currentPage = 1; // Reset to first page when searching
    this.products$.pipe(take(1)).subscribe((products) => {
      this.applyFilters(products);
    });
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.currentPage = 1;
    this.onSearch();
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.currentPage = 1;
    this.products$.pipe(take(1)).subscribe((products) => {
      this.applyFilters(products);
    });
  }

  filterByStatus(status: string): void {
    this.selectedStatus = status;
    this.currentPage = 1;
    this.products$.pipe(take(1)).subscribe((products) => {
      this.applyFilters(products);
    });
  }

  clearFilters(): void {
    this.selectedCategory = 'all';
    this.selectedStatus = 'all';
    this.searchTerm = '';
    this.currentPage = 1;
    this.products$.pipe(take(1)).subscribe((products) => {
      this.applyFilters(products);
    });
  }

  applyFilters(products: Product[]): void {
    let filtered = [...products];

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          (product.sku && product.sku.toLowerCase().includes(term)) ||
          product.category.toLowerCase().includes(term) ||
          (product.supplier && product.supplier.toLowerCase().includes(term)) ||
          (product.description &&
            product.description.toLowerCase().includes(term))
      );
    }

    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(
        (product) => product.category === this.selectedCategory
      );
    }

    if (this.selectedStatus !== 'all') {
      if (this.selectedStatus === 'active') {
        filtered = filtered.filter((product) => product.status === 'active');
      } else if (this.selectedStatus === 'low-stock') {
        filtered = filtered.filter(
          (product) => product.stock <= product.minStock
        );
      }
    }

    this.filteredProducts = filtered;
    this.updatePagination();
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.pageSize);
  }

  getStartIndex(): number {
    return this.filteredProducts.length === 0
      ? 0
      : (this.currentPage - 1) * this.pageSize + 1;
  }

  getEndIndex(): number {
    const endIndex = this.currentPage * this.pageSize;
    return endIndex > this.filteredProducts.length
      ? this.filteredProducts.length
      : endIndex;
  }

  getStockStatus(product: Product): string {
    if (product.stock === 0) return 'Out of Stock';
    if (product.stock <= product.minStock) return 'Low Stock';
    return 'In Stock';
  }

  onEdit(product: Product): void {
    console.log('Edit product:', product);
    this.editingProduct = product;
    this.showEditDialog = true;
  }

  onView(product: Product): void {
    console.log('View product details:', product);
  }

  onDelete(product: Product): void {
    // Customer says: "Remove this expired product from inventory!"
    console.log('Deleting product:', product);
    this.store.dispatch(deleteProduct({ id: product.id }));
  }

  isProductDeleting(productId: number, deletingIds: number[] | null): boolean {
    return deletingIds ? deletingIds.includes(productId) : false;
  }
  onProductAdded(productData: Omit<Product, 'id'>): void {
    // Customer says: "Add this new product to our inventory!"
    console.log('Adding new product:', productData);
    this.store.dispatch(createProduct({ product: productData }));
  }
  onProductUpdated(updatedProduct: Product): void {
    console.log('Updating product:', updatedProduct);
    this.store.dispatch(
      updateProduct({
        id: updatedProduct.id,
        product: updatedProduct,
      })
    );
  }
  closeEditDialog(): void {
    this.showEditDialog = false;
    this.editingProduct = undefined;
  }
}
