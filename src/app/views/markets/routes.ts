import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./markets.component').then(m => m.MarketsComponent),
    data: {
      title: 'Markets'
    },
    children: [
      {
        path: 'create',
        redirectTo: 'Create',
        pathMatch: 'full'
      },
      // {
      //   path: 'colors',
      //   loadComponent: () => import('./markets.component').then(m => m.MarketsComponent),
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

