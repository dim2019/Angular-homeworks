import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { EmployeeModel } from '../services/model.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [
    trigger('clear_user',[
      state('void', style({
        opacity: 0
      })),
      transition('void => *',animate(500))
    ]),
    trigger('showArrow',
    [            
        state('*', style({opacity: 0})),
        state('in', style({opacity: 1})),
        state('out', style({opacity: 0})),

        transition('* => in', [
           animate(1000)    
        ]),

        transition('* => out', [
            animate(1000)
        ])
    ])
  ],
  
})
export class UserComponent implements OnInit {

  EmployeeData: EmployeeModel[] = []
  
  isActive: any

    // --- pagination ---//
  page: number = 1;
  itemPerPages: number = 8;

  deleteEMP: any
  showArrow: boolean = false

  public form: FormGroup = new FormGroup({})
  private employeesOBJ: EmployeeModel = new EmployeeModel();

  constructor(private auth: AuthService, private _api: ApiService, private route: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['',[Validators.required]],
      age: ['',[Validators.required]],
      salary: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required]],
    })
    this.getAllEmploee()
  }

  getAllEmploee(){
    this._api.Get_Data_From_Server()
    .subscribe(res=>{
      this.isActive = this.auth.CurrentUser
      this.EmployeeData = res
      
    })
  }
  Delete_Employee(employee: EmployeeModel){
    this.deleteEMP = employee
    this.showArrow = true
  }
  
  delete(){ 
      this._api.Delete_Data_To_Server(this.deleteEMP.id)
      .subscribe(res=>{
        this.getAllEmploee()
        let dismiss = document.getElementById('dismiss')
        dismiss?.click();
        this.auth.ActivationValue = false
        this.route.navigate(['login'])
      })
     


    
  }
  Edit_Employee(employee: EmployeeModel){
    this.employeesOBJ.id = employee.id
    this.form.controls['name'].setValue(employee.name)
    this.form.controls['salary'].setValue(employee.salary)
    this.form.controls['age'].setValue(employee.age)
    this.form.controls['email'].setValue(employee.email)
    this.form.controls['password'].setValue(employee.password)
  }
  Update_Employees_To_Server(){
    this.employeesOBJ.name = this.form.value.name;
    this.employeesOBJ.salary = `${this.form.value.salary}`;
    this.employeesOBJ.age = `${this.form.value.age}`;
    this.employeesOBJ.email = `${this.form.value.email}`;
    this.employeesOBJ.password = `${this.form.value.password}`;
    this._api.Update_Data_to_server(this.employeesOBJ,this.employeesOBJ.id).subscribe(res=>{
      let cancel = document.getElementById('cancel')
      cancel?.click();
      this._api.Get_Data_From_Server()
      .subscribe(response =>{
        this.EmployeeData = response
      })
      this.form.reset(); 
      this.isActive = res
      // alert('წარმატებით განახლდა ინფორმაცია, გთხოვთ თავიდან გაიაროთ ავტორიცაზია !') 
      // this.auth.ActivationValue = false
      // this.route.navigate(['/'])

      
    })
  }

}
