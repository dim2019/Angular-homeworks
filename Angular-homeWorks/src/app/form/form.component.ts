import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataInputService, inputData } from '../data-input-service';
import { ConfirmedValidator } from './ConfirmedValidator.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})


export class FormComponent implements OnInit,OnDestroy {
  

  form: FormGroup = new FormGroup({});

  protected regex = /^[a-z0-9][a-z0-9]*$/i
  protected regexNickname = /^[a-z0-9_]*$/i
  protected regexPhoneNumber = /([+380]{4})[-\s\./0-9]*$/
  protected regexURl = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
  public checked: boolean
  isChacked: boolean | undefined;
  public data: inputData
 

  

  constructor(private control: FormBuilder, private router: Router, private element: DataInputService) { 
    this.checked = false
    this.isChacked = undefined
    this.data = {}
  }
  goToPage(pageName: string): void{
    this.router.navigate([`${pageName}`])    
  }
  get f(){
    return this.form.controls;
  }
  ngOnInit(): void {
    this.form = this.control.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(7),Validators.pattern(this.regex)]],
      confirm_password: ['',[Validators.required]],
      nickName: ['',[Validators.required, Validators.pattern(this.regexNickname)]],
      phoneNumber: ['',[Validators.required, Validators.pattern(this.regexPhoneNumber), Validators.maxLength(13)]],
      Website: ['',[Validators.required, Validators.pattern(this.regexURl)]],
      Checkbox: [null,[Validators.required]]
      
  },{
    validator: ConfirmedValidator('password', 'confirm_password')
  })
  }
  onChange(event: any){
    this.isChacked = event.target.checked
 }
  submit(){
    let user = this.form.value
    Object.assign(this.data,user)
    this.element.add(this.form.value)
    /* რესეტი */
    this.form.reset();  
  }


  formControlValueChange(){
    if(this.form.get('email')?.invalid || this.form.get('password')?.invalid || this.form.get('confirm_password')?.invalid || this.form.get('nickName')?.invalid || this.form.get('phoneNumber')?.invalid || this.form.get('Website')?.invalid || !this.isChacked){
      return true
    }else{
      return false
    }
  }

  ngOnDestroy(){  
    this.form
  }

}
