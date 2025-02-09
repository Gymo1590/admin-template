import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { VendorService } from '../../../vendor.service';
import { Region } from '../../region.interface';

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
  styleUrls: ['./vendor-details.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ]
})
export class VendorDetailsComponent implements OnInit {
  @Input() mode: 'create' | 'edit' | 'view' = 'create';  
  @Input() id!: number;  
  @Output() formSubmit = new EventEmitter<any>();

  detailsForm!: FormGroup;
  guarantorFormArray: FormArray;
  activeTabIndex = 0;
  haveBankAccount = false;
  guarantorTitles: string[] = ['Mtu Wa Kwanza', 'Mtu Wa Pili'];
  regions: Region[] = [];

  constructor(private formBuilder: FormBuilder, private vendorService:VendorService) {
    this.guarantorFormArray = this.formBuilder.array([]);
  }

  ngOnInit(): void {
    this.initialize();
    this.vendorService.getRegions().subscribe((data:any)=>{
      this.regions = data ?? [];
      console.log(data);
    })
    this.detailsForm.valueChanges.subscribe(value => {
      this.formSubmit.emit(value);
    });
    this.detailsForm.get('haveBankAccount')?.valueChanges.subscribe((value: boolean) => {
      this.haveBankAccount = value === true;
      if (!this.haveBankAccount) {
        this.clearSavingsFields();
      }
    });

    this.detailsForm.get('dob')?.valueChanges.subscribe(value => {
      if (value) {
        const formattedDate = this.formatDateToISO(value);
        if (formattedDate !== value) {
          this.detailsForm.get('dob')?.patchValue(formattedDate, { emitEvent: false });
        }
      }
    });

    // Disable form controls in view mode
    if (this.mode === 'view') {
      this.detailsForm.disable();
    }
  }

  initialize() {
    // Initialize guarantor controls
    this.guarantorTitles.forEach(title => {
      const formGroup = this.formBuilder.group({
        name: ['', Validators.required],
        phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        address: ['', Validators.required],
        email: ['', Validators.email],
        relationship: ['', Validators.required],
        age: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
      });
      if (this.mode === 'view') {
        formGroup.disable();
      }
      this.guarantorFormArray.push(formGroup);
    });

    // Initialize main form
    this.detailsForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      phoneNumberAlt: ['', [Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.email]],
      homeAddress: ['', Validators.required],
      dob: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      region: ['', Validators.required],
      haveBankAccount: [null],
      dailyIncome: [null],
      weeklyIncome: [null],
      monthlyIncome: [null],
      largestTransaction: [null],
      currentSavingAmt: [null],
      idType: this.formBuilder.group({
        idType: [''],
        idNumber: ['']
      }),
      guarantors: this.guarantorFormArray,
      savingsService: this.formBuilder.group({
        nmb: [false],
        nbc: [false],
        crdb: [false],
        tigo: [false],
        mpesa: [false],
        airtel: [false],
        finca: [false],
        dtb: [false],
        kcb: [false],
        equity: [false],
        kibubu: [false],
        maendeleoBank: [false],
        stanbic: [false],
        dcb: [false],
        exim: [false],
        other: ['']
      }),
      ageGroup: [''],
      dependents: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  get savingsGroup(): FormGroup {
    return this.detailsForm.get('savingsService') as FormGroup;
  }

  formatDateToISO(date: Date | string): string {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  get geGuarantorForms(): FormGroup[] {
    return this.guarantorFormArray.controls as FormGroup[];
  }

  onCheckboxChange(event: MatCheckboxChange, controlName: string, boolControlName: string): void {
    if (event.checked && this.mode !== 'view') {
      this.detailsForm.addControl(
        controlName,
        this.formBuilder.control('', [Validators.required])
      );
      this.detailsForm.addControl(
        boolControlName,
        this.formBuilder.control(true)
      );
    } else {
      this.detailsForm.removeControl(controlName);
      this.detailsForm.removeControl(boolControlName);
    }
  }

  clearSavingsFields() {
    this.savingsGroup.patchValue({
      nmb: false,
      nbc: false,
      crdb: false,
      tigo: false,
      mpesa: false,
      airtel: false,
      finca: false,
      dtb: false,
      kcb: false,
      equity: false,
      kibubu: false,
      maendeleoBank: false,
      stanbic: false,
      dcb: false,
      exim: false,
      other: ''
    });
  }
  get getVendorDetails() {
    const rawValue = this.detailsForm.getRawValue();

    if (rawValue.guarantors && Array.isArray(rawValue.guarantors)) {
      rawValue.guarantors = rawValue.guarantors.map((guarantor: any) => ({
        name: guarantor.name,
        phoneNumber: guarantor.phoneNumber,
        address: guarantor.address,
        email: guarantor.email,
        relationship: guarantor.relationship,
        age: guarantor.age
      }));
    }

    const idType: any = {};
    if (rawValue.nidaNumber) {
      idType["NIDA"] = rawValue.nidaNumber;
    }
    if (rawValue.licenceNumber) {
      idType["Leseni Ya Udereva"] = rawValue.licenceNumber;
    }
    if (rawValue.votingNumber) {
      idType["Kitambulisho Cha Kura"] = rawValue.votingNumber;
    }
    if (rawValue.otherIdNumber) {
      idType["Ziada"] = rawValue.otherIdNumber;
    }
    delete rawValue.nidaNumber;
    delete rawValue.licenceNumber;
    delete rawValue.votingNumber;
    delete rawValue.otherIdNumber;
    rawValue.idType = idType;

    if (rawValue.haveBankAccount) {
      const banks = rawValue.savingsService;
      const userBanks: any = {};
      Object.keys(banks).forEach(key => {
        if (typeof banks[key] === 'boolean' && banks[key] === true) {
          userBanks[key.toUpperCase()] = true;
        }
      });
      rawValue.userBanks = userBanks;
    }
    delete rawValue.savingsService;
    return rawValue;
  }
}
