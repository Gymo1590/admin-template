import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
@Component({
  selector: 'app-market-details',
  imports: [   CommonModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatButtonModule,
      MatIconModule,
      MatInputModule,
      MatCheckboxModule,
      MatRadioModule
       ],
  templateUrl: './market-details.component.html',
  styleUrl: './market-details.component.scss'
})
export class MarketDetailsComponent implements OnInit{
  @Input() mode: 'create' | 'edit' | 'view' = 'create';  
  @Output() formSubmit = new EventEmitter<any>();

  detailsForm!: FormGroup;
  constructor(private formBuilder: FormBuilder){}
  name:string = 'Gift Peter';
  ngOnInit(): void {
      this.initialize();
  }

  initialize(){
    this.detailsForm = this.formBuilder.group({
      marketImage: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      zoneCount: ['', Validators.required],
      stallCount: ['', Validators.required],
      vendorCount: ['', Validators.required],
      femaleCount: ['', Validators.required],
      maleCount: ['', Validators.required],
      youngCount: ['', Validators.required],
      youthCount: ['', Validators.required],
      adultCount: ['', Validators.required],
      loans: ['', Validators.required],
      trainingReceived: [false, Validators.required],
      trainingYearlyCount: ['', Validators.required],
      trainingEntity: ['', Validators.required],
      trainingObjective: ['', Validators.required],
      infrastructureCount: ['', Validators.required],
      confirmation: ['', Validators.required]  // new radio selection field
    });
  }
  

  onSubmit() {
    if (this.detailsForm.valid) {
      this.formSubmit.emit(this.detailsForm.value);
      console.log('Form Submitted Successfully:', this.detailsForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
 

