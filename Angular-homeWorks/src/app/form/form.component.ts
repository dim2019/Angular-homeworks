import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
 

  

  constructor(private control: FormBuilder) { 
    this.checked = false
    this.isChacked = undefined
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
    console.log(this.form.value);
    this.form.reset();
    this.checked = !this.checked
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
