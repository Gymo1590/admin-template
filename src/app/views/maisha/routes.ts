import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'loans',
        pathMatch: 'full'
      },
      {
      path: 'loans',
      loadComponent: () => import('../loans/loans.component').then(m => m.LoansComponent),
      data: {
        title: 'Loans'
      },
    },
      {
        path: 'approve',
        loadComponent: () => import('../loans/loans.component').then(m => m.LoansComponent),
        data: {
          title: 'Loan Approval'
        }
      },
      {
        path: 'disburse',
        loadComponent: () => import('../loans/loans.component').then(m => m.LoansComponent),
        data: {
          title: 'Loan Disbursal'
        }
      },
      {
        path: 'active-view',
        loadComponent: () => import('../loans/loans.component').then(m => m.LoansComponent),
        data: {
          title: 'View Active'
        }
      },
      {
        path: 'closed-view',
        loadComponent: () => import('../loans/loans.component').then(m => m.LoansComponent),
        data: {
          title: 'View Closed'
        }
      },
      {
        path: 'repayment-approval',
        loadComponent: () => import('../loans/loans.component').then(m => m.LoansComponent),
        data: {
          title: 'View Repayment'
        }
      },
       
    ]
  }
];
