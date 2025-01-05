import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { LoanDataInterface } from './loan.data.interface';

@Component({
  selector: 'app-loans',
  imports:  [CommonModule,MatMenuModule,MatButtonModule,MatIconModule,FormsModule],
  templateUrl: './loans.component.html',
  styleUrl: './loans.component.scss'
})
export class LoansComponent {
  data: LoanDataInterface[] = [];
  filteredData: LoanDataInterface[] = [];
  paginatedData: LoanDataInterface[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number[] = [];

  displayedColumns = [
    { label: '#', key: 'loanId' },
    { label: 'Full Name', key: 'fullName' },
    { label: 'Principal Amount', key: 'principalAmount' },
    { label: 'Client ID', key: 'clientId' },
    { label: 'Phone Number', key: 'phoneNumber' },
    { label: 'Application Date', key: 'applicationDate' },
    { label: 'Disbursement Date', key: 'dateDisbursed' },
    { label: 'End Date', key: 'obligationEndDate' },
    { label: 'Loan Status', key: 'loanStatus' },
    { label: 'Loan Product', key: 'loanProduct' },
    { label: 'Actions', key: 'actions' }
  ];

  constructor() {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.data = [
      {
        loanId: 1,
        fullName: "Alice Johnson",
        principalAmount: "10000",
        clientId: "CL001",
        phoneNumber: "123-456-7890",
        applicationDate: "2024-01-01",
        dateDisbursed: "2024-01-05",
        obligationEndDate: "2025-01-05",
        loanStatus: "Active",
        loanProduct: "Personal Loan"
    },
    {
        loanId: 2,
        fullName: "Robert Smith",
        principalAmount: "5000",
        clientId: "CL002",
        phoneNumber: "234-567-8901",
        applicationDate: "2023-12-15",
        dateDisbursed: "2023-12-20",
        obligationEndDate: "2024-12-20",
        loanStatus: "Closed",
        loanProduct: "Auto Loan"
    },
    {
        loanId: 3,
        fullName: "Sophia Martinez",
        principalAmount: "20000",
        clientId: "CL003",
        phoneNumber: "345-678-9012",
        applicationDate: "2024-02-10",
        dateDisbursed: "2024-02-15",
        obligationEndDate: "2025-02-15",
        loanStatus: "Active",
        loanProduct: "Mortgage"
    },
    {
        loanId: 4,
        fullName: "Daniel Wilson",
        principalAmount: "15000",
        clientId: "CL004",
        phoneNumber: "456-789-0123",
        applicationDate: "2023-11-20",
        dateDisbursed: "2023-11-25",
        obligationEndDate: "2024-11-25",
        loanStatus: "Pending",
        loanProduct: "Business Loan"
    },
    {
        loanId: 5,
        fullName: "Emily Davis",
        principalAmount: "8000",
        clientId: "CL005",
        phoneNumber: "567-890-1234",
        applicationDate: "2024-03-01",
        dateDisbursed: "2024-03-05",
        obligationEndDate: "2025-03-05",
        loanStatus: "Active",
        loanProduct: "Student Loan"
    },
    {
        loanId: 6,
        fullName: "Michael Brown",
        principalAmount: "12000",
        clientId: "CL006",
        phoneNumber: "678-901-2345",
        applicationDate: "2023-10-05",
        dateDisbursed: "2023-10-10",
        obligationEndDate: "2024-10-10",
        loanStatus: "Closed",
        loanProduct: "Home Equity Loan"
    },
    {
        loanId: 7,
        fullName: "Ava Gonzalez",
        principalAmount: "17000",
        clientId: "CL007",
        phoneNumber: "789-012-3456",
        applicationDate: "2023-09-12",
        dateDisbursed: "2023-09-18",
        obligationEndDate: "2024-09-18",
        loanStatus: "Pending",
        loanProduct: "Personal Loan"
    },
    {
        loanId: 8,
        fullName: "David Harris",
        principalAmount: "9500",
        clientId: "CL008",
        phoneNumber: "890-123-4567",
        applicationDate: "2024-04-01",
        dateDisbursed: "2024-04-06",
        obligationEndDate: "2025-04-06",
        loanStatus: "Active",
        loanProduct: "Small Business Loan"
    },
    {
        loanId: 9,
        fullName: "Charlotte Lee",
        principalAmount: "25000",
        clientId: "CL009",
        phoneNumber: "901-234-5678",
        applicationDate: "2023-08-22",
        dateDisbursed: "2023-08-27",
        obligationEndDate: "2024-08-27",
        loanStatus: "Closed",
        loanProduct: "Mortgage"
    },
    {
        loanId: 10,
        fullName: "Lucas Miller",
        principalAmount: "11000",
        clientId: "CL010",
        phoneNumber: "012-345-6789",
        applicationDate: "2024-05-10",
        dateDisbursed: "2024-05-15",
        obligationEndDate: "2025-05-15",
        loanStatus: "Pending",
        loanProduct: "Education Loan"
    }
    ];
    
    this.filteredData = [...this.data];
    this.calculatePagination();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    
    this.filteredData = this.data.filter(loan =>
      loan.fullName.toLowerCase().includes(filterValue) ||
      loan.clientId.toLowerCase().includes(filterValue) ||
      loan.phoneNumber.includes(filterValue) ||
      loan.principalAmount.includes(filterValue) ||
      loan.loanStatus.toLowerCase().includes(filterValue) ||
      loan.loanProduct.toLowerCase().includes(filterValue)
    );
    
    this.calculatePagination();
  }

  calculatePagination(): void {
    this.totalPages = Array.from({ length: Math.ceil(this.filteredData.length / this.pageSize) }, (_, i) => i + 1);
    this.changePage(1);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages.length) return;

    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    this.paginatedData = this.filteredData.slice(startIndex, startIndex + this.pageSize);
  }

  viewLoan(loan: LoanDataInterface): void {
    alert(`Viewing loan for ${loan.fullName}`);
  }

  editLoan(loan: LoanDataInterface): void {
    alert(`Editing loan for ${loan.fullName}`);
  }

  toggleLoanStatus(loan: LoanDataInterface): void {
    loan.loanStatus = loan.loanStatus === 'Active' ? 'Closed' : 'Active';
    alert(`Loan for ${loan.fullName} is now ${loan.loanStatus}`);
  }
}
