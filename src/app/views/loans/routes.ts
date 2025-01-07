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
      loadComponent: () => import('./loans.component').then(m => m.LoansComponent),
      data: {
        title: 'Loans'
      },
    },
      {
        path: 'approve',
        loadComponent: () => import('./loan-actions/loan-actions.component').then(m => m.LoanActionsComponent),
        data: {
          title: 'Loan Approval'
        }
      },
      {
        path: 'disburse',
        loadComponent: () => import('./loan-actions/loan-actions.component').then(m => m.LoanActionsComponent),
        data: {
          title: 'Loan Disbursal'
        }
      },
      {
        path: 'active-view',
        loadComponent: () => import('./loan-actions/loan-actions.component').then(m => m.LoanActionsComponent),
        data: {
          title: 'View Active'
        }
      },
      {
        path: 'closed-view',
        loadComponent: () => import('./loan-actions/loan-actions.component').then(m => m.LoanActionsComponent),
        data: {
          title: 'View Closed'
        }
      },
      {
        path: 'repayment-approval',
        loadComponent: () => import('./loan-actions/loan-actions.component').then(m => m.LoanActionsComponent),
        data: {
          title: 'View Repayment'
        }
      },
       
    ]
  }
];

