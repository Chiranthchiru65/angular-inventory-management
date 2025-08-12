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

import { HttpClient } from '@angular/common/http';

export interface Product {
  id: number;
  name: string;
  sku: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  minStock: number;
  status: 'active' | 'low_stock' | 'out_of_stock' | 'expired';
  supplier: string;
  imageUrl: string;
  lastUpdated?: string;
  storageLocation?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
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
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  products: Product[] = [];

  displayedColumns: string[] = [
    'select',
    'itemName',
    'image',
    'quantity',
    'storageLocation',
    'lastUpdated',
    'status',
    'actions',
  ];

  totalItems = 0;
  lowStockItems = 0;
  expiredItems = 0;
  outOfStockItems = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.http.get<Product[]>('http://localhost:3000/products').subscribe({
      next: (products) => {
        console.log('fetched products', products);
        this.products = products.map((product) => ({
          ...product,
          lastUpdated: 'Aug 15, 2024, 14:30',
          storageLocation: this.getStorageLocation(product.category),
          status:
            product.stock === 0
              ? 'out_of_stock'
              : product.stock < product.minStock
              ? 'low_stock'
              : Math.random() > 0.8
              ? 'expired'
              : 'active',
        }));
        console.log('this.products:', this.products);
        console.log('Enhanced data products', products);
        this.calculateStats();
      },
      error: (error) => {
        console.error('Error loading products:', error);
      },
    });
  }

  getStorageLocation(category: string): string {
    const locations = {
      Electronics: 'Warehouse A',
      Furniture: 'Warehouse B',
      Accessories: 'Storage Room',
    };
    return locations[category as keyof typeof locations] || 'General Storage';
  }

  calculateStats() {
    this.totalItems = this.products.length;
    this.lowStockItems = this.products.filter(
      (p) => p.status === 'low_stock'
    ).length;
    this.expiredItems = this.products.filter(
      (p) => p.status === 'expired'
    ).length;
    this.outOfStockItems = this.products.filter(
      (p) => p.status === 'out_of_stock'
    ).length;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'active':
        return 'status-good';
      case 'low_stock':
        return 'status-low-stock';
      case 'out_of_stock':
        return 'status-out-of-stock';
      case 'expired':
        return 'status-expired';
      default:
        return '';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'active':
        return 'Good';
      case 'low_stock':
        return 'Low Stock';
      case 'out_of_stock':
        return 'Out of Stock';
      case 'expired':
        return 'Expired';
      default:
        return status;
    }
  }

  onEdit(product: Product) {
    console.log('Edit product:', product);
  }

  onDelete(product: Product) {
    console.log('Delete product:', product);
  }

  onViewDetails(product: Product) {
    console.log('View details:', product);
  }
}
