import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
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
  [x: string]: any;
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
    });
  }


  onCheckboxChange(event: MatCheckboxChange, controlName: string): void {
    if (event.checked) {
      this.detailsForm.addControl(
        controlName,
        this.formBuilder.control(null, [Validators.required, Validators.min(1)])
      );
    } else {
      this.detailsForm.removeControl(controlName);
    }
  }
  

  handleFileError(event: any) {
    const file = event.target.files[0];
    if (!file) {
      console.error('No file selected');
      return;
    }
    if (file.size > 5000000) { 
      console.error('File size exceeds limit');
      return;
    }
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      console.error('Invalid file type');
      return;
    }
  }

  handleFileSelection(event: any) {
    const file = event.target.files[0];
    if (!file) {
      console.error('No file selected');
      return;
    }

    if (file.size > 5000000) {
      console.error('File size exceeds limit');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      console.error('Invalid file type');
      return;
    }

    this.detailsForm.get('marketImage')?.setValue(file.name);
    console.log('File selected:', file.name);
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
 

