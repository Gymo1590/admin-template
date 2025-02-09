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
  selector: 'app-market-challenges',
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
  templateUrl: './market-challenges.component.html',
  styleUrl: './market-challenges.component.scss'
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

  titles = ['Changamoto za Viongozi','Changamoto za Wachuuzi'];

  challenges = {
    leadership: ['Kutunza taarifa', 'Kuvutia wateja wapya', 'Usimamizi wa fedha'],
    vendor: [
      'Mikopo na fedha',
      'Usimamizi wa bidhaa sokoni',
      'Changamoto ya upatikanaji wa bidhaa sokoni',
      'USHINDANI UMEKUWA',
      'Mtaji mdogo',
      'Ukosefu wa umeme (maziwa yanaharibika)',
      'Mfumuko wa bei za bidhaa na huduma',
      'MIUNDOMBINU MIBOVU',
    ],
  };

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      leadershipChallenges: this.fb.group({
        kutunzaTaarifa:[false],
        kuvutaWateja:[false],
        usimamiziFedha:[false],
        other: [''],
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
        other: [''],
      }),
        trainingReceived: [null, Validators.required], 
        frequency: [null,Validators.required],
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
      frequency: 0,
      institution: '',
      objective: '',
    });
  }

  get leadershipGroup(): FormGroup {
    return this.form.get('leadershipChallenges') as FormGroup;
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
  return this.form.value
 }
}
