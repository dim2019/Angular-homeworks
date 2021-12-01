import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup = new FormGroup({})

  alertForWrongInput: boolean = false


  constructor(private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required]]
    })    
  }
  onSubmit(){
   if(this.form.valid){
    this.auth.login(this.form.value)
    this.auth.getValue
    .subscribe(res=>{
      if(!res){
        this.alertForWrongInput = true
      }
    })
    this.form.reset()
   }else{
    
   }
  
  }
}
