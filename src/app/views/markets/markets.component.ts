import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MarketDataInterfce } from './markets.data.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MarketService } from './market-service.service';
@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrl: './markets.component.scss',
  imports:[
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    FormsModule,
    RouterModule,
  ]
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
  

  constructor(private router:Router, private activated:ActivatedRoute, private marketService:MarketService) {}

  ngOnInit(): void {
    this.marketService.getAllMarkets().subscribe((res) => {
      this.data = res;
      console.log(this.data);
      this.filteredData = [...this.data];   
      this.calculatePagination();
      console.log(this.filteredData);
    });
  }
  
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    
    this.filteredData = this.data.filter(market =>
      market.name.toLowerCase().includes(filterValue) ||
      market.location.toLowerCase().includes(filterValue) ||
      market.stallNumber.toLowerCase().includes(filterValue) ||
      market.vendorCount.toString().includes(filterValue)  
       
    );
    
    this.calculatePagination();
  }
  
  createMarket(){
    this.router.navigate(['create'], { relativeTo: this.activated, queryParams: { mode:'create', id:0 } });
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
  
  viewUser(market: MarketDataInterfce): void {
    const mode = 'view';
    const id = market.id;
    this.router.navigate(['create'], {
      relativeTo: this.activated,
      queryParams: { mode:mode, id:id }
    });
  }
  
  editUser(market: MarketDataInterfce): void {
    const mode = 'edit';
    const id = market.id;
    this.router.navigate(['create'], {
      relativeTo: this.activated,
      queryParams: { mode:mode, id:id }
    });
  }


}
