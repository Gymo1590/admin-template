import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule, MatRadioButton } from '@angular/material/radio';

@Component({
  selector: 'app-market-intro',
 imports: [   
   CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatRadioModule,
    MatRadioButton
    ],
  templateUrl: './market-intro.component.html',
  styleUrl: './market-intro.component.scss'
})
export class MarketIntroComponent  implements OnInit {
 [x: string]: any;
  @Input() mode: 'create' | 'edit' | 'view' = 'create';  
  @Output() formSubmit = new EventEmitter<any>();
  
  name:string = 'Gift Peter Laizer'
  introForm!: FormGroup;

  constructor(private fb :FormBuilder){
   
  }

  ngOnInit(): void {
    this.introForm = this.fb.group({
      confirmation: [false, Validators.required]  ,
    })
    this.introForm.valueChanges.subscribe(value => {
      this.formSubmit.emit(value);
    });

  }
  
  get getIntroForm(){
    console.log("Challenges:",this.introForm.value);

    return this.introForm.value;
  }
}
