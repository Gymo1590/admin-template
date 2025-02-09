import { Component, ChangeDetectionStrategy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { VendorService } from '../vendor.service';
import { VendorChallengesComponent } from './steps/vendor-challenges/vendor-challenges.component';
import { VendorDetailsComponent } from './steps/vendor-details/vendor-details.component';
import { VendorIntroComponent } from './steps/vendor-intro/vendor-intro.component';
import { VendorBusinesComponent } from './steps/vendor-business-slots/vendor-business-slots.component';
import { VendorLoansComponent } from './steps/vendor-loans/vendor-loans.component';
import { VendorFinancialStatus } from './steps/vendor-finance/vendor-finance.component';

@Component({
  selector: 'app-register-vendor',
  templateUrl: './register-vendor.component.html',
  styleUrls: ['./register-vendor.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIcon,
    MatStepperModule,
    VendorChallengesComponent,
    VendorLoansComponent,
    VendorDetailsComponent,
    VendorBusinesComponent,
    VendorIntroComponent,
    VendorFinancialStatus
  ],
  
})
export class RegisterMarketComponent implements OnInit {
  @ViewChild(VendorChallengesComponent, { static: false }) vendorChallenges?: VendorChallengesComponent;
  @ViewChild(VendorLoansComponent, { static: false }) vendorLoans?: VendorLoansComponent;
  @ViewChild(VendorDetailsComponent, { static: false }) vendorDetails?: VendorDetailsComponent;
  @ViewChild(VendorBusinesComponent, { static: false }) vendorBusiness?: VendorBusinesComponent;
  @ViewChild(VendorFinancialStatus, { static: false }) vendorFinance?: VendorFinancialStatus;
  @ViewChild(VendorIntroComponent, { static: false }) vendorIntro?: VendorIntroComponent;

  currentStep = 1;
  id!:number;
  mode: 'create' | 'edit' | 'view' = 'create';
  formData: any = {};
  currentStepIndex = 0;  

  constructor(private fb: FormBuilder, private vendorService: VendorService, private route:ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.mode = params['mode'];
      this.id = +params['id'];  
    });
    // if(this.mode !== 'create'){
    //   this.setForms(this.id);
    // }
  }

  setForms(id: number) {
    this.vendorService.getVendorById(id).subscribe((res: any) => {
      const data = res;
      // if (this.marketDetails && data) {
      //   this.marketDetails.detailsForm.patchValue({
      //     marketImage: data.marketImage,
      //     name: data.name,
      //     address: data.address,
      //     latitude: data.latitude,
      //     longitude: data.longitude,
      //     zoneCount: data.zoneCount,
      //     stallCount: data.stallCount,
      //     vendorCount: data.vendorCount,
      //     femaleCount: data.femaleCount,
      //     maleCount: data.maleCount,
      //     youngCount: data.youngCount,
      //     youthCount: data.youthCount,
      //     adultCount: data.adultCount,
      //     loans: data.loans,
      //     bankAgent: data.bankAgent,
      //     mobileAgent: data.mobileAgent,
      //     bankAgentCount: data.bankAgentCount,
      //     mobileAgentCount: data.mobileAgentCount,
      //     refrigerationRoom: data.refrigerationRoom,
      //     refrigerationRoomCount: data.refrigerationRoomCount,
      //     dayCare: data.dayCare,
      //     dayCareCount: data.dayCareCount,
      //     loanService: data.loanService,
      //     loanServiceCount: data.loanServiceCount,
      //     insuranceService: data.insuranceService,
      //     insuranceServiceCount: data.insuranceServiceCount,
      //     savingService: data.savingService,
      //     savingServiceCount: data.savingServiceCount,
      //     paymentService: data.paymentService,
      //     paymentServiceCount: data.paymentServiceCount,
      //   });
      // }
  
      // if (this.marketChallenges && data) {
      //   this.marketChallenges.form.patchValue({
      //     trainingReceived: data.trainingReceived,
      //     frequency: data.frequency,
      //     institution: data.institution,
      //     objective: data.objective,
      //     leadershipChallenges: {
      //       kutunzaTaarifa: data.leadershipChallenges?.kutunzaTaarifa,
      //       kuvutaWateja: data.leadershipChallenges?.kuvutaWateja,
      //       usimamiziFedha: data.leadershipChallenges?.usimamiziFedha,
      //       other: data.leadershipChallenges?.other ?? '',
      //     },
      //     vendorChallenges: {
      //       mkopoFedha: data.vendorChallenges?.mkopoFedha,
      //       bidhaaMsimamizi: data.vendorChallenges?.bidhaaMsimamizi,
      //       bidhaaChangamoto: data.vendorChallenges?.bidhaaChangamoto,
      //       mtajiMdogo: data.vendorChallenges?.mtajiMdogo,
      //       ukosefuUmeme: data.vendorChallenges?.ukosefuUmeme,
      //       beiMfumuko: data.vendorChallenges?.beiMfumuko,
      //       miundombinuMibovu: data.vendorChallenges?.miundombinuMibovu,
      //       ushindaniSokoni: data.vendorChallenges?.ushindaniSokoni,
      //       mahitajiWateja: data.vendorChallenges?.mahitajiWateja,
      //       other: data.vendorChallenges?.other ?? '',
      //     },
      //   });
      // }

      
      //   if (this.marketLeaders && data) {
      //   const leadersArray = this.marketLeaders.leadersFormArray;
      //   leadersArray.clear(); 
  
      //   data.leaders?.forEach((leader: any) => {
      //     const formGroup = this.marketLeaders!.fb.group({
      //       firstName: [leader.firstName],
      //       lastName: [leader.lastName,  ],
      //       gender: [leader.gender,  ],
      //       contactPhone: [leader.contactPhone],
      //       email: [leader.email],
      //       designation: [leader.designation,  ],
      //       idNumber: [leader.idNumber,  ],
      //       idTypeName: [leader.idName,  ],
      //       dateOfBirth: [leader.dateOfBirth,  ],
      //       contactPerson: [leader.isContactPerson || false],
      //       canLogin: [leader.canLogin || false]
      //     });
  
      //     leadersArray.push(formGroup);
      //   });
      // }

      // if (this.marketTimeSlots && data?.timeSlots) {
      //   const timeSlotsData: { [key: string]: any } = {};
      //   data.timeSlots.forEach((slot: any) => {
      //     const day = slot.slotName.toLowerCase();
      //     timeSlotsData[`${day}Open`] = slot.openTime;
      //     timeSlotsData[`${day}Close`] = slot.closeTime;
      //   });
      //   this.marketTimeSlots.timeSlotsForm.patchValue(timeSlotsData);
      // }

      //  if (this.marketZones && data?.zones) {
      //   const zonesArray = this.marketZones.zones;
      //   zonesArray.clear();  
  
      //   data.zones.forEach((zone: any) => {
      //     const zoneGroup = this.marketZones!.createZone();
      //     zoneGroup.patchValue({
      //       zoneName: zone.leaderName,  
      //       leaderName: zone.leaderName,
      //       leaderPhone: zone.leaderPhone,
      //       leaderPhoneAlt: zone.leaderPhoneAlt
      //     });
  
      //     if (zone.products) {
      //       for (const key of this.marketZones!.productKeys) {
      //         if (zone.products.hasOwnProperty(key)) {
      //           zoneGroup.get('products')?.get(key)?.setValue(zone.products[key]);
      //         }
      //       }
      //     }
      //     zonesArray.push(zoneGroup);
      //   });
      // }
    });
  }
  
  
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

  get registerVendorData() {
    return {
      belongsToSokoni: true,
      belongsToKilimo: false,
      marketZoneId: 1,
      sokoniId:1,
      isMerchantMember:true,
      ...this.vendorIntro?.getIntroForm,

      baseClient:{
        ...this.vendorDetails?.getVendorDetails,
      },
      sokoniClient:{
        ...(this.vendorChallenges?.getVendorsChallenges || {}),
        ...(this.vendorBusiness?.getVendorBusiness || {}),
        ...(this.vendorFinance?.vendorFinancialStatus || {}),
        ...(this.vendorLoans?.loansFormData || {})
      }
    };
  }

  submitData() {
    console.log(this.registerVendorData);

    if(this.mode === 'create'){
      this.vendorService.createVendor(this.registerVendorData).subscribe(
        (res: any) => {
          alert('Market has been created');
          this.router.navigate(['../'])
        },
        (error) => {
          console.error('Error creating market:', error);
          alert('Failed to create market');
        }
      );
    }
    // if(this.mode === 'edit'){
    //   this.vendorService.updateVendor(this.id,this.registerVendorData).subscribe(
    //     (res: any) => {
    //       alert('Market has been updated');
    //       this.router.navigate(['../'])
    //     },
    //     (error) => {
    //       console.error('Error while updating the market:', error);
    //       alert('Failed to update market!!!');
    //     }
    //   );
    // }

    }
  
}
