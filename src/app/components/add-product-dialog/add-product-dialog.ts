import { Component, EventEmitter, Output } from '@angular/core';
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
  @Output() closeDialog = new EventEmitter<void>();
  @Output() productAdded = new EventEmitter<Product>();

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

  onClose(): void {
    this.closeDialog.emit();
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;

      const product: Product = {
        id: Date.now(),
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

      console.log('New Product:', product);
      this.productAdded.emit(product);
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
