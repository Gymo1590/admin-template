import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MarketDataInterfce } from './markets.data.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-markets',
  imports:  [CommonModule,MatMenuModule,MatButtonModule,MatIconModule,FormsModule],
  templateUrl: './markets.component.html',
  styleUrl: './markets.component.scss'
})
export class MarketsComponent {
  data: MarketDataInterfce[] = [];
  filteredData: MarketDataInterfce[] = [];
  paginatedData: MarketDataInterfce[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number[] = [];

  displayedColumns = [
    { label: '#', key: 'id' },
    { label: 'Market Name', key: 'name' },
    { label: 'Location', key: 'location' },
    { label: 'Stall Number', key: 'stallNumber' },
    { label: 'Vendors', key: 'vendorCount' },
    { label: 'Status', key: 'status' },
    { label: 'Actions', key: 'actions' }
  ];
  

  constructor() {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.data = [
      { id: 1, name: 'Downtown Market', location: 'New York', stallNumber: 'A1', vendorCount: 30, status: true },
      { id: 2, name: 'Central Bazaar', location: 'Los Angeles', stallNumber: 'B2', vendorCount: 45, status: true },
      { id: 3, name: 'Harbor Market', location: 'San Francisco', stallNumber: 'C3', vendorCount: 20, status: true },
      { id: 4, name: 'Greenfield Market', location: 'Chicago', stallNumber: 'D4', vendorCount: 35, status: true },
      { id: 5, name: 'Sunset Flea', location: 'Miami', stallNumber: 'E5', vendorCount: 50, status: true },
      { id: 6, name: 'Blue Lagoon Market', location: 'Seattle', stallNumber: 'F6', vendorCount: 25, status: true },
      { id: 7, name: 'Riverwalk Bazaar', location: 'Boston', stallNumber: 'G7', vendorCount: 40, status: true },
      { id: 8, name: 'Golden Gate Market', location: 'San Diego', stallNumber: 'H8', vendorCount: 28, status: true },
      { id: 9, name: 'Farmers Square', location: 'Houston', stallNumber: 'I9', vendorCount: 32, status: true },
      { id: 10, name: 'West End Market', location: 'Dallas', stallNumber: 'J10', vendorCount: 38, status: true },
      { id: 11, name: 'Old Town Market', location: 'Denver', stallNumber: 'K11', vendorCount: 27, status: true },
      { id: 12, name: 'Grand Pavilion', location: 'Phoenix', stallNumber: 'L12', vendorCount: 55, status: true },
      { id: 13, name: 'Oceanfront Bazaar', location: 'Portland', stallNumber: 'M13', vendorCount: 18, status: true },
      { id: 14, name: 'Sunnyvale Market', location: 'Las Vegas', stallNumber: 'N14', vendorCount: 22, status: true },
      { id: 15, name: 'Metro Plaza', location: 'Atlanta', stallNumber: 'O15', vendorCount: 60, status: true }
    ];
    
    this.filteredData = this.data;
    this.calculatePagination();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    
    this.filteredData = this.data.filter(market =>
      market.name.toLowerCase().includes(filterValue) ||
      market.location.toLowerCase().includes(filterValue) ||
      market.stallNumber.toLowerCase().includes(filterValue) ||
      market.vendorCount.toString().includes(filterValue) ||   
      (market.status == true ? 'active' : 'inactive').includes(filterValue)   
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
  
  viewUser(user: MarketDataInterfce): void {
    alert(`Viewing ${user.name}`);
  }

  editUser(user: MarketDataInterfce): void {
    alert(`Editing ${user.name}`);
  }

  activateUser(market: MarketDataInterfce): void {
    market.status = market.status == true ? false : true;   
    alert(`${market.name} is now ${market.status == true ? 'Activated' : 'Deactivated'}`);
  }
}
