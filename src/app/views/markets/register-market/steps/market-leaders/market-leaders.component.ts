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
  @Input() id!: number; 
  @Output() formSubmit = new EventEmitter<any>();

  leadersFormArray: FormArray;
  titles: string[] = ['Chairperson', 'Vice Chairperson', 'Secretary', 'Treasurer', 'Member'];
  activeTabIndex = 0;

  constructor(public fb: FormBuilder) {
    this.leadersFormArray = this.fb.array([]);
  }

  ngOnInit() {
    this.initializeForms();
    this.leadersFormArray.valueChanges.subscribe(value => {
      this.formSubmit.emit(value);
    });
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
      if (this.mode === 'view') {
        formGroup.disable();
      }
      this.leadersFormArray.push(formGroup);
    });
  }



  get getLeaderForms(): FormGroup[] {
    return  this.leadersFormArray.controls as FormGroup[]
  }

  get getLeadersFormData(){
        return {
        leaders: this.leadersFormArray.controls.map(control => {
            const value = control.value;
            return {
              firstName: value.firstName,
              lastName: value.lastName,
              gender: value.gender,
              contactPhone: value.contactPhone,
              email: value.email,
              designation: value.designation,
              idNumber: value.idNumber,
              idName: value.idName,
              dateOfBirth: value.dateOfBirth,
              contactPerson: value.contactPerson,
              canLogin: value.canLogin,
            };
        })
    };
  }
}
