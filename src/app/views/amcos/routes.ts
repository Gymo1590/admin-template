import { Routes } from '@angular/router';

export const routes: Routes = [
      {
        path: '',
        loadComponent: () => import('../amcos/amcos.component').then(m => m.AmcosComponent),
        data: {
          title: 'Amcos'
        }
      },
      {
        path: 'amcos/create',
        loadComponent: () => import('./register-amcos/register-amcos.component').then(m => m.RegisterAmcosComponent),
        data: {
          title: 'Create New Amcos'
        }
      }
];

