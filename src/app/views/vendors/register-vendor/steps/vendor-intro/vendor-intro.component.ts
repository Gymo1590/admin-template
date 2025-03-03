import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule, MatRadioButton } from '@angular/material/radio';

@Component({
  selector: 'app-vendor-intro',
 imports: [   
   CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatRadioModule,
    MatRadioButton
    ],
  templateUrl: './vendor-intro.component.html',
  styleUrl: './vendor-intro.component.scss'
})
export class VendorIntroComponent  implements OnInit {
 [x: string]: any;
  @Input() mode: 'create' | 'edit' | 'view' = 'create';  
  @Input() id!: number; 
  @Output() formSubmit = new EventEmitter<any>();
  
  name:string = 'Gift Peter Laizer'
  introForm!: FormGroup;

  constructor(private fb :FormBuilder){
   
  }

  ngOnInit(): void {
    console.log(this.mode);
    console.log(this.id);
    this.introForm = this.fb.group({
      dataClerkConsent: [false, Validators.required]  ,
    })
    if (this.mode === 'view') {
      this.introForm.disable();
    }
    this.introForm.valueChanges.subscribe(value => {
      this.formSubmit.emit(value);
    });

  }
  
  get getIntroForm(){
    return this.introForm.value;
  }
}
