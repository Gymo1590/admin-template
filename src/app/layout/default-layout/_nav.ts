import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'MAIN'
    }
  },
  {
    title: true,
    name: 'Sokoni Management'
  },
  {
    name: 'Create Market',
    url: '/markets',
    iconComponent: { name: 'cil-drop' }
  },
  {
    name: 'Create Vendor',
    url: '/vendors',
    linkProps: { fragment: 'headings' },
    iconComponent: { name: 'cil-pencil' }
  },
  {
    name: 'Loan Management',
    url: '/loans',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Approve Loan',
        url: '/loans/approve',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Disburse Loans',
        url: '/loans/disburse',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Active Loans',
        url: '/loans/active-view',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Closed Loans',
        url: '/loans/closed-view',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Approve Repayment',
        url: '/loans/repayment-approval',
        icon: 'nav-icon-bullet'
      },
    ]
  },
 

  {
    title: true,
    name: 'Kilimo Management'
  },
  {
    name: 'Create Amcos group',
    url: '/amcos',
    iconComponent: { name: 'cil-drop' }
  },
  {
    name: 'Create Amcos Member',
    url: '/farmers',
    linkProps: { fragment: 'headings' },
    iconComponent: { name: 'cil-pencil' }
  },
  {
    name: 'Loan Management',
    url: '/loans',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Approve Loan',
        url: '/loans',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Disburse Loans',
        url: '/loans',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Active Loans',
        url: '/loans',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Closed Loans',
        url: '/loans',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Approve Repayment',
        url: '/loans',
        icon: 'nav-icon-bullet'
      },
    ]
  },   

  {
    title: true,
    name: 'Maisha Management'
  },
 
  {
    name: 'Reset PIN',
    url: '/maisha',
    linkProps: { fragment: 'headings' },
    iconComponent: { name: 'cil-pencil' }
  },
  {
    name: 'Loan Management',
    url: '/loans',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Approve Loan',
        url: '/loans',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Disburse Loans',
        url: '/loans',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Active Loans',
        url: '/loans',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Closed Loans',
        url: '/loans',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Approve Repayment',
        url: '/loans',
        icon: 'nav-icon-bullet'
      },
    ]
  },
     
  {
    name: 'Admin Panel',
    title: true
  },
  {
    name: 'Users',
    url: '/users',
    icon: 'nav-icon-bullet'
  },
  {
    name: 'Roles',
    url: '/users',
    icon: 'nav-icon-bullet'
  },
  {
    name: 'Permissions',
    url: '/users',
    icon: 'nav-icon-bullet'
  },
  {
    name: 'System Logs',
    url: '/users',
    icon: 'nav-icon-bullet'
  },
];
