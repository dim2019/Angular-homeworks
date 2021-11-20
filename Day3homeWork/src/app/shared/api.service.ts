import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { 

  }

  
  Send_Data_To_Server(data: any){
    return this._http.post<any>(`http://localhost:3000/data`, data,)
    .pipe(map((response: any)=>{
      return response
    }))
  }
  Get_Data_From_Server(){
    return this._http.get<any>('http://localhost:3000/data')
    .pipe(map((response: any)=>{
      return response
    }))
  }
  Update_Data_to_server(data: any, id: number){
    return this._http.put<any>(`http://localhost:3000/data/${id}`, data)
    .pipe(map((response: any)=>{
      return response
    }))
  }
  Delete_Data_To_Server(id: number){
    return this._http.delete<any>(`http://localhost:3000/data/${id}`)
    .pipe(map((response: any)=>{
      return response
    }))
  }
}
