import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-market-details',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './market-details.component.html',
  styleUrl: './market-details.component.scss'
})
export class MarketDetailsComponent {
  @Input() mode: 'create' | 'edit' | 'view' = 'create';  
  @Output() formSubmit = new EventEmitter<any>();

}
 

