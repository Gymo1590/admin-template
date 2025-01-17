import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-market-zones',
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
  templateUrl: './market-zones.component.html',
  styleUrls: ['./market-zones.component.scss']
})
export class MarketZonesComponent implements OnInit {
  @Input() mode: 'create' | 'edit' | 'view' = 'create';
  @Input() id!: number; 
  @Output() formSubmit = new EventEmitter<any>();

  zoneForm!: FormGroup;
  selectedTabIndex = 0;

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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
    if (this.mode === 'view') {
      this.zoneForm.disable();
    }
    this.zoneForm.valueChanges.subscribe(value => {
      this.formSubmit.emit(value);
    });
  }
 
  private atLeastOneCheckboxValidator(control: AbstractControl) {
    const productValues = Object.values(control.value) as boolean[];
    return productValues.some((val: boolean) => val)
      ? null
      : { requireOneCheckbox: true };
  }

  initializeForm() {
    this.zoneForm = this.fb.group({
      zones: this.fb.array([this.createZone()]) 
    });
  }
 
  get zones(): FormArray {
    return this.zoneForm.get('zones') as FormArray;
  }

  createZone(): FormGroup {
    const productGroup = this.fb.group(
      this.productKeys.reduce((acc, key) => {
        acc[key] = [false];
        return acc;
      }, {} as { [key: string]: any }),
      { validators: this.atLeastOneCheckboxValidator }
    );

    return this.fb.group({
      zoneName: ['', Validators.required],
      products: productGroup,
      leaderName: ['', Validators.required],
      leaderPhone: ['', Validators.required],
      leaderPhoneAlt: ['']
    });
  }
  splitArray(array: string[], chunkSize: number): string[][] {
    const result: string[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }
  
  addZone() {
    const currentZoneValid = this.zones.at(this.selectedTabIndex).valid;
    if (currentZoneValid) {
      this.zones.push(this.createZone());
  
      this.selectedTabIndex = this.zones.length - 1;
    }
  }

  removeZone(index: number) {
    if (this.zones.length > 1) {
      this.zones.removeAt(index);
 
      if (this.selectedTabIndex >= this.zones.length) {
        this.selectedTabIndex = this.zones.length - 1;
      }
    }
  }
 
  get isCurrentZoneValid(): boolean {
    return !!this.zones.at(this.selectedTabIndex)?.valid;
  }



  get getMarketZones() {
    const formValues = this.zoneForm.value.zones;
    console.log("Challenges:",{
      zoneCount: formValues.length,
      zones: formValues
    });

    return {
      zoneCount: formValues.length,
      zones: formValues
    };
  }
}
