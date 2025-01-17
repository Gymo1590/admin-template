import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AmcosDetailsInterface } from './amcos.member.interface';

@Component({
  selector: 'app-amcos',
  imports:[
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './amcos.component.html',
  styleUrl: './amcos.component.scss'
})
export class AmcosComponent {

   data: AmcosDetailsInterface[] = [];
    filteredData: AmcosDetailsInterface[] = [];
    paginatedData: AmcosDetailsInterface[] = [];
    currentPage: number = 1;
    pageSize: number = 5;
    totalPages: number[] = [];

    displayedColumns = [
      { label: '#', key: 'id' },
      { label: 'Amcos Name', key: 'name' },
      { label: 'Location', key: 'location' },
      { label: 'District', key: 'district' },
      { label: 'Members Count', key: 'membersCount' },
      { label: 'Status', key: 'status' },
      { label: 'Actions', key: 'actions' }
    ];
    constructor(private router:Router, private activated:ActivatedRoute) {}

    ngOnInit(): void {
      this.fetchData();
    }

      fetchData(): void {
        this.data = [
          { id: 1, name: "Kilimanjaro Farmers Group", region: "Kilimanjaro", district: "Moshi", membersCount: 120, status: true },
          { id: 2, name: "Lake Victoria Growers Association", region: "Mwanza", district: "Ilemela", membersCount: 85, status: true },
          { id: 3, name: "Southern Highlands Cooperative", region: "Mbeya", district: "Mbalizi", membersCount: 200, status: false },
          { id: 4, name: "Morogoro Rice Producers", region: "Morogoro", district: "Kilombero", membersCount: 150, status: true },
          { id: 5, name: "Arusha Green Growers", region: "Arusha", district: "Karatu", membersCount: 75, status: true },
          { id: 6, name: "Tanga Cassava Farmers", region: "Tanga", district: "Handeni", membersCount: 90, status: false },
          { id: 7, name: "Dodoma Sunflower Association", region: "Dodoma", district: "Bahi", membersCount: 140, status: true },
          { id: 8, name: "Tabora Tobacco Cooperative", region: "Tabora", district: "Urambo", membersCount: 65, status: false },
          { id: 9, name: "Shinyanga Maize Producers", region: "Shinyanga", district: "Kahama", membersCount: 110, status: true },
          { id: 10, name: "Iringa Tea Farmers Group", region: "Iringa", district: "Mafinga", membersCount: 125, status: true },
          { id: 11, name: "Mtwara Cashew Growers", region: "Mtwara", district: "Masasi", membersCount: 95, status: false },
          { id: 12, name: "Singida Oilseed Producers", region: "Singida", district: "Manyoni", membersCount: 80, status: true },
          { id: 13, name: "Rukwa Coffee Growers", region: "Rukwa", district: "Sumbawanga", membersCount: 130, status: true },
          { id: 14, name: "Lindi Coconut Farmers", region: "Lindi", district: "Kilwa", membersCount: 70, status: false },
          { id: 15, name: "Mara Cotton Producers", region: "Mara", district: "Musoma", membersCount: 160, status: true }
      ];
        this.filteredData = this.data;
        this.calculatePagination();
      }
    
      applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
        
        this.filteredData = this.data.filter(amcos =>
          amcos.name.toLowerCase().includes(filterValue) ||
          amcos.region.toLowerCase().includes(filterValue) ||
          amcos.district.toLowerCase().includes(filterValue) ||
          amcos.membersCount.toString().includes(filterValue) ||   
          (amcos.status == true ? 'active' : 'inactive').includes(filterValue)   
        );
        
        this.calculatePagination();
      }
      
      createAmcosGroup(){
        this.router.navigate(['amcos/create'], { relativeTo: this.activated });
    
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
      
      viewUser(amcos: AmcosDetailsInterface): void {
        alert(`Viewing ${amcos.name}`);
      }
    
      editUser(amcos: AmcosDetailsInterface): void {
        alert(`Editing ${amcos.name}`);
      }
    
      activateUser(amcos: AmcosDetailsInterface): void {
        amcos.status = amcos.status == true ? false : true;   
        alert(`${amcos.name} is now ${amcos.status == true ? 'Activated' : 'Deactivated'}`);
      }
  
}
