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

  productsList: string[] = [
    'Matunda', 'Mboga', 'Nafaka', 'Viungo', 'Samaki wa kukaushwa', 'Biashara Mchanganyiko',
    'Pembejeo za kilimo', 'Vifaa vya umeme', 'Kuku', 'Vifaa vya ujenzi', 'DAGAA',
    'SAMAKI WABICHI', 'NYAMA NG\'OMBE', 'NYAMA MBUZI', 'CHAKULA', 'UTUMBO',
    'Nauza maji', 'UZAJI WA MAFUTA YA KULA', 'MIHOGO', 'MATUNDA YALIYOKAUSHWA',
    'NDIZI', 'NAZI', 'Maziwa', 'VIAZI', 'VIGUNGASHIO NA BIDHA NYINGINE',
    'KUUZA CHAKULA', 'Zinginezo (bainisha)', 'MAGIMBI', 'TAXI DRIVER',
    'WAUZA NGUO', 'Vingamuzi vya magari', 'Ofisi'
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
    if (this.mode === 'view') {
      this.zoneForm.disable();
    }
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
    return this.fb.group({
      zoneName: ['', Validators.required],
      products: this.fb.group(
        this.productsList.reduce((acc: { [key: string]: any }, product: string) => {
          acc[product] = [false];  // Default all checkboxes to unchecked
          return acc;
        }, {})
      ),
      leaderName: ['', Validators.required],
      leaderPhone: ['', Validators.required],
      leaderPhoneAlt: ['']
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
