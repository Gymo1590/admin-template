import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-market-leaders',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTabsModule
  ],
  templateUrl: './market-leaders.component.html',
  styleUrls: ['./market-leaders.component.scss']
})
export class MarketLeadersComponent implements OnInit {
  @Input() mode: 'create' | 'edit' | 'view' = 'create';
  @Output() formSubmit = new EventEmitter<any>();

  leadersFormArray: FormArray;
  titles: string[] = ['Chairperson', 'Vice Chairperson', 'Secretary', 'Treasurer', 'Member'];
  activeTabIndex = 0;

  constructor(private fb: FormBuilder) {
    this.leadersFormArray = this.fb.array([]);
  }

  ngOnInit() {
    this.initializeForms();
    if (this.mode === 'view') {
      this.leadersFormArray.disable();
    }
  }

  initializeForms() {
    this.titles.forEach(title => {
      const formGroup = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        gender: ['', Validators.required],
        contactPhone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        email: ['', [Validators.required, Validators.email]],
        designation: [title, Validators.required],
        idNumber: ['', Validators.required],
        idName: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        contactPerson: [false],
        canLogin: [false]
      });
      this.leadersFormArray.push(formGroup);
    });
  }

  submitForm() {
    if (this.leadersFormArray.valid) {
      this.formSubmit.emit({ leaders: this.leadersFormArray.getRawValue() });
    } else {
      this.leadersFormArray.markAllAsTouched();
      alert('Please fill all required fields.');
    }
  }

  get leaderForms(): FormGroup[] {
    return this.leadersFormArray.controls as FormGroup[];
  }
}
