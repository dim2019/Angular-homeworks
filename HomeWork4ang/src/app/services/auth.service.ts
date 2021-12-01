import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  ActivationValue: boolean = false

  CurrentUser: any

  subj1 = new Subject<boolean>()
  getValue = this.subj1.asObservable()

  constructor(private _http: HttpClient, private route: Router) { }

  isLogedIn(){
    return this.ActivationValue
  }


  login(form: any){
    this._http.get<any>("http://localhost:3000/data")
    .subscribe(res =>{
      const user = res.find((params: any)=>{
        return params.email === form.email && params.password === form.password
      });
      if(user){
        this.ActivationValue = true
        this.subj1.next(true)
        this.CurrentUser = user
        this.route.navigate(['user'])
      }else{
        this.ActivationValue
        this.subj1.next(false)
      }
    }, error=>{
      alert("Something went wrong")
    })
  }
}
