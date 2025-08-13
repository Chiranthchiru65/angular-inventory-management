import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectCount,
  selectCountIsEven,
  selectCountIsPositive,
} from '../../counter/counter.selectors';
import { increment, decrement, reset } from '../../counter/counter.actions';

@Component({
  selector: 'app-orders',
  imports: [CommonModule],
  template: `
    <div class="counter-container">
      <h2>NgRx Counter</h2>

      <div class="counter-display">
        <h1>{{ count$ | async }}</h1>
        <div class="counter-info">
          <p *ngIf="countIsEven$ | async">Count is even ✅</p>
          <p *ngIf="!(countIsEven$ | async)">Count is odd ❌</p>
          <p *ngIf="countIsPositive$ | async">Count is positive 📈</p>
          <p *ngIf="!(countIsPositive$ | async)">Count is not positive 📉</p>
        </div>
      </div>

      <div class="counter-buttons">
        <button (click)="increment()" class="btn btn-primary">
          Increment (+1)
        </button>
        <button (click)="decrement()" class="btn btn-secondary">
          Decrement (-1)
        </button>
        <button (click)="reset()" class="btn btn-danger">Reset (0)</button>
      </div>
    </div>
  `,
  styles: [
    `
      .counter-container {
        max-width: 400px;
        margin: 2rem auto;
        padding: 2rem;
        text-align: center;
        border: 2px solid #ddd;
        border-radius: 8px;
        font-family: Arial, sans-serif;
      }

      .counter-display h1 {
        font-size: 4rem;
        margin: 1rem 0;
        color: #333;
      }

      .counter-info {
        margin: 1rem 0;
        min-height: 60px;
      }

      .counter-info p {
        margin: 0.5rem 0;
        font-size: 1.1rem;
      }

      .counter-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
      }

      .btn {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
        transition: background-color 0.2s;
      }

      .btn-primary {
        background-color: #007bff;
        color: white;
      }

      .btn-primary:hover {
        background-color: #0056b3;
      }

      .btn-secondary {
        background-color: #6c757d;
        color: white;
      }

      .btn-secondary:hover {
        background-color: #545b62;
      }

      .btn-danger {
        background-color: #dc3545;
        color: white;
      }

      .btn-danger:hover {
        background-color: #c82333;
      }
    `,
  ],
})
export class Orders {
  count$: Observable<number>;
  countIsEven$: Observable<boolean>;
  countIsPositive$: Observable<boolean>;

  constructor(private store: Store) {
    // Subscribe to our selectors to get data from the store
    this.count$ = this.store.select(selectCount);
    this.countIsEven$ = this.store.select(selectCountIsEven);
    this.countIsPositive$ = this.store.select(selectCountIsPositive);
  }

  increment() {
    // Dispatch an increment action to the store
    this.store.dispatch(increment());
  }

  decrement() {
    // Dispatch a decrement action to the store
    this.store.dispatch(decrement());
  }

  reset() {
    // Dispatch a reset action to the store
    this.store.dispatch(reset());
  }
}
