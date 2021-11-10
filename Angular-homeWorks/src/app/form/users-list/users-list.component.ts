import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataInputService, inputData } from 'src/app/data-input-service';
import { ConfirmedValidator } from '../ConfirmedValidator.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: inputData[]

  updateValue: 'update' | 'user-list' = 'user-list'
  UserDataChange: inputData
  id: number 
  
  form: FormGroup = new FormGroup({
    
  });

  protected regex = /^[a-z0-9][a-z0-9]*$/i
  protected regexNickname = /^[a-z0-9_]*$/i
  protected regexPhoneNumber = /([+380]{4})[-\s\./0-9]*$/
  protected regexURl = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/

  constructor(private element: DataInputService,private control: FormBuilder) {
    this.users = []
    this.UserDataChange = {}
    this.id = 0
   }


   onClick(event: object,index: number){
    this.UserDataChange = event 
    this.updateValue = 'update'
    this.id = index
    this.form = this.control.group({
      email: [`${this.UserDataChange.email}`, [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(7),Validators.pattern(this.regex)]],
      confirm_password: ['',[Validators.required]],
      nickName: [`${this.UserDataChange.nickName}`,[Validators.required, Validators.pattern(this.regexNickname)]],
      phoneNumber: [`${this.UserDataChange.phoneNumber}`,[Validators.required, Validators.pattern(this.regexPhoneNumber), Validators.maxLength(13)]],
      Website: [`${this.UserDataChange.Website}`,[Validators.required, Validators.pattern(this.regexURl)]],
    },{
      validator: ConfirmedValidator('password', 'confirm_password')
    })
    
  }
  onDeleteClick(element: inputData, id: number){
   var answer =  confirm(`This action will remove a user with this email: ${element.email} Are you shure?`)
   if(answer){
    this.element.delete(id)
   }
  }
  onSubmitClick(){
    this.updateValue = 'user-list'
    this.UserDataChange = this.form.value
    this.element.update(this.UserDataChange,this.id)
  }

  ngOnInit(): void {     

    // this.users.push(this.UserDatas)
     this.users = this.element.users
  }
}