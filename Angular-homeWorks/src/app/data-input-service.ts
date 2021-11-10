import { Injectable } from "@angular/core";

export interface inputData{
    Checkbox?: any,
    Website?: string,
    confirm_password?: string,
    email?: string,
    nickName?: string,
    password?: string,
    phoneNumber?: string,
}
@Injectable({providedIn: 'root'})
export class DataInputService{

    users: inputData[] = [];

    constructor(){

    }
    add(element: inputData){
        this.users.push(element)
    }
    update(element: inputData, index: number){
        this.users.splice(index,1,element)
    }
    delete(id: number){
        this.users.splice(id,1)
    }
}