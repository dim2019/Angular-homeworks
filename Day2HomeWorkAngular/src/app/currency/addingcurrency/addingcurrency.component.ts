import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Services } from '../currency.service';

@Component({
  selector: 'app-addingcurrency',
  templateUrl: './addingcurrency.component.html',
  styleUrls: ['./addingcurrency.component.scss']
})
export class AddingcurrencyComponent implements OnInit {


  @Input() CurencyNameArray: string[] = [];
  @Input() InputValue: number  =  1;
  @Input() SelectedValue: string = 'EUR';
  @Input() Index: number = 0
  form: FormGroup = new FormGroup({});
  protected regex = "^[0-9.]*$"


  constructor(private service: Services, private fb: FormBuilder) {
 

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      curencyType3: ['',[Validators.pattern(this.regex)]]
    })
  }
  on_Input_Click(element: any){
    this.service.ArrayForAddNewItem[this.Index].input = element.target.value
    this.InputValue = element.target.value   
    this.service.gathering() 
  }
  Select_Change_Listener(event: any){
    this.service.ArrayForAddNewItem[this.Index].Currency = event.target.value
    this.SelectedValue = event.target.value   
    this.service.gathering() 
  }

  on_click_delete_LIstener(){
    this.service.delete(this.Index)
    this.service.gathering() 
  }

}
