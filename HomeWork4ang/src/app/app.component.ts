import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Auth-Routing-Guards-CRUD Angular';
  isActive: any;
  EmployeeData: any;

  constructor(public auth: AuthService, private _api: ApiService){}
  
  onLogOut(){
    this.auth.ActivationValue = false
    this.getAllEmploee()
  }


  getAllEmploee(){
    this._api.Get_Data_From_Server()
    .subscribe(res=>{
      this.isActive = this.auth.CurrentUser
      this.EmployeeData = res
      
    })
  }
}
