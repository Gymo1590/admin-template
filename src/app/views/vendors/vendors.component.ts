import { Component } from '@angular/core';
import { VendorsData } from './vendors.data.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-vendors',
  imports:  [CommonModule,MatMenuModule,MatButtonModule,MatIconModule,FormsModule],
  templateUrl: './vendors.component.html',
  styleUrl: './vendors.component.scss'
})
export class VendorsComponent {
 data: VendorsData[] = [];
  filteredData: VendorsData[] = [];
  paginatedData: VendorsData[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number[] = [];

  displayedColumns = [
    { label: '#', key: 'id' },
    { label: 'Full Name', key: 'fullName' },
    { label: 'Phone Number', key: 'phoneNumber' },
    { label: 'Vendor ID', key: 'vendorId' },
    { label: 'Registered By', key: 'registeredBy' },
    { label: 'Registration Date', key: 'registrationDate' },
    { label: 'Market', key: 'market' },
    { label: 'Stall Number', key: 'stallNumber' },
    { label: 'Status', key: 'status' },
    { label: 'Actions', key: 'actions' }
  ];
  

  constructor() {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.data = [
      {
        id: 1,
        fullName: "John Doe",
        phoneNumber: "123-456-7890",
        vendorId: "VND001",
        registeredBy: "Admin",
        registrationDate: "2024-01-05",
        market: "Central Market",
        stallNumber: "A12",
        status: "PENDING"
    },
    {
        id: 2,
        fullName: "Jane Smith",
        phoneNumber: "234-567-8901",
        vendorId: "VND002",
        registeredBy: "Admin",
        registrationDate: "2024-01-04",
        market: "Downtown Bazaar",
        stallNumber: "B7",
        status: "ACTIVE"
    },
    {
        id: 3,
        fullName: "Michael Johnson",
        phoneNumber: "345-678-9012",
        vendorId: "VND003",
        registeredBy: "Manager",
        registrationDate: "2024-01-03",
        market: "Harbor Market",
        stallNumber: "C5",
        status: "PIN-LOCKED"
    },
    {
        id: 4,
        fullName: "Emily Davis",
        phoneNumber: "456-789-0123",
        vendorId: "VND004",
        registeredBy: "Admin",
        registrationDate: "2024-01-02",
        market: "Eastside Market",
        stallNumber: "D3",
        status: "PIN-LOCKED"
    },
    {
        id: 5,
        fullName: "Daniel Martinez",
        phoneNumber: "567-890-1234",
        vendorId: "VND005",
        registeredBy: "Clerk",
        registrationDate: "2024-01-01",
        market: "Westend Market",
        stallNumber: "E8",
        status: "ACTIVE"
    },
    {
        id: 6,
        fullName: "Sophia Wilson",
        phoneNumber: "678-901-2345",
        vendorId: "VND006",
        registeredBy: "Admin",
        registrationDate: "2023-12-30",
        market: "Central Market",
        stallNumber: "A13",
        status: "ACTIVE"
    },
    {
        id: 7,
        fullName: "Matthew Taylor",
        phoneNumber: "789-012-3456",
        vendorId: "VND007",
        registeredBy: "Supervisor",
        registrationDate: "2023-12-29",
        market: "South Market",
        stallNumber: "F4",
        status: "PENDING"
    },
    {
        id: 8,
        fullName: "Olivia Anderson",
        phoneNumber: "890-123-4567",
        vendorId: "VND008",
        registeredBy: "Admin",
        registrationDate: "2023-12-28",
        market: "North Market",
        stallNumber: "G10",
        status: "PENDING"
    },
    {
        id: 9,
        fullName: "David Thomas",
        phoneNumber: "901-234-5678",
        vendorId: "VND009",
        registeredBy: "Clerk",
        registrationDate: "2023-12-27",
        market: "Harbor Market",
        stallNumber: "C7",
        status: "ACTIVE"
    },
    {
        id: 10,
        fullName: "Isabella White",
        phoneNumber: "012-345-6789",
        vendorId: "VND010",
        registeredBy: "Manager",
        registrationDate: "2023-12-26",
        market: "Downtown Bazaar",
        stallNumber: "B12",
        status: "ACTIVE"
    },
    {
        id: 11,
        fullName: "James Garcia",
        phoneNumber: "123-987-6543",
        vendorId: "VND011",
        registeredBy: "Admin",
        registrationDate: "2023-12-25",
        market: "Eastside Market",
        stallNumber: "D9",
        status: "PENDING"
    },
    {
        id: 12,
        fullName: "Ava Martinez",
        phoneNumber: "234-876-5432",
        vendorId: "VND012",
        registeredBy: "Admin",
        registrationDate: "2023-12-24",
        market: "South Market",
        stallNumber: "F2",
        status: "ACTIVE"
    },
    {
        id: 13,
        fullName: "Benjamin Lopez",
        phoneNumber: "345-765-4321",
        vendorId: "VND013",
        registeredBy: "Supervisor",
        registrationDate: "2023-12-23",
        market: "Central Market",
        stallNumber: "A14",
        status: "PENDING"
    },
    {
        id: 14,
        fullName: "Charlotte Gonzalez",
        phoneNumber: "456-654-3210",
        vendorId: "VND014",
        registeredBy: "Clerk",
        registrationDate: "2023-12-22",
        market: "Westend Market",
        stallNumber: "E6",
        status: "PENDING"
    },
    {
        id: 15,
        fullName: "Lucas Hernandez",
        phoneNumber: "567-543-2109",
        vendorId: "VND015",
        registeredBy: "Admin",
        registrationDate: "2023-12-21",
        market: "North Market",
        stallNumber: "G11",
        status: "PENDING"
    }
    ];
    
    this.filteredData = this.data;
    this.calculatePagination();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    
    this.filteredData = this.data.filter(market =>
      market.fullName.toLowerCase().includes(filterValue) ||
      market.market.toLowerCase().includes(filterValue) ||
      market.stallNumber.toLowerCase().includes(filterValue) ||
      market.phoneNumber.toString().includes(filterValue) ||   
      (market.status === 'PIN-LOCKED' ? 'ACTIVE' : 'PENDING').includes(filterValue)   
    );
    
    this.calculatePagination();
  }
  

  calculatePagination(): void {
    this.totalPages = Array(Math.ceil(this.filteredData.length / this.pageSize))
      .fill(0)
      .map((_, i) => i + 1);
    this.changePage(1);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages.length) return;
    
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    this.paginatedData = this.filteredData.slice(startIndex, startIndex + this.pageSize);
  }
  
  viewUser(vendor: VendorsData): void {
    alert(`Viewing ${vendor.fullName}`);
  }

  editUser(vendor: VendorsData): void {
    alert(`Editing ${vendor.fullName}`);
  }

  activateUser(vendor: VendorsData): void {
    vendor.status = vendor.status === 'ACTIVE' ? 'PIN-LOCKED' : 'PENDING';   
    alert(`${vendor.fullName} is now ${vendor.status === 'ACTIVE' ? 'PIN-LOCKED' : 'PENDING'}`);
  }
}
