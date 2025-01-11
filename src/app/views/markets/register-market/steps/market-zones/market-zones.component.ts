import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
    MatCheckboxModule
  ],
  templateUrl: './market-zones.component.html',
  styleUrls: ['./market-zones.component.scss']
})
export class MarketZonesComponent implements OnInit {
  @Input() mode: 'create' | 'edit' | 'view' = 'create';
  @Output() formSubmit = new EventEmitter<any>();

  zoneForm!: FormGroup;

  // Define product keys and labels
  productKeys = [
    'matunda', 'mboga', 'nafaka', 'viungo', 'samakiWaKukaushwa',
    'biasharaMchanganyiko', 'pembejeoZaKilimo', 'vifaaVyaUmeme', 'kuku',
    'vifaaVyaUjenzi', 'dagaa', 'samakiWabichi', 'nyamaNgombe',
    'nyamaMbuzi', 'chakula', 'utumbo', 'nauzaMaji', 'mafutaYaKula',
    'mihogo', 'matundaYaliyokaushwa', 'ndizi', 'nazi', 'maziwa',
    'viazi', 'vifungashioNaBidhaaNyingine', 'kuuzaChakula',
    'zinginezo', 'magimbi', 'taxiDriver', 'wauzaNguo',
    'vingamuziVyaMagari', 'ofisi'
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
    vifungashioNaBidhaaNyingine: 'Vigungashio na Bidhaa Nyingine',
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
  }

  initializeForm() {
    this.zoneForm = this.fb.group({
      zones: this.fb.array([this.createZone()]),  
    });
  }

  get zones(): FormArray {
    return this.zoneForm.get('zones') as FormArray;
  }

  createZone(): FormGroup {
    return this.fb.group({
      zoneName: ['', Validators.required],
      productList: this.fb.group(
        this.productKeys.reduce((acc, key) => {
          acc[key] = [false];
          return acc;
        }, {} as { [key: string]: any })
      ),
      leaderName: ['', Validators.required],
      leaderPhone: ['', Validators.required],
      leaderPhoneAlt: [''],
    });
  }

  addZone() {
    this.zones.push(this.createZone());
  }

  removeZone(index: number) {
    if (this.zones.length > 1) {
      this.zones.removeAt(index);
    }
  }

  submitForm() {
    if (this.zoneForm.valid) {
      const payload = this.transformPayload();
      this.formSubmit.emit(payload);
    } else {
      alert('Please fill all required fields.');
    }
  }

  transformPayload() {
    const formValues = this.zoneForm.value.zones;
    return {
      zoneCount: formValues.length,
      zones: formValues
    };
  }
}
