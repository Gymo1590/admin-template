import { Component, ChangeDetectionStrategy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MarketLeadersComponent } from './steps/market-leaders/market-leaders.component';
import { MarketDetailsComponent } from './steps/market-details/market-details.component';
import { MarketTimeSlotsComponent } from './steps/market-time-slots/market-time-slots.component';
import { MarketZonesComponent } from './steps/market-zones/market-zones.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MarketChallengesComponent } from './steps/market-challenges/market-challenges.component';
import { MarketIntroComponent } from './steps/market-intro/market-intro.component';
import { MatStepperModule } from '@angular/material/stepper';


@Component({
  selector: 'app-register-market',
  templateUrl: './register-market.component.html',
  styleUrls: ['./register-market.component.scss'],
  imports: [
    MarketLeadersComponent,
    MarketDetailsComponent,
    MarketChallengesComponent,
    MarketTimeSlotsComponent,
    MarketZonesComponent,
    CommonModule,
    ReactiveFormsModule,
    MatIcon,
    MatStepperModule,
    MarketIntroComponent
  ]
})
export class RegisterMarketComponent implements OnInit {
  @ViewChild(MarketChallengesComponent, { static: false }) marketChallenges?: MarketChallengesComponent;
  @ViewChild(MarketLeadersComponent, { static: false }) marketLeaders?: MarketLeadersComponent;
  @ViewChild(MarketDetailsComponent, { static: false }) marketDetails?: MarketDetailsComponent;
  @ViewChild(MarketTimeSlotsComponent, { static: false }) marketTimeSlots?: MarketTimeSlotsComponent;
  @ViewChild(MarketZonesComponent, { static: false }) marketZones?: MarketZonesComponent;
  @ViewChild(MarketIntroComponent, { static: false }) marketIntro?: MarketIntroComponent;

  currentStep = 1;
  mode: 'create' | 'edit' | 'view' = 'create';
  formData: any = {};
  currentStepIndex = 0;  

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  nextStep() {
    if (this.currentStep < 6) this.currentStep++;
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  updateFormData(step: string, data: any) {
    this.formData[step] = data;
  }

  changeMode(newMode: 'create' | 'edit' | 'view') {
    this.mode = newMode;
  }

  get registerData() {
    return {
      ...(this.marketChallenges?.getMarketChallenges || {}),
      ...(this.marketDetails?.getMarketDetails || {}),
      ...(this.marketIntro?.getIntroForm || {}),
      ...(this.marketLeaders?.getLeadersFormData || {}),
      ...(this.marketZones?.getMarketZones || {}),
      ...(this.marketTimeSlots?.getMarketSlots || {})
    };
  }

  submitData() {
    console.log('Final Form Data:', this.registerData);
  }
}
