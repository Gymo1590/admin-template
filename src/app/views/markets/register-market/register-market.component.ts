import { Component,ChangeDetectionStrategy,OnInit,Input} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MarketLeadersComponent } from './steps/market-leaders/market-leaders.component';
import { MarketDetailsComponent } from './steps/market-details/market-details.component';
import { MarketTimeSlotsComponent } from './steps/market-time-slots/market-time-slots.component';
import { MarketZonesComponent } from './steps/market-zones/market-zones.component';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MarketChallengesComponent } from './steps/market-challenges/market-challenges.component';
import { MarketIntroComponent } from './steps/market-intro/market-intro.component';
 
@Component({
  selector: 'app-register-market',
  templateUrl: './register-market.component.html',
  styleUrls: ['./register-market.component.scss'],
  imports:[
    MarketLeadersComponent,
    MarketDetailsComponent,
    MarketChallengesComponent,
    MarketTimeSlotsComponent,
    MarketZonesComponent,
    CommonModule ,
    ReactiveFormsModule,
    MatIcon,
    MarketIntroComponent
  ]
})
   
export class RegisterMarketComponent {
  currentStep = 1;
  mode: 'create' | 'edit' | 'view' = 'create';
  formData: any = {};

  constructor(private fb: FormBuilder) {}

  nextStep() {
    if (this.currentStep < 6) this.currentStep++;
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  submitData() {
    console.log('Final Form Data:', this.formData);
  }

  updateFormData(step: string, data: any) {
    this.formData[step] = data;
  }

  changeMode(newMode: 'create' | 'edit' | 'view') {
    this.mode = newMode;
  }

}