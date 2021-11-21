import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { EmployeeModel } from '../employee-dashboard-interface';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  @Input() EmployeeData: EmployeeModel[] = []
  @Output() employee =  new EventEmitter<EmployeeModel>();


  // --- pagination ---//
  page: number = 1;
  itemPerPages: number = 8;


  constructor(private _api: ApiService) { }

  ngOnInit(): void {
    this.getAllEmploee()
  }

  getAllEmploee(){
    this._api.Get_Data_From_Server()
    .subscribe(res=>{
      this.EmployeeData = res
      
    })
  }
  Delete_Employee(employee: EmployeeModel){
    var answer =  confirm(`Are you sure you want to continue?`)
    if(answer){
      this._api.Delete_Data_To_Server(employee.id)
      .subscribe(res=>{
        this.getAllEmploee()
      })
    }

  }
  Edit_Employee(employee: EmployeeModel){
    this.employee.emit(employee)
  }

}
