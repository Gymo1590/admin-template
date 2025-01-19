import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-vendor-challenges',
    imports: [   
   CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTabsModule,
    MatRadioModule,
    MatRadioButton
         ],
  templateUrl: './vendor-challenges.component.html',
  styleUrl: './vendor-challenges.component.scss'
})
export class MarketChallengesComponent implements OnInit{
  [x: string]: any;
  @Input() mode: 'create' | 'edit' | 'view' = 'create';
  @Input() id!: number;  
  @Output() formSubmit = new EventEmitter<any>();
  
  currentTab: string = 'leadership';
  form: FormGroup;
  activeTabIndex = 0;
  isCurrentTraining =false;
  otherHelp1 = true;
  otherHelp2=true;

  titles = ['Changamoto Za Mchuuzi','Aina Ya Msaada'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      vendorHelp: this.fb.group({
        msaadaFedha:[false],
        elimuBiashara:[false],
        uboreshajiBiashara:[false],
        otherHelp:[false],
        otherHelpText:['']
      }),
      vendorChallenges: this.fb.group({
        mkopoFedha:[false],
        bidhaaMsimamizi:[false],
        bidhaaChangamoto:[false],
        mtajiMdogo:[false],
        ukosefuUmeme:[false],
        beiMfumuko:[false],
        miundombinuMibovu:[false],
        ushindaniSokoni:[false],
        mahitajiWateja:[false],
        otherChallengeHelp: [false],
        otherChallengeText:['']
      }),
        trainingReceived: [null, Validators.required], 
        institution: ['',Validators.required],
        objective: ['',Validators.required],
    });
  }
 
  ngOnInit() {
    this.form.get('trainingReceived')?.valueChanges.subscribe((value: boolean) => {
      this.isCurrentTraining = value === true;
      if (!this.isCurrentTraining) {
        this.clearTrainingFields();
      }
    });
    this.form.get('otherHelp')?.valueChanges.subscribe((value: boolean) => {
      this.otherHelp1 = value === true;
    });
    this.form.get('otherChallengeHelp')?.valueChanges.subscribe((value: boolean) => {
      this.otherHelp2 = value === true;
    });
    this.form.valueChanges.subscribe(value => {
      this.formSubmit.emit(value);
    });
    if (this.mode === 'view') {
      this.form.disable();
    }
  }
  
  onCurrentTrainingChange() {
    const currentTraining: boolean = this.form.get('trainingReceived')?.value;
    this.isCurrentTraining = currentTraining === true;
  }

  get trainingGroup(): FormGroup {
    return this.form.get('training') as FormGroup;
  }

  clearTrainingFields() {
    this.form.patchValue({
      institution: '',
      objective: '',
    });
  }

  get vendorHeloGroup(): FormGroup {
    return this.form.get('vendorHelp') as FormGroup;
  }

  get vendorGroup(): FormGroup {
    return this.form.get('vendorChallenges') as FormGroup;
  }

   

  selectedChallenges = {
    leadership: new Set<number>(),
    vendor: new Set<number>(),
  };

  splitArray(array: string[], chunkSize: number): string[][] {
    const result: string[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

  onLeadershipChange(event: any, index: number): void {
    this.toggleSelection('leadership', index, event.target.checked);
  }

  onVendorChange(event: any, index: number): void {
    this.toggleSelection('vendor', index, event.target.checked);
  }

  toggleSelection(group: 'leadership' | 'vendor', index: number, checked: boolean): void {
    if (checked) {
      this.selectedChallenges[group].add(index);
    } else {
      this.selectedChallenges[group].delete(index);
    }
  }

  isChallengeSelected(group: 'leadership' | 'vendor', index: number): boolean {
    return this.selectedChallenges[group].has(index);
  }

 get getMarketChallenges(){
  console.log("Challengeseeeeeeengess:",this.form.value);
  return this.form.value
 }
}
