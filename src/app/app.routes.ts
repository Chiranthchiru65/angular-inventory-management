import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Orders } from './pages/orders/orders';
import { Products } from './pages/products/products';
import { NotFound } from './components/notfound/notfound';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },

  { path: 'orders', component: Orders },
  { path: 'products', component: Products },
  { path: '**', component: NotFound },
];
