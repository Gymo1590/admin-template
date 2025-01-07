import { Routes } from '@angular/router';

export const routes: Routes = [
  
  {
    path: '',
    loadComponent: () => import('./markets.component').then(m => m.MarketsComponent),
    data: { title: 'Markets' }
  },
  {
    path: 'markets/create',
    loadComponent: () =>
      import('./register-market/register-market.component').then(m => m.RegisterMarketComponent),
    data: { title: 'Create New Market' }
  }
  
];

