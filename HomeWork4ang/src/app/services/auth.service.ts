import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  ActivationValue: boolean = false

  CurrentUser: any

  constructor(private _http: HttpClient, private route: Router) { }

  isLogedIn(){
    return this.ActivationValue
  }

  login(form: any){
    this._http.get<any>("http://localhost:3000/data")
    .subscribe(res =>{
      const user = res.find((params: any)=>{
        return params.username === form.username && params.password === form.password
      });
      if(user){
        this.ActivationValue = true
        this.CurrentUser = user
        this.route.navigate(['user'])
      }else{
        this.ActivationValue
      }
    }, error=>{
      alert("Something went wrong")
    })
  }
}
