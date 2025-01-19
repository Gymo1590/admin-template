import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./vendors.component').then(m => m.VendorsComponent),
    data: {
      title: 'Vendors'
    },
  },
  {
    path: 'create',
    loadComponent: () => import('./register-vendor/register-vendor.component').then(m => m.RegisterMarketComponent),
    data: {
      title: 'Create Vendor'
    }
  }, 
];

