import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaterialTimepickerComponent, NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MarketService } from '../../../../markets/market-service.service';
import { VendorService } from '../../../vendor.service';
import { Zones } from '../../../zones.interface';

@Component({
  selector: 'app-vendor-business',
  standalone: true,
  imports: [
    MatSelectModule,
    CommonModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatOptionModule,
    MatCheckboxModule,

  ],
  templateUrl: './vendor-business-slots.component.html',
  styleUrls: ['./vendor-business-slots.component.scss']
})
export class VendorBusinesComponent implements OnInit {
  @Input() mode: 'create' | 'edit' | 'view' = 'create';
  @Input() id!: number; 
  @Output() formSubmit = new EventEmitter<any>();
  @ViewChild('timepicker') timepicker!: NgxMaterialTimepickerComponent;

  businessInformation!: FormGroup;
  selectedDay: string | null = null;
  selectedType: 'open' | 'close' | null = null;

  constructor(private fb: FormBuilder, private vendorService: VendorService) {}
  productKeys = [
    'matunda','mboga','nafaka','viungo','samakiWaKukaushwa',
    'biasharaMchanganyiko','pembejeoZaKilimo','vifaaVyaUmeme','kuku',
    'vifaaVyaUjenzi','dagaa','samakiWabichi','nyamaNgombe',
    'nyamaMbuzi','chakula','utumbo','nauzaMaji','mafutaYaKula',
    'mihogo','matundaYaliyokaushwa','ndizi','nazi','maziwa',
    'viazi','vifungashioNaBidhaaNyingine','kuuzaChakula',
    'zinginezo','magimbi','taxiDriver','wauzaNguo',
    'vingamuziVyaMagari','ofisi'
  ];

  productLabels: { [key: string]: string } = {
    matunda: 'Matunda',
    mboga: 'Mboga',
    nafaka: 'Nafaka',
    viungo: 'Viungo',
    samakiWaKukaushwa: 'Samaki wa kukaushwa',
    biasharaMchanganyiko: 'Biashara Mchanganyiko',
    pembejeoZaKilimo: 'Pembejeo za kilimo',
    vifaaVyaUmeme: 'Vifaa vya umeme',
    kuku: 'Kuku',
    vifaaVyaUjenzi: 'Vifaa vya ujenzi',
    dagaa: 'DAGAA',
    samakiWabichi: 'Samaki Wabichi',
    nyamaNgombe: "Nyama Ng'ombe",
    nyamaMbuzi: 'Nyama Mbuzi',
    chakula: 'Chakula',
    utumbo: 'Utumbo',
    nauzaMaji: 'Nauza Maji',
    mafutaYaKula: 'Mafuta ya Kula',
    mihogo: 'Mihogo',
    matundaYaliyokaushwa: 'Matunda Yalikauka',
    ndizi: 'Ndizi',
    nazi: 'Nazi',
    maziwa: 'Maziwa',
    viazi: 'Viazi',
    vifungashioNaBidhaaNyingine: 'Vifungashio na Bidhaa Nyingine',
    kuuzaChakula: 'Kuuza Chakula',
    zinginezo: 'Zinginezo',
    magimbi: 'Magimbi',
    taxiDriver: 'Taxi Driver',
    wauzaNguo: 'Wauza Nguo',
    vingamuziVyaMagari: 'Vingamuzi vya Magari',
    ofisi: 'Ofisi'
  };
 zones:Zones[] = [];
  ngOnInit() {
    this.vendorService.getMarketZones(1).subscribe((res:any)=>{
       this.zones = res ?? [];
       console.log(this.zones);
    });
    this.initializeForm();

    if (this.mode === 'view') {
      this.businessInformation.disable();
    }
    this.businessInformation.valueChanges.subscribe(value => {
      this.formSubmit.emit(value);
    });
  }

  initializeForm() {
    const productGroup = this.fb.group(
      this.productKeys.reduce((acc, key) => {
        acc[key] = [false];
        return acc;
      }, {} as { [key: string]: any }),
      { validators: this.atLeastOneCheckboxValidator }
    );
    this.businessInformation = this.fb.group({
      zoneName:['',Validators.required],
      stallNumber:['',Validators.required],
      businessExperienceYears:['',Validators.required],
      stallOwnership:['',Validators.required],
      ownerFullName:['',Validators.required],
      ownerPhoneNumber:['',Validators.required],
      ownerIdNumber:['',Validators.required],
      ownerIdType:['',Validators.required],
      products: productGroup,
    })
    if (this.mode === 'view') {
      this.businessInformation.disable();
    }
  }

  get checkedProducts() {
    const productsValue = this.businessInformation.get('products')?.value || {};
    return Object.keys(productsValue).filter(productKey => productsValue[productKey]);
  }
  
  private atLeastOneCheckboxValidator(control: AbstractControl) {
    const productValues = Object.values(control.value) as boolean[];
    return productValues.some((val: boolean) => val)
      ? null
      : { requireOneCheckbox: true };
  }
   splitArray(array: string[], chunkSize: number): string[][] {
    const result: string[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }
  get getVendorBusiness() {
    const formValues = this.businessInformation.value;
    const productsValue = formValues.products;
    const selectedProducts: { [key: string]: boolean } = {};
      for (const key of Object.keys(productsValue)) {
      if (productsValue[key] === true) {
        selectedProducts[key] = true;
      }
    }
      const payload = { 
      ...formValues, 
      products: selectedProducts 
    };
  
    return { 
      ...formValues, 
      products: selectedProducts 
     };
  }
  
}