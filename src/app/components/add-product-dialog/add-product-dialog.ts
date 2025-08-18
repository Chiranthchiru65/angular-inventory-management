import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-add-product-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatIconModule],
  templateUrl: './add-product-dialog.html',
  styles: [],
})
export class AddProductDialog {
  @Input() editProduct?: Product; // If provided, we're in edit mode
  @Output() closeDialog = new EventEmitter<void>();
  @Output() productAdded = new EventEmitter<Omit<Product, 'id'>>();
  @Output() productUpdated = new EventEmitter<Product>();

  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      sku: ['', [Validators.required]],
      description: [''],
      category: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      minStock: [0, [Validators.required, Validators.min(0)]],
      status: ['active', [Validators.required]],
      supplier: ['', [Validators.required]],
      imageUrl: [''],
    });
  }

  ngOnInit(): void {
    // Pre-populate form if we're in edit mode
    if (this.editProduct) {
      this.productForm.patchValue({
        name: this.editProduct.name,
        sku: this.editProduct.sku,
        description: this.editProduct.description,
        category: this.editProduct.category,
        price: this.editProduct.price,
        stock: this.editProduct.stock,
        minStock: this.editProduct.minStock,
        status: this.editProduct.status,
        supplier: this.editProduct.supplier,
        imageUrl: this.editProduct.imageUrl,
      });
    }
  }

  get isEditMode(): boolean {
    return !!this.editProduct;
  }

  get dialogTitle(): string {
    return this.isEditMode ? 'Edit Product' : 'Add New Product';
  }

  get submitButtonText(): string {
    return this.isEditMode ? 'Update Product' : 'Add Product';
  }

  onClose(): void {
    this.closeDialog.emit();
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;

      if (this.isEditMode) {
        // We're updating an existing product
        const updatedProduct: Product = {
          id: this.editProduct!.id,
          name: formValue.name,
          sku: formValue.sku,
          description: formValue.description || '',
          category: formValue.category,
          price: parseFloat(formValue.price),
          stock: parseInt(formValue.stock),
          minStock: parseInt(formValue.minStock),
          status: formValue.status,
          supplier: formValue.supplier,
          imageUrl: formValue.imageUrl || '',
        };

        console.log('Updating product:', updatedProduct);
        this.productUpdated.emit(updatedProduct);
      } else {
        // We're creating a new product (without ID)
        const product: Omit<Product, 'id'> = {
          name: formValue.name,
          sku: formValue.sku,
          description: formValue.description || '',
          category: formValue.category,
          price: parseFloat(formValue.price),
          stock: parseInt(formValue.stock),
          minStock: parseInt(formValue.minStock),
          status: formValue.status,
          supplier: formValue.supplier,
          imageUrl: formValue.imageUrl || '',
        };

        console.log('Creating new product:', product);
        this.productAdded.emit(product);
      }

      this.onClose();
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  // Helper method to check if field has error
  hasError(fieldName: string): boolean {
    const field = this.productForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  // Helper method to get error message
  getErrorMessage(fieldName: string): string {
    const field = this.productForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['min']) return `${fieldName} must be greater than 0`;
    }
    return '';
  }
}
