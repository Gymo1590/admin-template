import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerComponent, NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-market-time-slots',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,NgxMaterialTimepickerModule,MatFormFieldModule,MatIconModule,MatButtonModule],
  templateUrl: './market-time-slots.component.html',
  styleUrls: ['./market-time-slots.component.scss']
})
export class MarketTimeSlotsComponent implements OnInit {
  @Input() mode: 'create' | 'edit' | 'view' = 'create';
  @Output() formSubmit = new EventEmitter<any>();

  timeSlotsForm!: FormGroup;
  selectedDay: string | null = null;
  selectedType: 'open' | 'close' | null = null;

  @ViewChild('timepicker') timepicker!: NgxMaterialTimepickerComponent;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();

    if (this.mode === 'view') {
      this.timeSlotsForm.disable();
    }
  }

  initializeForm() {
    this.timeSlotsForm = this.fb.group({
      mondayOpen: [''],
      mondayClose: [''],
      tuesdayOpen: [''],
      tuesdayClose: [''],
      wednesdayOpen: [''],
      wednesdayClose: [''],
      thursdayOpen: [''],
      thursdayClose: [''],
      fridayOpen: [''],
      fridayClose: [''],
      saturdayOpen: [''],
      saturdayClose: [''],
      sundayOpen: [''],
      sundayClose: ['']
    });
  }

  openPicker(day: string, type: 'open' | 'close') {
    this.selectedDay = day;
    this.selectedType = type;
    this.timepicker.open();
  }

  setTime(event: string) {
    if (this.selectedDay && this.selectedType) {
      const controlName = this.selectedDay + this.selectedType.charAt(0).toUpperCase() + this.selectedType.slice(1);
      this.timeSlotsForm.patchValue({ [controlName]: event });
    }
  }

  submitForm() {
    if (this.timeSlotsForm.valid) {
      const payload = this.transformToPayload();
      this.formSubmit.emit(payload);
    } else {
      alert('Please fill all required fields.');
    }
  }

  transformToPayload() {
    const formValues = this.timeSlotsForm.value;
    const timeSlots: { slotName: string; openTime: string; closeTime: string }[] = [];
  
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
    for (let day of days) {
      if (formValues[`${day}Open`] && formValues[`${day}Close`]) {
        timeSlots.push({
          slotName: day.charAt(0).toUpperCase() + day.slice(1),
          openTime: formValues[`${day}Open`],
          closeTime: formValues[`${day}Close`]
        });
      }
    }
    return { timeSlots };
  }
  

    
}
