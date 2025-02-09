import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-vendor-finance',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatTabsModule
  ],
  templateUrl: './vendor-finance.component.html',
  styleUrls: ['./vendor-finance.component.scss']
})
export class VendorFinancialStatus implements OnInit {
  @Input() mode: 'create' | 'edit' | 'view' = 'create';
  @Input() id!: number; 
  @Output() formSubmit = new EventEmitter<any>();

  financeForm!: FormGroup;
  otherHelp2:boolean = false;

constructor(private fb:FormBuilder){

}
  ngOnInit(): void {
    this.initialize();
  }

  initialize(){
    this.financeForm = this.fb.group({
      loanService:[false,Validators.required],
      insuranceService:[false,Validators.required],
      savingService:[false,Validators.required],
      paymentService:[false,Validators.required],
      insurancePayment: this.fb.group({
        mobileMoney:[false],
        bank:[false],
        otherMethod:[false],
        otherMethodText:['']
      }),
      savingsGroupBank:this.fb.group({
        nmb:[null],
        nbc:[null],
        crdb:[null],
        finca:[null],
        dtb:[null],
        kcb:[null],
        equity:[null],
        kibubu:[null],
        maendeleoBank:[null],
        stanbic:[null],
        dcb:[null],
        exim:[null],
        otherSavingsBankMethod:['']
      })
    })
  }
  get insurancePaymentGroup(){
    return this.financeForm.get('insurancePayment') as FormGroup;
  }
  get savingsGroupBank(){
    return this.financeForm.get('savingsGroupBank') as FormGroup;
  }
   onCheckboxChange(event: MatCheckboxChange,  controlName: string,boolControlName: string): void {
      if (event.checked && this.mode !== 'view') {
        this.financeForm.addControl(
          controlName,
          this.fb.control(null, [Validators.required])
        );
        this.financeForm.addControl(
          boolControlName,
          this.fb.control(true)
        );
      } else  {
        this.clearFields()
        this.financeForm.removeControl(controlName);
      }
    }

    clearFields(){
      this.insurancePaymentGroup.patchValue({
        mobileMoney:null,
        bank:null,
        otherMethod:null,
        otherMethodText:null
      }),
      this.savingsGroupBank.patchValue({
        nmb:null,
        nbc:null,
        crdb:null,
        finca:null,
        dtb:null,
        kcb:null,
        equity:null,
        kibubu:null,
        maendeleoBank:null,
        stanbic:null,
        dcb:null,
        exim:null,
        otherSavingsBankMethod:null
      })
    }

    get vendorFinancialStatus() {
      const formValue = this.financeForm.value;
      const savingsValues = formValue.savingsGroupBank;
      const filteredSavings: { [key: string]: boolean } = {};
      for (const key in savingsValues) {
        if (savingsValues[key] === true) {
          filteredSavings[key] = true;
        }
      }
      formValue.savingsGroupBank = filteredSavings;
      const insuranceValues = formValue.insurancePayment;
      const filteredInsurance: { [key: string]: boolean } = {};
      for (const key in insuranceValues) {
        if (insuranceValues[key] === true) {
          filteredInsurance[key] = true;
        }
      }
      formValue.insurancePayment = filteredInsurance;
    
      return formValue;
    }
    
}
