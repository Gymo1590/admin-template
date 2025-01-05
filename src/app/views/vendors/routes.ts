import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./vendors.component').then(m => m.VendorsComponent),
    data: {
      title: 'Vendors'
    },
    children: [
      {
        path: '',
        redirectTo: 'create',
        pathMatch: 'full'
      },
      // {
      //   path: 'colors',
      //   loadComponent: () => import('./colors.component').then(m => m.ColorsComponent),
      //   data: {
      //     title: 'Colors'
      //   }
      // },
      // {
      //   path: 'typography',
      //   loadComponent: () => import('./typography.component').then(m => m.TypographyComponent),
      //   data: {
      //     title: 'Typography'
      //   }
      // }
    ]
  }
];

