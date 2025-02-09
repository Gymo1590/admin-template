import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule, MatRadioButton } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-vendor-loans',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTabsModule,
    MatRadioModule,
    MatRadioButton,
    MatSliderModule
  ],
  templateUrl: './vendor-loans.component.html',
  styleUrls: ['./vendor-loans.component.scss']
})
export class VendorLoansComponent implements OnInit {
  @Input() mode: 'create' | 'edit' | 'view' = 'create';
  @Input() id!: number; 
  @Output() formSubmit = new EventEmitter<any>();

  loansForm!: FormGroup;
  titles: string[] = ['Chairperson', 'Vice Chairperson', 'Secretary', 'Treasurer', 'Member'];
  activeTabIndex = 0;
  numbers: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
  foodQuestions = [
    {
      label: 'Kwa wiki, kaya yako inakula nyama ya ng\'ombe mara ngapi?',
      controlName: 'foodMeatWeekly'
    },
    {
      label: 'Kwa wiki kaya yako inakula samaki mara ngapi?',
      controlName: 'foodFishWeekly'
    },
    {
      label: 'Kwa wiki kaya yako inakula wali mara ngapi? Katika wiki iliyopita, kaya yako ilikula wali?',
      controlName: 'foodRiceWeekly'
    },
    {
      label: 'Kwa wiki, kaya yako inakula chakula cha ngano mara ngapi?',
      controlName: 'foodWheatWeekly'
    },
    {
      label: 'Kwa wiki, kaya yako inakula nyama ya kuku mara ngapi?',
      controlName: 'foodChickenWeekly'
    }
  ];

  constructor(public fb: FormBuilder) {
  }

  ngOnInit() {
    this.initialize(); 
    this.loansForm.valueChanges.subscribe(value => {
      this.formSubmit.emit(value);
    });
  }

  initialize(){
    this.loansForm = this.fb.group({
      isLoanOfficial: this.fb.group({
        isActiveLoanTelco: [false],
        isActiveLoanBank:[false],
        isActiveLoanMobileAppp:[false],
        isActiveLoanOther:[false]

      }),
      vendorElictricityStatus:['',Validators.required],
      vendorHousingStatus:['',Validators.required],
      isActiveLoanOfficial:[false],
      isActiveLoanNotOfficial:[false],
      activeLoanInterest:[null],
      activeLoan:[null,Validators.required],
      isActiveLoanOther:[false],
      vendorRegion:['',Validators.required],
      foodMeatWeekly: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      foodRiceWeekly: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      foodWheatWeekly: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      foodChickenWeekly:[0, [Validators.required, Validators.min(0), Validators.max(10)]],
    
    })
  }

  get isLoanOfficialGroup(){
    return this.loansForm.get("isLoanOfficial") as FormGroup;
  }
  

  get loansFormData(){
    return this.loansForm.value;
  }
}
