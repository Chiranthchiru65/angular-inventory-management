// src/app/counter/counter.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from './counter.state';

export const selectCounterState = createFeatureSelector<CounterState>('counter');

export const selectCount = createSelector(
  selectCounterState,
  (state: CounterState) => state.count
);

export const selectCountIsEven = createSelector(
  selectCount,
  (count: number) => count % 2 === 0
);

export const selectCountIsPositive = createSelector(
  selectCount,
  (count: number) => count > 0
);