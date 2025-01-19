import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { MY_DATE_FORMATS } from '../../../../../shared/dateformats';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-vendor-details',
  imports: [   
    CommonModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatButtonModule,
      MatIconModule,
      MatInputModule,
      MatCheckboxModule,
      MatRadioModule,
      MatSelectModule,
      MatDatepickerModule,
      MatTabsModule,
      MatNativeDateModule
       ],
  templateUrl: './vendor-details.component.html',
  styleUrl: './vendor-details.component.scss',
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
  ]
})
export class MarketDetailsComponent implements OnInit{
  [x: string]: any;
  @Input() mode: 'create' | 'edit' | 'view' = 'create';  
  @Input() id!: number;  
  @Output() formSubmit = new EventEmitter<any>();

  detailsForm!: FormGroup;
  guarantorFormArray:FormArray;
  activeTabIndex = 0;
  haveBankAccount = false;
  constructor(private formBuilder: FormBuilder){
    this.guarantorFormArray = this.formBuilder.array([]);
  }
  name:string = 'Gift Peter';

  guarantorTitles:string[] = ['Mtu Wa Kwanza','Mtu Wa Pili'];

  ngOnInit(): void {
      this.initialize();
      this.detailsForm.valueChanges.subscribe(value => {
        this.formSubmit.emit(value);
      });
      this.detailsForm.get('haveBankAccount')?.valueChanges.subscribe((value: boolean) => {
        this.haveBankAccount = value === true;
        if (!this.haveBankAccount) {
          this.clearSavingsFields();
        }
      });
      this.detailsForm.get('dateOfBirth')?.valueChanges.subscribe(value => {
        if (value) {
          const formattedDate = this.formatDateToISO(value);
          if (formattedDate !== value) {
            this.detailsForm.get('dateOfBirth')?.patchValue(formattedDate, { emitEvent: false });
          }
        }
      });
      if (this.mode === 'view') {
        this.detailsForm.disable();
      }
  }
 
  initialize(){
    this.detailsForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      contactPhone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      contactPhone2: ['', [Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.email]],
      address: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      maritalStatus:['',Validators.required],
      region:['',Validators.required],
      haveBankAccount:[null],
      dailyIncome:[null],
      weeklyIncome:[null],
      monthlyIncome:[null],
      largestTransaction:[null],
      currentSavingAmt:[null],
      guarantors: this.guarantorTitles.forEach(title=>{
      const formGroup =  this.formBuilder.group({
          name:['',Validators.required],
          phoneNumber:['', [Validators.required,Validators.pattern('^[0-9]{10}$')]],
          address:['',Validators.required],
          email:['',Validators.email],
          relationship:['',Validators.required],
          age:['',Validators.required,Validators.pattern('^[0-9]')]
        });
        if (this.mode === 'view') {
          formGroup.disable();
        }
        this.guarantorFormArray.push(formGroup);
      }),
      savingsService: this.formBuilder.group({
        nmb:[null],
        nbc:[null],
        crdb:[null],
        tigo:[null],
        mpesa:[null],
        airtel:[null],
        finca:[null],
        dtb:[null],
        kcb:[null],
        equity:[null],
        kibubu:[null],
        maendeleoBank:[null],
        stanbic:[null],
        dcb:[null],
        exim:[null],
        other:['']
      }),
      ageRange:[''],
      numberOdDependencies:['', [Validators.required, Validators.pattern('^[0-9]')]],

    });
   
  }

  get savingsGroup(){
    return this.detailsForm.get('savingsService') as FormGroup;
  }

  formatDateToISO(date: Date): string {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  
  get geGuarantorForms(): FormGroup[] {
    return  this.guarantorFormArray.controls as FormGroup[]
  }

  onCheckboxChange(event: MatCheckboxChange,  controlName: string,boolControlName: string): void {
    if (event.checked && this.mode !== 'view') {
      this.detailsForm.addControl(
        controlName,
        this.formBuilder.control(null, [Validators.required])
      );
      this.detailsForm.addControl(
        boolControlName,
        this.formBuilder.control(true)
      );
    } else  {
      this.detailsForm.removeControl(controlName);
    }
  }
  
  clearSavingsFields() {
    this.savingsGroup.patchValue({
      nmb:null,
      nbc:null,
      crdb:null,
      tigo:null,
      mpesa:null,
      airtel:null,
      finca:null,
      dtb:null,
      kcb:null,
      equity:null,
      kibubu:null,
      maendeleoBank:null,
      stanbic:null,
      dcb:null,
      exim:null,
      other:['']
    });
  }

  get getMarketDetails(){
    return this.detailsForm.value;
  }


}
 

