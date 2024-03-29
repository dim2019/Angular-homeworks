import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HTTPdata, HTTPdataBindedRates, Services } from './currency.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

  currencyArray: string[]   = []
  selectedValue: any
  form: FormGroup = new FormGroup({});
  protected regex = "^[0-9.]*$"



  cuarrencyValue1: string = 'EUR'
  cuarrencyValue2: string = 'EUR'
  AllDataAboutCurrency: any



  firstInputValue: number = 1;
  SecondInputValue: number = 1;


  ExchangeRateFirst: number = 1;
  ExchangeRateSecond: number = 1;


  SumSecondInput: number = 1;
  SumFirstInput: number = 1;


  // ------------------- add Section ----------------------//

  

  constructor(private http: HttpClient, public fb: FormBuilder, private service: Services) {
   }

  ngOnInit(): void {
    this.form = this.fb.group({
      curencyType1: [this.SumFirstInput,[Validators.pattern(this.regex)]],
      curencyType2: [this.SumSecondInput,[Validators.pattern(this.regex)]],
      curencyType3: ['',[Validators.pattern(this.regex)]]
    })
  const data = this.http.get<HTTPdata>('http://api.exchangeratesapi.io/v1/latest?access_key=5b01ea2b04b9b6252a947d15552ade02&format=1&fbclid=IwAR29psA_a2VD4HmECqbJftUM5wxCKbpLYS7CEGyL-0oUTowe9TYDZMdzx3U')

  data
  .subscribe(e=>{
    this.AllDataAboutCurrency = e.rates   
    this.service.rateData = e
    for(let key in e.rates){    
      this.currencyArray.push(key)
    }
  })  
  }


  onKeyUpInputOne(event: any){
    this.firstInputValue = event.target.value
    let sum = this.firstInputValue / this.ExchangeRateFirst * this.ExchangeRateSecond
    this.SumSecondInput = sum
    

    this.SumFirstInput = this.firstInputValue
    
    
  }
  onKeyUpInputTwo(event: any){
    this.SecondInputValue = event.target.value
    let sum = this.SecondInputValue / this.ExchangeRateSecond *this.ExchangeRateFirst
    this.SumFirstInput = sum
    
    this.SumSecondInput = this.SecondInputValue

    
  }
  activitySelectorForFirstInput(clickedCurrency: any){
    this.cuarrencyValue1 = clickedCurrency.target.value
    const rateData = this.http.get<HTTPdataBindedRates>(`http://api.exchangeratesapi.io/v1/latest?access_key=5b01ea2b04b9b6252a947d15552ade02&symbols=${this.cuarrencyValue1}&format=1`)    
    rateData.subscribe(e=>{
      let curent = this.cuarrencyValue1   
      let intedValue = e.rates[curent]

      this.ExchangeRateFirst = intedValue

      let sum = (this.SumSecondInput / this.ExchangeRateFirst ) * this.ExchangeRateSecond
      this.SumFirstInput = sum
      this.firstInputValue = sum
    })    
  }
  activitySelectorForSecondInput(clickedCurrency: any){
    this.cuarrencyValue2 = clickedCurrency.target.value
    const rateData = this.http.get<HTTPdataBindedRates>(`http://api.exchangeratesapi.io/v1/latest?access_key=5b01ea2b04b9b6252a947d15552ade02&symbols=${this.cuarrencyValue2}&format=1`)    
    rateData.subscribe(e=>{
      let curent = this.cuarrencyValue2
      let intedValue = e.rates[curent]
      
      this.ExchangeRateSecond = intedValue  

      let sum = (this.SumFirstInput / this.ExchangeRateSecond) * this.ExchangeRateFirst
      this.SumSecondInput = sum
      this.SecondInputValue = sum
    })    
    
  }
  activitySelectorForOptionElement(clickedCurrency: any){

  }
  get ArrayForAddNewItem(){
    return this.service.ArrayForAddNewItem
  }
  on_add_button_click_Listener(){
    this.ArrayForAddNewItem.push({
      input: 0,
      Currency: 'EUR'
    })
  }
  activity_Selector_For_Sum(element: any){
    this.http.get<HTTPdata>('http://api.exchangeratesapi.io/v1/latest?access_key=5b01ea2b04b9b6252a947d15552ade02&format=1&fbclid=IwAR29psA_a2VD4HmECqbJftUM5wxCKbpLYS7CEGyL-0oUTowe9TYDZMdzx3U')
    .subscribe(e=>{
      this.service.rateData = e
      this.service.BaseCurrency = element.target.value
      this.service.gathering()
    })
   

  }


  get sum(){
    return this.service.Sum
  }

}